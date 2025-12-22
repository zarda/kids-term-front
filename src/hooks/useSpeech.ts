import { useCallback, useState, useEffect, useRef } from 'react'
import { useSettingsStore } from '../store/useSettingsStore'

// Map short language codes to full BCP-47 locale codes for better voice matching
const LANG_TO_LOCALE: Record<string, string> = {
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
  it: 'it-IT',
  pt: 'pt-BR',
  ja: 'ja-JP',
  ko: 'ko-KR',
  zh: 'zh-TW',
}

// Preferred high-quality voices (prioritized in order)
const PREFERRED_VOICES: Record<string, string[]> = {
  en: ['Google US English', 'Samantha', 'Alex', 'Microsoft Zira'],
  es: ['Google español', 'Monica', 'Paulina', 'Microsoft Helena'],
  fr: ['Google français', 'Thomas', 'Amelie', 'Microsoft Hortense'],
  de: ['Google Deutsch', 'Anna', 'Microsoft Hedda'],
  it: ['Google italiano', 'Alice', 'Luca', 'Microsoft Elsa'],
  pt: ['Google português do Brasil', 'Luciana', 'Microsoft Maria'],
  ja: ['Google 日本語', 'Kyoko', 'O-Ren', 'Microsoft Haruka'],
  ko: ['Google 한국의', 'Yuna', 'Microsoft Heami'],
  zh: ['Google 國語', 'Meijia', 'Tingting', 'Microsoft Hanhan'],
}

interface UseSpeechReturn {
  speak: (text: string, lang?: string) => void
  stop: () => void
  isSpeaking: boolean
  isSupported: boolean
  voices: SpeechSynthesisVoice[]
}

export function useSpeech(): UseSpeechReturn {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const speechRate = useSettingsStore((s) => s.speechRate)
  const speechVolume = useSettingsStore((s) => s.speechVolume)
  const targetLang = useSettingsStore((s) => s.targetLang)

  // Use ref to always have latest targetLang in speak callback
  const targetLangRef = useRef(targetLang)
  useEffect(() => {
    targetLangRef.current = targetLang
  }, [targetLang])

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

  // Load voices - they load asynchronously
  useEffect(() => {
    if (!isSupported) return

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices()
      if (availableVoices.length > 0) {
        setVoices(availableVoices)
      }
    }

    // Load immediately if already available
    loadVoices()

    // Also listen for voiceschanged event (needed for Chrome)
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices)

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices)
    }
  }, [isSupported])

  const getLocale = useCallback((lang: string): string => {
    return LANG_TO_LOCALE[lang] || lang
  }, [])

  const speak = useCallback(
    (text: string, lang?: string) => {
      if (!isSupported) return

      // Stop any current speech
      window.speechSynthesis.cancel()

      // Use passed lang, or current targetLang from ref (always fresh)
      const langCode = lang || targetLangRef.current
      const locale = getLocale(langCode)

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = locale
      utterance.rate = speechRate
      utterance.volume = speechVolume

      // Get fresh voices and find matching one (prefer high-quality voices for tonal languages)
      const currentVoices = window.speechSynthesis.getVoices()
      const preferredNames = PREFERRED_VOICES[langCode] || []
      const matchingVoice =
        preferredNames
          .map((name) => currentVoices.find((v) => v.name.includes(name)))
          .find((v) => v) ||
        currentVoices.find((v) => v.lang === locale) ||
        currentVoices.find((v) => v.lang.startsWith(langCode)) ||
        currentVoices.find((v) => v.lang.toLowerCase().startsWith(langCode.toLowerCase()))

      if (matchingVoice) {
        utterance.voice = matchingVoice
      }

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      window.speechSynthesis.speak(utterance)
    },
    [isSupported, speechRate, speechVolume, getLocale]
  )

  const stop = useCallback(() => {
    if (!isSupported) return
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [isSupported])

  return { speak, stop, isSpeaking, isSupported, voices }
}

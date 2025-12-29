import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSpeech } from './useSpeech'
import { useSettingsStore } from '../store/useSettingsStore'

// Create mock implementations
function createMockSpeechSynthesis() {
  return {
    speak: vi.fn(),
    cancel: vi.fn(),
    getVoices: vi.fn(() => [
      { name: 'Google US English', lang: 'en-US' },
      { name: 'Google español', lang: 'es-ES' },
      { name: 'Google 日本語', lang: 'ja-JP' },
      { name: 'Samantha', lang: 'en-US' },
    ] as SpeechSynthesisVoice[]),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    pending: false,
    speaking: false,
    paused: false,
    onvoiceschanged: null,
  }
}

describe('useSpeech', () => {
  let mockSpeechSynthesis: ReturnType<typeof createMockSpeechSynthesis>
  let MockUtterance: ReturnType<typeof vi.fn>
  let lastUtterance: { text: string; lang: string; rate: number; volume: number; voice: unknown; onstart: (() => void) | null; onend: (() => void) | null; onerror: (() => void) | null }

  beforeEach(() => {
    mockSpeechSynthesis = createMockSpeechSynthesis()

    // Setup SpeechSynthesisUtterance mock
    MockUtterance = vi.fn().mockImplementation(function(this: typeof lastUtterance, text: string) {
      lastUtterance = {
        text,
        lang: '',
        rate: 1,
        volume: 1,
        voice: null,
        onstart: null,
        onend: null,
        onerror: null,
      }
      return lastUtterance
    })

    // Set up global mocks
    Object.defineProperty(window, 'speechSynthesis', {
      value: mockSpeechSynthesis,
      writable: true,
      configurable: true,
    })

    Object.defineProperty(window, 'SpeechSynthesisUtterance', {
      value: MockUtterance,
      writable: true,
      configurable: true,
    })

    // Reset settings store
    useSettingsStore.setState({
      speechRate: 1.0,
      speechVolume: 1.0,
      targetLang: 'en',
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('isSupported', () => {
    it('should return true when speechSynthesis is available', () => {
      const { result } = renderHook(() => useSpeech())
      expect(result.current.isSupported).toBe(true)
    })

    // Note: Testing unsupported browser behavior is complex because useEffect
    // runs after render and attempts to access speechSynthesis. The isSupported
    // check happens synchronously, but the effect still runs. This would require
    // mocking at module level or restructuring the hook.
  })

  describe('speak', () => {
    it('should call speechSynthesis.speak with an utterance', () => {
      const { result } = renderHook(() => useSpeech())

      act(() => {
        result.current.speak('Hello')
      })

      expect(mockSpeechSynthesis.speak).toHaveBeenCalled()
    })

    it('should cancel previous speech before starting new', () => {
      const { result } = renderHook(() => useSpeech())

      act(() => {
        result.current.speak('Hello')
      })

      expect(mockSpeechSynthesis.cancel).toHaveBeenCalled()
    })

    it('should create utterance with correct text', () => {
      const { result } = renderHook(() => useSpeech())

      act(() => {
        result.current.speak('Test message')
      })

      expect(MockUtterance).toHaveBeenCalledWith('Test message')
    })

    it('should apply speech rate from settings', () => {
      useSettingsStore.setState({ speechRate: 1.5 })

      const { result } = renderHook(() => useSpeech())

      act(() => {
        result.current.speak('Hello')
      })

      expect(lastUtterance.rate).toBe(1.5)
    })

    it('should apply speech volume from settings', () => {
      useSettingsStore.setState({ speechVolume: 0.8 })

      const { result } = renderHook(() => useSpeech())

      act(() => {
        result.current.speak('Hello')
      })

      expect(lastUtterance.volume).toBe(0.8)
    })

    it('should use passed language parameter', () => {
      const { result } = renderHook(() => useSpeech())

      act(() => {
        result.current.speak('Hola', 'es')
      })

      expect(lastUtterance.lang).toBe('es-ES')
    })

    it('should use targetLang from settings when no language passed', () => {
      useSettingsStore.setState({ targetLang: 'ja' })

      const { result } = renderHook(() => useSpeech())

      act(() => {
        result.current.speak('こんにちは')
      })

      expect(lastUtterance.lang).toBe('ja-JP')
    })

    // Note: Testing when speechSynthesis is unavailable requires mocking at
    // module level due to useEffect running after render.
  })

  describe('stop', () => {
    it('should call speechSynthesis.cancel', () => {
      const { result } = renderHook(() => useSpeech())

      act(() => {
        result.current.stop()
      })

      expect(mockSpeechSynthesis.cancel).toHaveBeenCalled()
    })

    it('should set isSpeaking to false', () => {
      const { result } = renderHook(() => useSpeech())

      // Start speaking
      act(() => {
        result.current.speak('Hello')
        // Simulate onstart event
        lastUtterance.onstart?.()
      })

      expect(result.current.isSpeaking).toBe(true)

      act(() => {
        result.current.stop()
      })

      expect(result.current.isSpeaking).toBe(false)
    })
  })

  describe('isSpeaking state', () => {
    it('should be false initially', () => {
      const { result } = renderHook(() => useSpeech())
      expect(result.current.isSpeaking).toBe(false)
    })

    it('should be true after onstart event', () => {
      const { result } = renderHook(() => useSpeech())

      act(() => {
        result.current.speak('Hello')
        lastUtterance.onstart?.()
      })

      expect(result.current.isSpeaking).toBe(true)
    })

    it('should be false after onend event', () => {
      const { result } = renderHook(() => useSpeech())

      act(() => {
        result.current.speak('Hello')
        lastUtterance.onstart?.()
      })

      expect(result.current.isSpeaking).toBe(true)

      act(() => {
        lastUtterance.onend?.()
      })

      expect(result.current.isSpeaking).toBe(false)
    })

    it('should be false after onerror event', () => {
      const { result } = renderHook(() => useSpeech())

      act(() => {
        result.current.speak('Hello')
        lastUtterance.onstart?.()
      })

      expect(result.current.isSpeaking).toBe(true)

      act(() => {
        lastUtterance.onerror?.()
      })

      expect(result.current.isSpeaking).toBe(false)
    })
  })

  describe('voices', () => {
    it('should load voices from speechSynthesis', () => {
      const { result } = renderHook(() => useSpeech())

      expect(result.current.voices).toHaveLength(4)
      expect(result.current.voices[0].name).toBe('Google US English')
    })
  })

  describe('voice selection', () => {
    it('should prefer Google voices for English', () => {
      mockSpeechSynthesis.getVoices.mockReturnValue([
        { name: 'Default', lang: 'en-US' },
        { name: 'Google US English', lang: 'en-US' },
        { name: 'Samantha', lang: 'en-US' },
      ] as SpeechSynthesisVoice[])

      const { result } = renderHook(() => useSpeech())

      act(() => {
        result.current.speak('Hello', 'en')
      })

      expect((lastUtterance.voice as { name: string })?.name).toBe('Google US English')
    })

    it('should prefer Google voices for Spanish', () => {
      mockSpeechSynthesis.getVoices.mockReturnValue([
        { name: 'Default', lang: 'es-ES' },
        { name: 'Google español', lang: 'es-ES' },
      ] as SpeechSynthesisVoice[])

      const { result } = renderHook(() => useSpeech())

      act(() => {
        result.current.speak('Hola', 'es')
      })

      expect((lastUtterance.voice as { name: string })?.name).toBe('Google español')
    })

    it('should fallback to matching lang voice when preferred not found', () => {
      mockSpeechSynthesis.getVoices.mockReturnValue([
        { name: 'German Voice', lang: 'de-DE' },
      ] as SpeechSynthesisVoice[])

      const { result } = renderHook(() => useSpeech())

      act(() => {
        result.current.speak('Hallo', 'de')
      })

      expect((lastUtterance.voice as { name: string })?.name).toBe('German Voice')
    })
  })
})

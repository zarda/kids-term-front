import { useMemo } from 'react'
import { useLanguagePackStore } from '../store/useLanguagePackStore'
import { getTranslations } from '../i18n'
import type { Translations } from '../i18n/types'

export function useTranslation(): { t: Translations; locale: string } {
  const activePackId = useLanguagePackStore((s) => s.activePackId)
  const getPackById = useLanguagePackStore((s) => s.getPackById)

  const { t, locale } = useMemo(() => {
    const activePack = getPackById(activePackId)
    // Use the source language (learner's language) for UI
    const uiLocale = activePack?.sourceLanguage || 'en'
    return {
      t: getTranslations(uiLocale),
      locale: uiLocale,
    }
  }, [activePackId, getPackById])

  return { t, locale }
}

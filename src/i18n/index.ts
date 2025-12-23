import type { Translations, SupportedLocale } from './types'
import en from './translations/en'
import tc from './translations/tc'

export const translations: Record<SupportedLocale, Translations> = {
  en,
  tc,
}

export function getTranslations(locale: string): Translations {
  // Map language codes to supported locales
  // Using Traditional Chinese (Taiwan) as default for tc
  const localeMap: Record<string, SupportedLocale> = {
    en: 'en',
    tc: 'tc',
    'zh-TW': 'tc',
    'zh-Hant': 'tc',
  }

  const mappedLocale = localeMap[locale] || 'en'
  return translations[mappedLocale]
}

export type { Translations, SupportedLocale } from './types'

import type { Translations, SupportedLocale } from './types'
import en from './translations/en'
import zh from './translations/zh'

export const translations: Record<SupportedLocale, Translations> = {
  en,
  zh,
}

export function getTranslations(locale: string): Translations {
  // Map language codes to supported locales
  // Using Traditional Chinese (Taiwan) as default for zh
  const localeMap: Record<string, SupportedLocale> = {
    en: 'en',
    zh: 'zh',
    'zh-TW': 'zh',
    'zh-Hant': 'zh',
  }

  const mappedLocale = localeMap[locale] || 'en'
  return translations[mappedLocale]
}

export type { Translations, SupportedLocale } from './types'

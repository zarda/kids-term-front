import type { LanguagePack, LanguagePackData } from '../../types/language.types'

// Available language packs metadata
export const availableLanguagePacks: LanguagePack[] = [
  {
    id: 'zh-en',
    sourceLanguage: 'zh',
    targetLanguage: 'en',
    name: 'English (中文)',
    nativeName: 'English',
    flag: '🇺🇸',
    wordCount: 1400,
    isDownloaded: true, // Pre-installed default
    version: '0.5.0',
  },
  {
    id: 'zh-ja',
    sourceLanguage: 'zh',
    targetLanguage: 'ja',
    name: 'Japanese (中文)',
    nativeName: '日本語',
    flag: '🇯🇵',
    wordCount: 1400,
    isDownloaded: true,
    version: '0.5.0',
  },
  {
    id: 'zh-ko',
    sourceLanguage: 'zh',
    targetLanguage: 'ko',
    name: 'Korean (中文)',
    nativeName: '한국어',
    flag: '🇰🇷',
    wordCount: 30,
    isDownloaded: false,
    version: '0.1.0',
  },
  {
    id: 'zh-es',
    sourceLanguage: 'zh',
    targetLanguage: 'es',
    name: 'Spanish (中文)',
    nativeName: 'Español',
    flag: '🇪🇸',
    wordCount: 30,
    isDownloaded: false,
    version: '0.1.0',
  },
  {
    id: 'zh-fr',
    sourceLanguage: 'zh',
    targetLanguage: 'fr',
    name: 'French (中文)',
    nativeName: 'Français',
    flag: '🇫🇷',
    wordCount: 30,
    isDownloaded: false,
    version: '0.1.0',
  },
  {
    id: 'zh-zh',
    sourceLanguage: 'zh',
    targetLanguage: 'zh',
    name: 'Chinese (中文)',
    nativeName: '中文',
    flag: '🇹🇼',
    wordCount: 30,
    isDownloaded: false,
    version: '0.1.0',
  },
  {
    id: 'en-en',
    sourceLanguage: 'en',
    targetLanguage: 'en',
    name: 'English (English)',
    nativeName: 'English',
    flag: '🇺🇸',
    wordCount: 40,
    isDownloaded: false,
    version: '0.1.0',
  },
  {
    id: 'en-es',
    sourceLanguage: 'en',
    targetLanguage: 'es',
    name: 'Spanish (English)',
    nativeName: 'Español',
    flag: '🇪🇸',
    wordCount: 35,
    isDownloaded: false,
    version: '0.1.0',
  },
  {
    id: 'en-fr',
    sourceLanguage: 'en',
    targetLanguage: 'fr',
    name: 'French (English)',
    nativeName: 'Français',
    flag: '🇫🇷',
    wordCount: 30,
    isDownloaded: false,
    version: '0.1.0',
  },
  {
    id: 'en-de',
    sourceLanguage: 'en',
    targetLanguage: 'de',
    name: 'German (English)',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    wordCount: 30,
    isDownloaded: false,
    version: '0.1.0',
  },
  {
    id: 'en-ja',
    sourceLanguage: 'en',
    targetLanguage: 'ja',
    name: 'Japanese (English)',
    nativeName: '日本語',
    flag: '🇯🇵',
    wordCount: 3000,
    isDownloaded: true,
    version: '1.0.0',
  },
  {
    id: 'en-it',
    sourceLanguage: 'en',
    targetLanguage: 'it',
    name: 'Italian (English)',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    wordCount: 25,
    isDownloaded: false,
    version: '0.1.0',
  },
  {
    id: 'en-pt',
    sourceLanguage: 'en',
    targetLanguage: 'pt',
    name: 'Portuguese (English)',
    nativeName: 'Português',
    flag: '🇧🇷',
    wordCount: 25,
    isDownloaded: false,
    version: '0.1.0',
  },
  {
    id: 'en-ko',
    sourceLanguage: 'en',
    targetLanguage: 'ko',
    name: 'Korean (English)',
    nativeName: '한국어',
    flag: '🇰🇷',
    wordCount: 25,
    isDownloaded: false,
    version: '0.1.0',
  },
  {
    id: 'en-zh',
    sourceLanguage: 'en',
    targetLanguage: 'zh',
    name: 'Chinese (English)',
    nativeName: '中文',
    flag: '🇹🇼',
    wordCount: 25,
    isDownloaded: false,
    version: '0.1.0',
  },
]

// Simulated download function - in real app this would fetch from API
export async function downloadLanguagePack(packId: string): Promise<LanguagePackData> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Dynamically import the pack data
  switch (packId) {
    case 'zh-en':
      return (await import('./zh-en/index')).default
    case 'zh-ja':
      return (await import('./zh-ja/index')).default
    case 'zh-ko':
      return (await import('./zh-ko')).default
    case 'zh-es':
      return (await import('./zh-es')).default
    case 'zh-fr':
      return (await import('./zh-fr')).default
    case 'zh-zh':
      return (await import('./zh-zh')).default
    case 'en-en':
      return (await import('./en')).default
    case 'en-es':
      return (await import('./es')).default
    case 'en-fr':
      return (await import('./fr')).default
    case 'en-de':
      return (await import('./de')).default
    case 'en-ja':
      return (await import('./en-ja/index')).default
    case 'en-it':
      return (await import('./it')).default
    case 'en-pt':
      return (await import('./pt')).default
    case 'en-ko':
      return (await import('./ko')).default
    case 'en-zh':
      return (await import('./zh')).default
    default:
      throw new Error(`Language pack ${packId} not found`)
  }
}

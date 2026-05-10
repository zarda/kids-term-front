import type { LanguagePack, LanguagePackData } from '../../types/language.types'

// Available language packs metadata
export const availableLanguagePacks: LanguagePack[] = [
  {
    id: 'tc-en',
    sourceLanguage: 'tc',
    targetLanguage: 'en',
    name: '英文 (繁體中文)',
    nativeName: 'English',
    flag: '🇺🇸',
    wordCount: 3000,
    isDownloaded: true, // Pre-installed default
    version: '1.0.0',
  },
  {
    id: 'tc-ja',
    sourceLanguage: 'tc',
    targetLanguage: 'ja',
    name: '日文 (繁體中文)',
    nativeName: '日本語',
    flag: '🇯🇵',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'tc-ko',
    sourceLanguage: 'tc',
    targetLanguage: 'ko',
    name: '韓文 (繁體中文)',
    nativeName: '한국어',
    flag: '🇰🇷',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'tc-de',
    sourceLanguage: 'tc',
    targetLanguage: 'de',
    name: '德文 (繁體中文)',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'tc-es',
    sourceLanguage: 'tc',
    targetLanguage: 'es',
    name: '西班牙文 (繁體中文)',
    nativeName: 'Español',
    flag: '🇪🇸',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'tc-fr',
    sourceLanguage: 'tc',
    targetLanguage: 'fr',
    name: '法文 (繁體中文)',
    nativeName: 'Français',
    flag: '🇫🇷',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'tc-it',
    sourceLanguage: 'tc',
    targetLanguage: 'it',
    name: '義大利文 (繁體中文)',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'tc-tc',
    sourceLanguage: 'tc',
    targetLanguage: 'tc',
    name: '繁體中文  (繁體中文)',
    nativeName: '繁體中文',
    flag: '🇹🇼',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'tc-pt',
    sourceLanguage: 'tc',
    targetLanguage: 'pt',
    name: '葡萄牙文 (繁體中文)',
    nativeName: 'Português',
    flag: '🇧🇷',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'tc-th',
    sourceLanguage: 'tc',
    targetLanguage: 'th',
    name: '泰文 (繁體中文)',
    nativeName: 'ไทย',
    flag: '🇹🇭',
    wordCount: 2500,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'tc-vi',
    sourceLanguage: 'tc',
    targetLanguage: 'vi',
    name: '越南文 (繁體中文)',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'tc-id',
    sourceLanguage: 'tc',
    targetLanguage: 'id',
    name: '印尼文 (繁體中文)',
    nativeName: 'Bahasa Indonesia',
    flag: '🇮🇩',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'en-en',
    sourceLanguage: 'en',
    targetLanguage: 'en',
    name: 'English (English)',
    nativeName: 'English',
    flag: '🇺🇸',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'en-es',
    sourceLanguage: 'en',
    targetLanguage: 'es',
    name: 'Spanish (English)',
    nativeName: 'Español',
    flag: '🇪🇸',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'en-fr',
    sourceLanguage: 'en',
    targetLanguage: 'fr',
    name: 'French (English)',
    nativeName: 'Français',
    flag: '🇫🇷',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'en-de',
    sourceLanguage: 'en',
    targetLanguage: 'de',
    name: 'German (English)',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'en-ja',
    sourceLanguage: 'en',
    targetLanguage: 'ja',
    name: 'Japanese (English)',
    nativeName: '日本語',
    flag: '🇯🇵',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'en-it',
    sourceLanguage: 'en',
    targetLanguage: 'it',
    name: 'Italian (English)',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'en-pt',
    sourceLanguage: 'en',
    targetLanguage: 'pt',
    name: 'Portuguese (English)',
    nativeName: 'Português',
    flag: '🇧🇷',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'en-ko',
    sourceLanguage: 'en',
    targetLanguage: 'ko',
    name: 'Korean (English)',
    nativeName: '한국어',
    flag: '🇰🇷',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'en-tc',
    sourceLanguage: 'en',
    targetLanguage: 'tc',
    name: 'Traditional Chinese (English)',
    nativeName: '繁體中文',
    flag: '🇹🇼',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'en-th',
    sourceLanguage: 'en',
    targetLanguage: 'th',
    name: 'Thai (English)',
    nativeName: 'ไทย',
    flag: '🇹🇭',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'en-vi',
    sourceLanguage: 'en',
    targetLanguage: 'vi',
    name: 'Vietnamese (English)',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'en-id',
    sourceLanguage: 'en',
    targetLanguage: 'id',
    name: 'Indonesian (English)',
    nativeName: 'Bahasa Indonesia',
    flag: '🇮🇩',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'ja-en',
    sourceLanguage: 'ja',
    targetLanguage: 'en',
    name: '英語 (日本語)',
    nativeName: 'English',
    flag: '🇺🇸',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'ja-tc',
    sourceLanguage: 'ja',
    targetLanguage: 'tc',
    name: '中国語 (日本語)',
    nativeName: '繁體中文',
    flag: '🇹🇼',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'ja-ko',
    sourceLanguage: 'ja',
    targetLanguage: 'ko',
    name: '韓国語 (日本語)',
    nativeName: '한국어',
    flag: '🇰🇷',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'ja-ja',
    sourceLanguage: 'ja',
    targetLanguage: 'ja',
    name: '日本語 (日本語)',
    nativeName: '日本語',
    flag: '🇯🇵',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'ja-fr',
    sourceLanguage: 'ja',
    targetLanguage: 'fr',
    name: 'フランス語 (日本語)',
    nativeName: 'Français',
    flag: '🇫🇷',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'ja-it',
    sourceLanguage: 'ja',
    targetLanguage: 'it',
    name: 'イタリア語 (日本語)',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'ja-de',
    sourceLanguage: 'ja',
    targetLanguage: 'de',
    name: 'ドイツ語 (日本語)',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'ja-es',
    sourceLanguage: 'ja',
    targetLanguage: 'es',
    name: 'スペイン語 (日本語)',
    nativeName: 'Español',
    flag: '🇪🇸',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'ja-pt',
    sourceLanguage: 'ja',
    targetLanguage: 'pt',
    name: 'ポルトガル語 (日本語)',
    nativeName: 'Português',
    flag: '🇧🇷',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'ja-th',
    sourceLanguage: 'ja',
    targetLanguage: 'th',
    name: 'タイ語 (日本語)',
    nativeName: 'ไทย',
    flag: '🇹🇭',
    wordCount: 3000,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'ja-vi',
    sourceLanguage: 'ja',
    targetLanguage: 'vi',
    name: 'ベトナム語 (日本語)',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
    wordCount: 2500,
    isDownloaded: false,
    version: '1.0.0',
  },
  {
    id: 'ja-id',
    sourceLanguage: 'ja',
    targetLanguage: 'id',
    name: 'インドネシア語 (日本語)',
    nativeName: 'Bahasa Indonesia',
    flag: '🇮🇩',
    wordCount: 2500,
    isDownloaded: false,
    version: '1.0.0',
  },
]

export async function downloadLanguagePack(packId: string): Promise<LanguagePackData> {

  // Dynamically import the pack data
  switch (packId) {
    case 'tc-en':
      return (await import('./tc-en/index')).default
    case 'tc-ja':
      return (await import('./tc-ja/index')).default
    case 'tc-ko':
      return (await import('./tc-ko/index')).default
    case 'tc-de':
      return (await import('./tc-de/index')).default
    case 'tc-es':
      return (await import('./tc-es/index')).default
    case 'tc-fr':
      return (await import('./tc-fr/index')).default
    case 'tc-it':
      return (await import('./tc-it/index')).default
    case 'tc-tc':
      return (await import('./tc-tc/index')).default
    case 'tc-pt':
      return (await import('./tc-pt/index')).default
    case 'en-en':
      return (await import('./en-en/index')).default
    case 'en-es':
      return (await import('./en-es/index')).default
    case 'en-fr':
      return (await import('./en-fr/index')).default
    case 'en-de':
      return (await import('./en-de/index')).default
    case 'en-ja':
      return (await import('./en-ja/index')).default
    case 'en-it':
      return (await import('./en-it/index')).default
    case 'en-pt':
      return (await import('./en-pt/index')).default
    case 'en-ko':
      return (await import('./en-ko/index')).default
    case 'en-tc':
      return (await import('./en-tc/index')).default
    case 'ja-en':
      return (await import('./ja-en/index')).default
    case 'ja-tc':
      return (await import('./ja-tc/index')).default
    case 'ja-ko':
      return (await import('./ja-ko/index')).default
    case 'ja-ja':
      return (await import('./ja-ja/index')).default
    case 'ja-fr':
      return (await import('./ja-fr/index')).default
    case 'ja-it':
      return (await import('./ja-it/index')).default
    case 'ja-de':
      return (await import('./ja-de/index')).default
    case 'ja-es':
      return (await import('./ja-es/index')).default
    case 'ja-pt':
      return (await import('./ja-pt/index')).default
    case 'tc-th':
      return (await import('./tc-th/index')).default
    case 'tc-vi':
      return (await import('./tc-vi/index')).default
    case 'tc-id':
      return (await import('./tc-id/index')).default
    case 'en-th':
      return (await import('./en-th/index')).default
    case 'en-vi':
      return (await import('./en-vi/index')).default
    case 'en-id':
      return (await import('./en-id/index')).default
    case 'ja-th':
      return (await import('./ja-th/index')).default
    case 'ja-vi':
      return (await import('./ja-vi/index')).default
    case 'ja-id':
      return (await import('./ja-id/index')).default
    default:
      throw new Error(`Language pack ${packId} not found`)
  }
}

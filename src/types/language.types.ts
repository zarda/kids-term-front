export interface LanguagePack {
  id: string
  sourceLanguage: string // e.g., 'en'
  targetLanguage: string // e.g., 'es'
  name: string // e.g., 'Spanish'
  nativeName: string // e.g., 'Español'
  flag: string // emoji flag
  wordCount: number
  isDownloaded: boolean
  isDownloading?: boolean
  version: string
}

export interface LanguagePackData {
  id: string
  words: LanguageWord[]
}

export interface LanguageWord {
  id: string
  term: string
  definition: string
  pronunciation: string
  examples: string[]
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export interface AvailableLanguage {
  code: string
  name: string
  nativeName: string
  flag: string
}

export const SUPPORTED_LANGUAGES: AvailableLanguage[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
]

export const getLanguageByCode = (code: string): AvailableLanguage | undefined => {
  return SUPPORTED_LANGUAGES.find((l) => l.code === code)
}

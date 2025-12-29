/**
 * Language pack state fixtures for E2E tests
 * Mirrors the structure in useLanguagePackStore.ts
 */

export interface LanguagePackStateFixture {
  state: {
    availablePacks: Array<{
      id: string
      sourceLanguage: string
      targetLanguage: string
      name: string
      nativeName: string
      flag: string
      wordCount: number
      isDownloaded: boolean
      isDownloading?: boolean
      version: string
    }>
    downloadedData: Record<
      string,
      {
        id: string
        words: Array<{
          id: string
          term: string
          definition: string
          pronunciation: string
          examples: string[]
          category: string
          difficulty: string
        }>
      }
    >
    activePackId: string
    downloadingPackId: string | null
    isRefreshing: boolean
    error: string | null
  }
  version: number
}

// Mock word data for testing
const mockWords = [
  {
    id: '1',
    term: 'apple',
    definition: '蘋果',
    pronunciation: '/ˈæp.əl/',
    examples: [],
    category: 'food',
    difficulty: 'beginner',
  },
  {
    id: '2',
    term: 'book',
    definition: '書',
    pronunciation: '/bʊk/',
    examples: [],
    category: 'objects',
    difficulty: 'beginner',
  },
  {
    id: '3',
    term: 'cat',
    definition: '貓',
    pronunciation: '/kæt/',
    examples: [],
    category: 'animals',
    difficulty: 'beginner',
  },
  {
    id: '4',
    term: 'dog',
    definition: '狗',
    pronunciation: '/dɔːɡ/',
    examples: [],
    category: 'animals',
    difficulty: 'beginner',
  },
  {
    id: '5',
    term: 'egg',
    definition: '蛋',
    pronunciation: '/eɡ/',
    examples: [],
    category: 'food',
    difficulty: 'beginner',
  },
  {
    id: '6',
    term: 'fish',
    definition: '魚',
    pronunciation: '/fɪʃ/',
    examples: [],
    category: 'animals',
    difficulty: 'beginner',
  },
  {
    id: '7',
    term: 'hat',
    definition: '帽子',
    pronunciation: '/hæt/',
    examples: [],
    category: 'clothing',
    difficulty: 'beginner',
  },
  {
    id: '8',
    term: 'ice',
    definition: '冰',
    pronunciation: '/aɪs/',
    examples: [],
    category: 'nature',
    difficulty: 'beginner',
  },
  {
    id: '9',
    term: 'jam',
    definition: '果醬',
    pronunciation: '/dʒæm/',
    examples: [],
    category: 'food',
    difficulty: 'beginner',
  },
  {
    id: '10',
    term: 'key',
    definition: '鑰匙',
    pronunciation: '/kiː/',
    examples: [],
    category: 'objects',
    difficulty: 'beginner',
  },
]

/**
 * Standard mock language pack store with one downloaded pack (tc-en)
 */
export const mockLanguagePackStore: LanguagePackStateFixture = {
  state: {
    availablePacks: [
      {
        id: 'tc-en',
        sourceLanguage: 'tc',
        targetLanguage: 'en',
        name: '英文 (繁體中文)',
        nativeName: 'English',
        flag: '🇺🇸',
        wordCount: 3000,
        isDownloaded: true,
        version: '1.0.0',
      },
    ],
    downloadedData: {
      'tc-en': {
        id: 'tc-en',
        words: mockWords,
      },
    },
    activePackId: 'tc-en',
    downloadingPackId: null,
    isRefreshing: false,
    error: null,
  },
  version: 0,
}

/**
 * Multiple packs available - for testing switch and delete functionality
 */
export const multiPackStore: LanguagePackStateFixture = {
  state: {
    availablePacks: [
      {
        id: 'tc-en',
        sourceLanguage: 'tc',
        targetLanguage: 'en',
        name: '英文 (繁體中文)',
        nativeName: 'English',
        flag: '🇺🇸',
        wordCount: 3000,
        isDownloaded: true,
        version: '1.0.0',
      },
      {
        id: 'tc-ja',
        sourceLanguage: 'tc',
        targetLanguage: 'ja',
        name: '日文 (繁體中文)',
        nativeName: '日本語',
        flag: '🇯🇵',
        wordCount: 2500,
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
        wordCount: 2000,
        isDownloaded: true,
        version: '1.0.0',
      },
    ],
    downloadedData: {
      'tc-en': {
        id: 'tc-en',
        words: mockWords,
      },
      'tc-es': {
        id: 'tc-es',
        words: mockWords.map((w) => ({
          ...w,
          definition: w.definition + ' (ES)',
        })),
      },
    },
    activePackId: 'tc-en',
    downloadingPackId: null,
    isRefreshing: false,
    error: null,
  },
  version: 0,
}

/**
 * Empty language pack store - for testing "no words" scenarios
 */
export const emptyPackStore: LanguagePackStateFixture = {
  state: {
    availablePacks: [],
    downloadedData: {},
    activePackId: 'tc-en',
    downloadingPackId: null,
    isRefreshing: false,
    error: null,
  },
  version: 0,
}

/**
 * Get the mock words array for use in tests
 */
export const getMockWords = () => mockWords

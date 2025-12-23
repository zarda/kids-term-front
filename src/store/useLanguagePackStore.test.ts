import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useLanguagePackStore } from './useLanguagePackStore'
import type { LanguagePackData } from '../types/language.types'

// Mock the downloadLanguagePack function
vi.mock('../data/languagePacks', async () => {
  const actual = await vi.importActual<typeof import('../data/languagePacks')>('../data/languagePacks')
  return {
    ...actual,
    downloadLanguagePack: vi.fn().mockImplementation(async (packId: string): Promise<LanguagePackData> => {
      // Return mock data immediately without delay
      return {
        id: packId,
        words: [
          {
            id: `${packId}-word-1`,
            term: 'test',
            definition: 'テスト',
            pronunciation: 'tesuto',
            category: 'common',
            difficulty: 'beginner',
            examples: ['This is a test'],
          },
        ],
      }
    }),
  }
})

describe('useLanguagePackStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useLanguagePackStore.setState({
      availablePacks: [
        {
          id: 'tc-en',
          sourceLanguage: 'tc',
          targetLanguage: 'en',
          name: 'English',
          nativeName: 'English',
          flag: '🇺🇸',
          wordCount: 40,
          isDownloaded: true,
          version: '1.0.0',
        },
        {
          id: 'tc-ja',
          sourceLanguage: 'tc',
          targetLanguage: 'ja',
          name: 'Japanese',
          nativeName: '日本語',
          flag: '🇯🇵',
          wordCount: 30,
          isDownloaded: false,
          version: '1.0.0',
        },
        {
          id: 'en-es',
          sourceLanguage: 'en',
          targetLanguage: 'es',
          name: 'Spanish',
          nativeName: 'Español',
          flag: '🇪🇸',
          wordCount: 35,
          isDownloaded: true,
          version: '1.0.0',
        },
      ],
      downloadedData: {
        'tc-en': {
          id: 'tc-en',
          words: [
            {
              id: 'word-1',
              term: 'hello',
              definition: '你好',
              pronunciation: 'hə-lō',
              category: 'greetings',
              difficulty: 'beginner',
              examples: ['Hello, how are you?'],
            },
            {
              id: 'word-2',
              term: 'goodbye',
              definition: '再見',
              pronunciation: 'good-bī',
              category: 'greetings',
              difficulty: 'beginner',
              examples: ['Goodbye, see you later!'],
            },
          ],
        },
      },
      activePackId: 'tc-en',
      downloadingPackId: null,
      isRefreshing: false,
      error: null,
    })
  })

  describe('getActivePackWords', () => {
    it('should return words from active pack', () => {
      const { getActivePackWords } = useLanguagePackStore.getState()

      const words = getActivePackWords()

      expect(words).toHaveLength(2)
      expect(words[0].term).toBe('hello')
      expect(words[1].term).toBe('goodbye')
    })

    it('should return empty array if active pack has no downloaded data', () => {
      useLanguagePackStore.setState({ activePackId: 'tc-ja' })
      const { getActivePackWords } = useLanguagePackStore.getState()

      const words = getActivePackWords()

      expect(words).toEqual([])
    })
  })

  describe('getPackById', () => {
    it('should return pack by id', () => {
      const { getPackById } = useLanguagePackStore.getState()

      const pack = getPackById('tc-en')

      expect(pack).toBeDefined()
      expect(pack?.name).toBe('English')
      expect(pack?.flag).toBe('🇺🇸')
    })

    it('should return undefined for non-existent pack', () => {
      const { getPackById } = useLanguagePackStore.getState()

      const pack = getPackById('non-existent')

      expect(pack).toBeUndefined()
    })
  })

  describe('isPackDownloaded', () => {
    it('should return true for downloaded pack', () => {
      const { isPackDownloaded } = useLanguagePackStore.getState()

      expect(isPackDownloaded('tc-en')).toBe(true)
    })

    it('should return false for non-downloaded pack', () => {
      const { isPackDownloaded } = useLanguagePackStore.getState()

      expect(isPackDownloaded('tc-ja')).toBe(false)
    })

    it('should return false for non-existent pack', () => {
      const { isPackDownloaded } = useLanguagePackStore.getState()

      expect(isPackDownloaded('non-existent')).toBe(false)
    })
  })

  describe('setActivePack', () => {
    it('should set active pack when pack is downloaded', () => {
      const { setActivePack } = useLanguagePackStore.getState()

      setActivePack('en-es')

      const state = useLanguagePackStore.getState()
      expect(state.activePackId).toBe('en-es')
    })

    it('should not set active pack when pack is not downloaded', () => {
      const { setActivePack } = useLanguagePackStore.getState()

      setActivePack('tc-ja')

      const state = useLanguagePackStore.getState()
      expect(state.activePackId).toBe('tc-en') // Should remain unchanged
    })
  })

  describe('deletePack', () => {
    it('should delete non-active, non-default pack', () => {
      // First add downloaded data for en-es
      useLanguagePackStore.setState((state) => ({
        ...state,
        downloadedData: {
          ...state.downloadedData,
          'en-es': { id: 'en-es', words: [] },
        },
      }))

      const { deletePack } = useLanguagePackStore.getState()
      deletePack('en-es')

      const state = useLanguagePackStore.getState()
      expect(state.downloadedData['en-es']).toBeUndefined()
      expect(state.availablePacks.find((p) => p.id === 'en-es')?.isDownloaded).toBe(false)
    })

    it('should not delete active pack', () => {
      const { deletePack } = useLanguagePackStore.getState()

      deletePack('tc-en')

      const state = useLanguagePackStore.getState()
      expect(state.downloadedData['tc-en']).toBeDefined()
    })

    it('should not delete default pack (tc-en)', () => {
      // Set active pack to something else first
      useLanguagePackStore.setState({ activePackId: 'en-es' })
      const { deletePack } = useLanguagePackStore.getState()

      deletePack('tc-en')

      const state = useLanguagePackStore.getState()
      expect(state.downloadedData['tc-en']).toBeDefined()
    })
  })

  describe('downloadPack', () => {
    it('should download pack and update state', async () => {
      const { downloadPack } = useLanguagePackStore.getState()

      await downloadPack('tc-ja')

      const state = useLanguagePackStore.getState()
      expect(state.downloadedData['tc-ja']).toBeDefined()
      expect(state.downloadedData['tc-ja'].words).toHaveLength(1)
      expect(state.availablePacks.find((p) => p.id === 'tc-ja')?.isDownloaded).toBe(true)
      expect(state.downloadingPackId).toBeNull()
    })

    it('should not download already downloaded pack', async () => {
      const { downloadPack } = useLanguagePackStore.getState()
      const originalData = useLanguagePackStore.getState().downloadedData['tc-en']

      await downloadPack('tc-en')

      const state = useLanguagePackStore.getState()
      expect(state.downloadedData['tc-en']).toBe(originalData)
    })

    it('should set downloadingPackId during download', async () => {
      const { downloadPack } = useLanguagePackStore.getState()

      const downloadPromise = downloadPack('tc-ja')

      // Check state during download
      const stateWhileDownloading = useLanguagePackStore.getState()
      expect(stateWhileDownloading.downloadingPackId).toBe('tc-ja')

      await downloadPromise

      const stateAfterDownload = useLanguagePackStore.getState()
      expect(stateAfterDownload.downloadingPackId).toBeNull()
    })
  })

  describe('clearError', () => {
    it('should clear error state', () => {
      useLanguagePackStore.setState({ error: 'Some error' })
      const { clearError } = useLanguagePackStore.getState()

      clearError()

      const state = useLanguagePackStore.getState()
      expect(state.error).toBeNull()
    })
  })
})

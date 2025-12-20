import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { LanguagePack, LanguagePackData, LanguageWord } from '../types/language.types'
import { availableLanguagePacks, downloadLanguagePack } from '../data/languagePacks'

interface LanguagePackState {
  // All available packs (metadata)
  availablePacks: LanguagePack[]

  // Downloaded pack data (actual words)
  downloadedData: Record<string, LanguagePackData>

  // Currently active pack ID
  activePackId: string

  // Loading states
  downloadingPackId: string | null
  isRefreshing: boolean

  // Error state
  error: string | null

  // Actions
  downloadPack: (packId: string) => Promise<void>
  deletePack: (packId: string) => void
  setActivePack: (packId: string) => void
  getActivePackWords: () => LanguageWord[]
  getPackById: (packId: string) => LanguagePack | undefined
  isPackDownloaded: (packId: string) => boolean
  refreshPacks: () => Promise<void>
  clearError: () => void
}

export const useLanguagePackStore = create<LanguagePackState>()(
  persist(
    immer((set, get) => ({
      availablePacks: availableLanguagePacks,
      downloadedData: {},
      activePackId: 'zh-en', // Default: Chinese speakers learning English
      downloadingPackId: null,
      isRefreshing: false,
      error: null,

      downloadPack: async (packId: string) => {
        const pack = get().availablePacks.find((p) => p.id === packId)
        if (!pack || pack.isDownloaded) return

        set((state) => {
          state.downloadingPackId = packId
          const packIndex = state.availablePacks.findIndex((p) => p.id === packId)
          if (packIndex !== -1) {
            state.availablePacks[packIndex].isDownloading = true
          }
        })

        try {
          const data = await downloadLanguagePack(packId)

          set((state) => {
            state.downloadedData[packId] = data
            state.downloadingPackId = null
            const packIndex = state.availablePacks.findIndex((p) => p.id === packId)
            if (packIndex !== -1) {
              state.availablePacks[packIndex].isDownloaded = true
              state.availablePacks[packIndex].isDownloading = false
            }
          })
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Failed to download language pack'
          set((state) => {
            state.downloadingPackId = null
            state.error = message
            const packIndex = state.availablePacks.findIndex((p) => p.id === packId)
            if (packIndex !== -1) {
              state.availablePacks[packIndex].isDownloading = false
            }
          })
        }
      },

      deletePack: (packId: string) => {
        // Don't allow deleting the active pack or pre-installed default
        if (packId === get().activePackId || packId === 'zh-en') return

        set((state) => {
          delete state.downloadedData[packId]
          const packIndex = state.availablePacks.findIndex((p) => p.id === packId)
          if (packIndex !== -1) {
            state.availablePacks[packIndex].isDownloaded = false
          }
        })
      },

      setActivePack: (packId: string) => {
        const pack = get().availablePacks.find((p) => p.id === packId)
        if (pack?.isDownloaded) {
          set((state) => {
            state.activePackId = packId
          })
        }
      },

      getActivePackWords: () => {
        const { activePackId, downloadedData } = get()
        return downloadedData[activePackId]?.words || []
      },

      getPackById: (packId: string) => {
        return get().availablePacks.find((p) => p.id === packId)
      },

      isPackDownloaded: (packId: string) => {
        return get().availablePacks.find((p) => p.id === packId)?.isDownloaded || false
      },

      refreshPacks: async () => {
        set((state) => {
          state.isRefreshing = true
        })

        try {
          // Simulate fetching latest packs from server
          // In a real app, this would be: const response = await fetch('/api/language-packs')
          await new Promise((resolve) => setTimeout(resolve, 1500))

          // Merge with existing packs, preserving download status
          const currentPacks = get().availablePacks
          const downloadedIds = currentPacks.filter((p) => p.isDownloaded).map((p) => p.id)

          set((state) => {
            // Update packs from "server" while preserving isDownloaded status
            state.availablePacks = availableLanguagePacks.map((pack) => ({
              ...pack,
              isDownloaded: downloadedIds.includes(pack.id),
            }))
            state.isRefreshing = false
          })
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Failed to refresh language packs'
          set((state) => {
            state.isRefreshing = false
            state.error = message
          })
        }
      },

      clearError: () =>
        set((state) => {
          state.error = null
        }),
    })),
    {
      name: 'kitsterm-language-packs-v1',
      partialize: (state) => ({
        availablePacks: state.availablePacks,
        downloadedData: state.downloadedData,
        activePackId: state.activePackId,
      }),
      // Initialize default pack on first load
      onRehydrateStorage: () => async (state) => {
        if (state && !state.downloadedData['zh-en']) {
          // Auto-download default pack (Chinese to English)
          const data = await downloadLanguagePack('zh-en')
          state.downloadedData['zh-en'] = data
        }
      },
    }
  )
)

// Initialize default pack on store creation
const initializeDefaultPack = async () => {
  const state = useLanguagePackStore.getState()
  if (!state.downloadedData['zh-en']) {
    try {
      const data = await downloadLanguagePack('zh-en')
      useLanguagePackStore.setState((s) => ({
        ...s,
        downloadedData: { ...s.downloadedData, 'zh-en': data },
      }))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to initialize default language pack'
      useLanguagePackStore.setState((s) => ({
        ...s,
        error: message,
      }))
    }
  }
}

initializeDefaultPack()

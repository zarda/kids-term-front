import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface FavoritesState {
  // Map of packId -> array of wordIds
  favoritesByPack: Record<string, string[]>

  // Actions
  toggleFavorite: (packId: string, wordId: string) => void
  isFavorite: (packId: string, wordId: string) => boolean
  getFavorites: (packId: string) => string[]
  getFavoritesCount: (packId: string) => number
  clearFavorites: (packId?: string) => void
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    immer((set, get) => ({
      favoritesByPack: {},

      toggleFavorite: (packId, wordId) =>
        set((state) => {
          if (!state.favoritesByPack[packId]) {
            state.favoritesByPack[packId] = []
          }

          const favorites = state.favoritesByPack[packId]
          const index = favorites.indexOf(wordId)

          if (index === -1) {
            favorites.push(wordId)
          } else {
            favorites.splice(index, 1)
          }
        }),

      isFavorite: (packId, wordId) => {
        const favorites = get().favoritesByPack[packId]
        return favorites ? favorites.includes(wordId) : false
      },

      getFavorites: (packId) => {
        return get().favoritesByPack[packId] ?? []
      },

      getFavoritesCount: (packId) => {
        const favorites = get().favoritesByPack[packId]
        return favorites ? favorites.length : 0
      },

      clearFavorites: (packId) =>
        set((state) => {
          if (packId) {
            state.favoritesByPack[packId] = []
          } else {
            state.favoritesByPack = {}
          }
        }),
    })),
    {
      name: 'kidsterm-favorites-v1',
    }
  )
)

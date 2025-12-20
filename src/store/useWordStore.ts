import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { Word } from '../types/word.types'
import { mockWords } from '../data/mockWords'

interface WordState {
  words: Word[]
  currentIndex: number
  isLoading: boolean

  // Actions
  setWords: (words: Word[]) => void
  toggleFavorite: (id: string) => void
  updateMasteryLevel: (id: string, level: number) => void
  nextWord: () => void
  previousWord: () => void
  setCurrentIndex: (index: number) => void
  getWordById: (id: string) => Word | undefined
  getFavorites: () => Word[]
  getByCategory: (category: string) => Word[]
  getByDifficulty: (difficulty: Word['difficulty']) => Word[]
}

export const useWordStore = create<WordState>()(
  persist(
    immer((set, get) => ({
      words: mockWords,
      currentIndex: 0,
      isLoading: false,

      setWords: (words) =>
        set((state) => {
          state.words = words
        }),

      toggleFavorite: (id) =>
        set((state) => {
          const word = state.words.find((w) => w.id === id)
          if (word) {
            word.isFavorite = !word.isFavorite
          }
        }),

      updateMasteryLevel: (id, level) =>
        set((state) => {
          const word = state.words.find((w) => w.id === id)
          if (word) {
            word.masteryLevel = Math.min(100, Math.max(0, level))
            word.lastReviewed = new Date().toISOString()
          }
        }),

      nextWord: () =>
        set((state) => {
          if (state.currentIndex < state.words.length - 1) {
            state.currentIndex += 1
          }
        }),

      previousWord: () =>
        set((state) => {
          if (state.currentIndex > 0) {
            state.currentIndex -= 1
          }
        }),

      setCurrentIndex: (index) =>
        set((state) => {
          state.currentIndex = Math.min(Math.max(0, index), state.words.length - 1)
        }),

      getWordById: (id) => get().words.find((w) => w.id === id),

      getFavorites: () => get().words.filter((w) => w.isFavorite),

      getByCategory: (category) => get().words.filter((w) => w.category === category),

      getByDifficulty: (difficulty) => get().words.filter((w) => w.difficulty === difficulty),
    })),
    {
      name: 'kitsterm-words-v2',
      partialize: (state) => ({
        words: state.words,
        currentIndex: state.currentIndex,
      }),
    }
  )
)

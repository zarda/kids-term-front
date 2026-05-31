import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { SrsCard, SrsRating } from '../types/srs.types'
import { createSrsCard, reviewCard } from '../utils/srs'

/**
 * Persisted spaced-repetition state: one `SrsCard` per word, grouped by pack.
 * All scheduling math lives in `src/utils/srs.ts`; this store just stores and
 * mutates the cards.
 */
interface SrsState {
  /** packId -> (wordId -> card) */
  cardsByPack: Record<string, Record<string, SrsCard>>

  /** Apply a rating to a word, creating its card on first review. Returns whether
   * the card was brand new (so callers can count it as a newly-learned word). */
  rate: (packId: string, wordId: string, rating: SrsRating, now?: Date) => boolean
  /** All cards for a pack (empty object if none yet). */
  getCards: (packId: string) => Record<string, SrsCard>
  /** A single card, or undefined if the word hasn't been reviewed. */
  getCard: (packId: string, wordId: string) => SrsCard | undefined
  /** Forget all scheduling for a pack. */
  resetPack: (packId: string) => void
}

export const useSrsStore = create<SrsState>()(
  persist(
    immer((set, get) => ({
      cardsByPack: {},

      rate: (packId, wordId, rating, now = new Date()) => {
        const existing = get().cardsByPack[packId]?.[wordId]
        const wasNew = existing === undefined
        const base = existing ?? createSrsCard(wordId, now)
        const updated = reviewCard(base, rating, now)
        set((state) => {
          if (!state.cardsByPack[packId]) {
            state.cardsByPack[packId] = {}
          }
          state.cardsByPack[packId][wordId] = updated
        })
        return wasNew
      },

      getCards: (packId) => get().cardsByPack[packId] ?? {},

      getCard: (packId, wordId) => get().cardsByPack[packId]?.[wordId],

      resetPack: (packId) =>
        set((state) => {
          delete state.cardsByPack[packId]
        }),
    })),
    {
      name: 'kidsterm-srs-v1',
    }
  )
)

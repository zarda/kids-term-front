import { describe, it, expect, beforeEach } from 'vitest'
import { useSrsStore } from './useSrsStore'

const PACK = 'tc-en'
const NOW = new Date('2026-05-31T12:00:00')

describe('useSrsStore', () => {
  beforeEach(() => {
    useSrsStore.setState({ cardsByPack: {} })
  })

  describe('rate', () => {
    it('creates a card on first review and reports it as new', () => {
      const wasNew = useSrsStore.getState().rate(PACK, 'word-1', 'good', NOW)

      expect(wasNew).toBe(true)
      const card = useSrsStore.getState().getCard(PACK, 'word-1')
      expect(card).toBeDefined()
      expect(card?.repetitions).toBe(1)
    })

    it('updates an existing card and reports it as not new', () => {
      const { rate } = useSrsStore.getState()
      rate(PACK, 'word-1', 'good', NOW)
      const wasNew = rate(PACK, 'word-1', 'good', NOW)

      expect(wasNew).toBe(false)
      expect(useSrsStore.getState().getCard(PACK, 'word-1')?.repetitions).toBe(2)
    })

    it('keeps separate cards per pack', () => {
      const { rate } = useSrsStore.getState()
      rate('pack-a', 'word-1', 'good', NOW)
      rate('pack-b', 'word-1', 'again', NOW)

      expect(Object.keys(useSrsStore.getState().getCards('pack-a'))).toEqual(['word-1'])
      expect(useSrsStore.getState().getCard('pack-b', 'word-1')?.repetitions).toBe(0)
    })
  })

  describe('getCards / getCard', () => {
    it('returns an empty object for an unknown pack', () => {
      expect(useSrsStore.getState().getCards('nope')).toEqual({})
    })

    it('returns undefined for an unknown word', () => {
      expect(useSrsStore.getState().getCard(PACK, 'missing')).toBeUndefined()
    })
  })

  describe('resetPack', () => {
    it('forgets all cards for a pack', () => {
      const { rate, resetPack } = useSrsStore.getState()
      rate(PACK, 'word-1', 'good', NOW)
      resetPack(PACK)

      expect(useSrsStore.getState().getCards(PACK)).toEqual({})
    })
  })
})

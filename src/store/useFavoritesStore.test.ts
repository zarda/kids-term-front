import { describe, it, expect, beforeEach } from 'vitest'
import { useFavoritesStore } from './useFavoritesStore'

describe('useFavoritesStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useFavoritesStore.setState({
      favoritesByPack: {},
    })
  })

  describe('toggleFavorite', () => {
    it('should add word to favorites if not already favorited', () => {
      const { toggleFavorite, getFavorites } = useFavoritesStore.getState()

      toggleFavorite('pack-1', 'word-1')

      expect(getFavorites('pack-1')).toContain('word-1')
    })

    it('should remove word from favorites if already favorited', () => {
      const { toggleFavorite, getFavorites } = useFavoritesStore.getState()

      toggleFavorite('pack-1', 'word-1')
      toggleFavorite('pack-1', 'word-1')

      expect(getFavorites('pack-1')).not.toContain('word-1')
    })

    it('should create pack entry if it does not exist', () => {
      const { toggleFavorite } = useFavoritesStore.getState()

      toggleFavorite('new-pack', 'word-1')

      const state = useFavoritesStore.getState()
      expect(state.favoritesByPack['new-pack']).toBeDefined()
    })

    it('should handle multiple words in the same pack', () => {
      const { toggleFavorite, getFavorites } = useFavoritesStore.getState()

      toggleFavorite('pack-1', 'word-1')
      toggleFavorite('pack-1', 'word-2')
      toggleFavorite('pack-1', 'word-3')

      const favorites = getFavorites('pack-1')
      expect(favorites).toContain('word-1')
      expect(favorites).toContain('word-2')
      expect(favorites).toContain('word-3')
      expect(favorites.length).toBe(3)
    })

    it('should keep favorites separate between packs', () => {
      const { toggleFavorite, getFavorites } = useFavoritesStore.getState()

      toggleFavorite('pack-1', 'word-1')
      toggleFavorite('pack-2', 'word-2')

      expect(getFavorites('pack-1')).toEqual(['word-1'])
      expect(getFavorites('pack-2')).toEqual(['word-2'])
    })
  })

  describe('isFavorite', () => {
    it('should return true if word is favorited', () => {
      const { toggleFavorite, isFavorite } = useFavoritesStore.getState()

      toggleFavorite('pack-1', 'word-1')

      expect(isFavorite('pack-1', 'word-1')).toBe(true)
    })

    it('should return false if word is not favorited', () => {
      const { isFavorite } = useFavoritesStore.getState()

      expect(isFavorite('pack-1', 'word-1')).toBe(false)
    })

    it('should return false for non-existent pack', () => {
      const { isFavorite } = useFavoritesStore.getState()

      expect(isFavorite('non-existent-pack', 'word-1')).toBe(false)
    })

    it('should return false after word is unfavorited', () => {
      const { toggleFavorite, isFavorite } = useFavoritesStore.getState()

      toggleFavorite('pack-1', 'word-1')
      toggleFavorite('pack-1', 'word-1')

      expect(isFavorite('pack-1', 'word-1')).toBe(false)
    })
  })

  describe('getFavorites', () => {
    it('should return empty array for non-existent pack', () => {
      const { getFavorites } = useFavoritesStore.getState()

      expect(getFavorites('non-existent-pack')).toEqual([])
    })

    it('should return all favorites for a pack', () => {
      const { toggleFavorite, getFavorites } = useFavoritesStore.getState()

      toggleFavorite('pack-1', 'word-1')
      toggleFavorite('pack-1', 'word-2')

      expect(getFavorites('pack-1')).toEqual(['word-1', 'word-2'])
    })
  })

  describe('getFavoritesCount', () => {
    it('should return 0 for non-existent pack', () => {
      const { getFavoritesCount } = useFavoritesStore.getState()

      expect(getFavoritesCount('non-existent-pack')).toBe(0)
    })

    it('should return correct count of favorites', () => {
      const { toggleFavorite, getFavoritesCount } = useFavoritesStore.getState()

      toggleFavorite('pack-1', 'word-1')
      toggleFavorite('pack-1', 'word-2')
      toggleFavorite('pack-1', 'word-3')

      expect(getFavoritesCount('pack-1')).toBe(3)
    })

    it('should decrease count when word is unfavorited', () => {
      const { toggleFavorite, getFavoritesCount } = useFavoritesStore.getState()

      toggleFavorite('pack-1', 'word-1')
      toggleFavorite('pack-1', 'word-2')
      toggleFavorite('pack-1', 'word-1') // unfavorite

      expect(getFavoritesCount('pack-1')).toBe(1)
    })
  })

  describe('clearFavorites', () => {
    it('should clear favorites for a specific pack', () => {
      const { toggleFavorite, clearFavorites, getFavorites } = useFavoritesStore.getState()

      toggleFavorite('pack-1', 'word-1')
      toggleFavorite('pack-1', 'word-2')
      toggleFavorite('pack-2', 'word-3')

      clearFavorites('pack-1')

      expect(getFavorites('pack-1')).toEqual([])
      expect(getFavorites('pack-2')).toEqual(['word-3'])
    })

    it('should clear all favorites when no packId is provided', () => {
      const { toggleFavorite, clearFavorites, getFavorites } = useFavoritesStore.getState()

      toggleFavorite('pack-1', 'word-1')
      toggleFavorite('pack-2', 'word-2')

      clearFavorites()

      expect(getFavorites('pack-1')).toEqual([])
      expect(getFavorites('pack-2')).toEqual([])
    })
  })
})

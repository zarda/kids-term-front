import { describe, it, expect, beforeEach } from 'vitest'
import { useWordStore } from './useWordStore'
import type { Word } from '../types/word.types'

const mockTestWords: Word[] = [
  {
    id: 'test-1',
    term: 'hello',
    definition: 'a greeting',
    pronunciation: '/həˈloʊ/',
    examples: ['Hello, how are you?'],
    category: 'greetings',
    difficulty: 'beginner',
    isFavorite: false,
    masteryLevel: 0,
    lastReviewed: undefined,
  },
  {
    id: 'test-2',
    term: 'goodbye',
    definition: 'a farewell',
    pronunciation: '/ɡʊdˈbaɪ/',
    examples: ['Goodbye, see you later!'],
    category: 'greetings',
    difficulty: 'beginner',
    isFavorite: true,
    masteryLevel: 50,
    lastReviewed: undefined,
  },
  {
    id: 'test-3',
    term: 'algorithm',
    definition: 'a set of rules',
    pronunciation: '/ˈælɡəˌrɪðəm/',
    examples: ['The algorithm is efficient'],
    category: 'technology',
    difficulty: 'advanced',
    isFavorite: false,
    masteryLevel: 25,
    lastReviewed: undefined,
  },
]

describe('useWordStore', () => {
  beforeEach(() => {
    useWordStore.setState({
      words: mockTestWords,
      currentIndex: 0,
      isLoading: false,
    })
  })

  describe('setWords', () => {
    it('should set words array', () => {
      const { setWords } = useWordStore.getState()
      const newWords: Word[] = [mockTestWords[0]]

      setWords(newWords)

      expect(useWordStore.getState().words.length).toBe(1)
    })
  })

  describe('toggleFavorite', () => {
    it('should toggle favorite status to true', () => {
      const { toggleFavorite } = useWordStore.getState()

      toggleFavorite('test-1')

      const word = useWordStore.getState().words.find((w) => w.id === 'test-1')
      expect(word?.isFavorite).toBe(true)
    })

    it('should toggle favorite status to false', () => {
      const { toggleFavorite } = useWordStore.getState()

      toggleFavorite('test-2')

      const word = useWordStore.getState().words.find((w) => w.id === 'test-2')
      expect(word?.isFavorite).toBe(false)
    })

    it('should do nothing for non-existent word', () => {
      const { toggleFavorite } = useWordStore.getState()
      const initialWords = [...useWordStore.getState().words]

      toggleFavorite('non-existent')

      expect(useWordStore.getState().words).toEqual(initialWords)
    })
  })

  describe('updateMasteryLevel', () => {
    it('should update mastery level', () => {
      const { updateMasteryLevel } = useWordStore.getState()

      updateMasteryLevel('test-1', 75)

      const word = useWordStore.getState().words.find((w) => w.id === 'test-1')
      expect(word?.masteryLevel).toBe(75)
    })

    it('should clamp mastery level to max 100', () => {
      const { updateMasteryLevel } = useWordStore.getState()

      updateMasteryLevel('test-1', 150)

      const word = useWordStore.getState().words.find((w) => w.id === 'test-1')
      expect(word?.masteryLevel).toBe(100)
    })

    it('should clamp mastery level to min 0', () => {
      const { updateMasteryLevel } = useWordStore.getState()

      updateMasteryLevel('test-1', -10)

      const word = useWordStore.getState().words.find((w) => w.id === 'test-1')
      expect(word?.masteryLevel).toBe(0)
    })

    it('should update lastReviewed timestamp', () => {
      const { updateMasteryLevel } = useWordStore.getState()

      updateMasteryLevel('test-1', 50)

      const word = useWordStore.getState().words.find((w) => w.id === 'test-1')
      expect(word?.lastReviewed).not.toBeNull()
    })
  })

  describe('navigation', () => {
    it('should go to next word', () => {
      const { nextWord } = useWordStore.getState()

      nextWord()

      expect(useWordStore.getState().currentIndex).toBe(1)
    })

    it('should not go past last word', () => {
      useWordStore.setState({ currentIndex: 2 })
      const { nextWord } = useWordStore.getState()

      nextWord()

      expect(useWordStore.getState().currentIndex).toBe(2)
    })

    it('should go to previous word', () => {
      useWordStore.setState({ currentIndex: 2 })
      const { previousWord } = useWordStore.getState()

      previousWord()

      expect(useWordStore.getState().currentIndex).toBe(1)
    })

    it('should not go before first word', () => {
      const { previousWord } = useWordStore.getState()

      previousWord()

      expect(useWordStore.getState().currentIndex).toBe(0)
    })

    it('should set current index within bounds', () => {
      const { setCurrentIndex } = useWordStore.getState()

      setCurrentIndex(1)

      expect(useWordStore.getState().currentIndex).toBe(1)
    })

    it('should clamp current index to max', () => {
      const { setCurrentIndex } = useWordStore.getState()

      setCurrentIndex(100)

      expect(useWordStore.getState().currentIndex).toBe(2)
    })

    it('should clamp current index to min', () => {
      const { setCurrentIndex } = useWordStore.getState()

      setCurrentIndex(-5)

      expect(useWordStore.getState().currentIndex).toBe(0)
    })
  })

  describe('getters', () => {
    it('should get word by id', () => {
      const { getWordById } = useWordStore.getState()

      const word = getWordById('test-2')

      expect(word?.term).toBe('goodbye')
    })

    it('should return undefined for non-existent id', () => {
      const { getWordById } = useWordStore.getState()

      const word = getWordById('non-existent')

      expect(word).toBeUndefined()
    })

    it('should get favorites', () => {
      const { getFavorites } = useWordStore.getState()

      const favorites = getFavorites()

      expect(favorites.length).toBe(1)
      expect(favorites[0].id).toBe('test-2')
    })

    it('should get words by category', () => {
      const { getByCategory } = useWordStore.getState()

      const greetings = getByCategory('greetings')

      expect(greetings.length).toBe(2)
    })

    it('should get words by difficulty', () => {
      const { getByDifficulty } = useWordStore.getState()

      const advanced = getByDifficulty('advanced')

      expect(advanced.length).toBe(1)
      expect(advanced[0].term).toBe('algorithm')
    })
  })
})

import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useActiveLanguagePack } from './useActiveLanguagePack'
import { useLanguagePackStore } from '../store/useLanguagePackStore'
import { useSettingsStore } from '../store/useSettingsStore'
import { createMockWord, createMockLanguagePack, resetFactoryCounters } from '../test/factories'
import type { LanguageWord } from '../types/language.types'

describe('useActiveLanguagePack', () => {
  const mockWords: LanguageWord[] = [
    createMockWord({ id: 'word-1', difficulty: 'beginner' }),
    createMockWord({ id: 'word-2', difficulty: 'beginner' }),
    createMockWord({ id: 'word-3', difficulty: 'intermediate' }),
    createMockWord({ id: 'word-4', difficulty: 'advanced' }),
  ]

  const mockPack = createMockLanguagePack({
    id: 'test-pack',
    isDownloaded: true,
  })

  beforeEach(() => {
    resetFactoryCounters()

    // Reset language pack store
    useLanguagePackStore.setState({
      availablePacks: [mockPack],
      downloadedData: {
        'test-pack': {
          id: 'test-pack',
          words: mockWords,
        },
      },
      activePackId: 'test-pack',
      downloadingPackId: null,
      isRefreshing: false,
      error: null,
    })

    // Reset settings store
    useSettingsStore.setState({
      selectedDifficulty: 'all',
    })
  })

  describe('words', () => {
    it('should return all words when selectedDifficulty is "all"', () => {
      useSettingsStore.setState({ selectedDifficulty: 'all' })

      const { result } = renderHook(() => useActiveLanguagePack())

      expect(result.current.words).toHaveLength(4)
    })

    it('should filter words by beginner difficulty', () => {
      useSettingsStore.setState({ selectedDifficulty: 'beginner' })

      const { result } = renderHook(() => useActiveLanguagePack())

      expect(result.current.words).toHaveLength(2)
      expect(result.current.words.every((w) => w.difficulty === 'beginner')).toBe(true)
    })

    it('should filter words by intermediate difficulty', () => {
      useSettingsStore.setState({ selectedDifficulty: 'intermediate' })

      const { result } = renderHook(() => useActiveLanguagePack())

      expect(result.current.words).toHaveLength(1)
      expect(result.current.words[0].difficulty).toBe('intermediate')
    })

    it('should filter words by advanced difficulty', () => {
      useSettingsStore.setState({ selectedDifficulty: 'advanced' })

      const { result } = renderHook(() => useActiveLanguagePack())

      expect(result.current.words).toHaveLength(1)
      expect(result.current.words[0].difficulty).toBe('advanced')
    })

    it('should return empty array when no words match difficulty', () => {
      const wordsWithOnlyBeginner = [
        createMockWord({ difficulty: 'beginner' }),
        createMockWord({ difficulty: 'beginner' }),
      ]

      useLanguagePackStore.setState({
        downloadedData: {
          'test-pack': {
            id: 'test-pack',
            words: wordsWithOnlyBeginner,
          },
        },
      })

      useSettingsStore.setState({ selectedDifficulty: 'advanced' })

      const { result } = renderHook(() => useActiveLanguagePack())

      expect(result.current.words).toHaveLength(0)
    })

    it('should return empty array when no pack data exists', () => {
      useLanguagePackStore.setState({
        downloadedData: {},
        activePackId: 'nonexistent',
      })

      const { result } = renderHook(() => useActiveLanguagePack())

      expect(result.current.words).toHaveLength(0)
    })
  })

  describe('activePack', () => {
    it('should return the active pack', () => {
      const { result } = renderHook(() => useActiveLanguagePack())

      expect(result.current.activePack).toBeDefined()
      expect(result.current.activePack?.id).toBe('test-pack')
    })

    it('should return undefined when active pack does not exist', () => {
      useLanguagePackStore.setState({
        activePackId: 'nonexistent',
        availablePacks: [],
      })

      const { result } = renderHook(() => useActiveLanguagePack())

      expect(result.current.activePack).toBeUndefined()
    })
  })

  describe('activePackId', () => {
    it('should return the active pack ID', () => {
      const { result } = renderHook(() => useActiveLanguagePack())

      expect(result.current.activePackId).toBe('test-pack')
    })
  })

  describe('isLoading', () => {
    it('should return true when downloadingPackId matches activePackId', () => {
      useLanguagePackStore.setState({
        downloadingPackId: 'test-pack',
      })

      const { result } = renderHook(() => useActiveLanguagePack())

      expect(result.current.isLoading).toBe(true)
    })

    it('should return false when downloadingPackId does not match activePackId', () => {
      useLanguagePackStore.setState({
        downloadingPackId: 'other-pack',
      })

      const { result } = renderHook(() => useActiveLanguagePack())

      expect(result.current.isLoading).toBe(false)
    })

    it('should return false when downloadingPackId is null', () => {
      useLanguagePackStore.setState({
        downloadingPackId: null,
      })

      const { result } = renderHook(() => useActiveLanguagePack())

      expect(result.current.isLoading).toBe(false)
    })
  })
})

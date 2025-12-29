import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSwipeOnboarding } from './useSwipeOnboarding'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
    _getStore: () => store,
    _setStore: (newStore: Record<string, string>) => {
      store = newStore
    },
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('useSwipeOnboarding', () => {
  const STORAGE_KEY = 'kidsterm-swipe-hints'
  const today = new Date().toISOString().split('T')[0]

  beforeEach(() => {
    localStorageMock.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('initial state', () => {
    it('should show hints on first visit (no localStorage data)', () => {
      const { result } = renderHook(() => useSwipeOnboarding())

      expect(result.current.showHints).toBe(true)
      expect(result.current.swipeCount).toBe(0)
    })

    it('should have recordSwipe function', () => {
      const { result } = renderHook(() => useSwipeOnboarding())

      expect(typeof result.current.recordSwipe).toBe('function')
    })
  })

  describe('showHints logic', () => {
    it('should show hints when swipeCount < 3', () => {
      localStorageMock._setStore({
        [STORAGE_KEY]: JSON.stringify({ date: today, swipeCount: 2 }),
      })

      const { result } = renderHook(() => useSwipeOnboarding())

      expect(result.current.showHints).toBe(true)
    })

    it('should not show hints when swipeCount >= 3', () => {
      localStorageMock._setStore({
        [STORAGE_KEY]: JSON.stringify({ date: today, swipeCount: 3 }),
      })

      const { result } = renderHook(() => useSwipeOnboarding())

      expect(result.current.showHints).toBe(false)
    })

    it('should not show hints when swipeCount > 3', () => {
      localStorageMock._setStore({
        [STORAGE_KEY]: JSON.stringify({ date: today, swipeCount: 10 }),
      })

      const { result } = renderHook(() => useSwipeOnboarding())

      expect(result.current.showHints).toBe(false)
    })
  })

  describe('new day reset', () => {
    it('should reset swipeCount on new day', () => {
      // Set data for yesterday
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayString = yesterday.toISOString().split('T')[0]

      localStorageMock._setStore({
        [STORAGE_KEY]: JSON.stringify({ date: yesterdayString, swipeCount: 10 }),
      })

      const { result } = renderHook(() => useSwipeOnboarding())

      // Should reset to 0 and show hints
      expect(result.current.swipeCount).toBe(0)
      expect(result.current.showHints).toBe(true)
    })

    it('should maintain swipeCount on same day', () => {
      localStorageMock._setStore({
        [STORAGE_KEY]: JSON.stringify({ date: today, swipeCount: 2 }),
      })

      const { result } = renderHook(() => useSwipeOnboarding())

      expect(result.current.swipeCount).toBe(2)
    })
  })

  describe('recordSwipe', () => {
    it('should increment swipeCount', () => {
      const { result } = renderHook(() => useSwipeOnboarding())

      expect(result.current.swipeCount).toBe(0)

      act(() => {
        result.current.recordSwipe()
      })

      expect(result.current.swipeCount).toBe(1)
    })

    it('should increment swipeCount multiple times', () => {
      const { result } = renderHook(() => useSwipeOnboarding())

      act(() => {
        result.current.recordSwipe()
      })
      act(() => {
        result.current.recordSwipe()
      })
      act(() => {
        result.current.recordSwipe()
      })

      expect(result.current.swipeCount).toBe(3)
      expect(result.current.showHints).toBe(false)
    })

    it('should persist to localStorage', () => {
      const { result } = renderHook(() => useSwipeOnboarding())

      act(() => {
        result.current.recordSwipe()
      })

      expect(localStorageMock.setItem).toHaveBeenCalled()
    })

    it('should reset count and set new date on new day', () => {
      // Set data for yesterday with high count
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayString = yesterday.toISOString().split('T')[0]

      localStorageMock._setStore({
        [STORAGE_KEY]: JSON.stringify({ date: yesterdayString, swipeCount: 10 }),
      })

      const { result } = renderHook(() => useSwipeOnboarding())

      // Should start at 0 due to new day
      expect(result.current.swipeCount).toBe(0)

      // Record a swipe - should be 1 (not 11)
      act(() => {
        result.current.recordSwipe()
      })

      expect(result.current.swipeCount).toBe(1)
    })
  })

  describe('threshold behavior', () => {
    it('should transition from showing hints to not showing after 3 swipes', () => {
      const { result } = renderHook(() => useSwipeOnboarding())

      expect(result.current.showHints).toBe(true)

      act(() => {
        result.current.recordSwipe()
      })
      expect(result.current.showHints).toBe(true)

      act(() => {
        result.current.recordSwipe()
      })
      expect(result.current.showHints).toBe(true)

      act(() => {
        result.current.recordSwipe()
      })
      expect(result.current.showHints).toBe(false)
    })
  })
})

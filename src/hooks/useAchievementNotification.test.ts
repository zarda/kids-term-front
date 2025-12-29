import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAchievementNotification } from './useAchievementNotification'
import { useProgressStore } from '../store/useProgressStore'

// Mock Chakra UI's useToast
const mockToast = vi.fn()
vi.mock('@chakra-ui/react', () => ({
  useToast: () => mockToast,
}))

// Mock useTranslation
vi.mock('./useTranslation', () => ({
  useTranslation: () => ({
    t: {
      progress: {
        achievementUnlocked: 'Achievement Unlocked!',
      },
      achievements: {
        'streak-7': {
          title: '7 Day Streak',
          description: 'Keep learning for 7 days',
        },
        'words-100': {
          title: '100 Words',
          description: 'Learn 100 words',
        },
      },
    },
  }),
}))

describe('useAchievementNotification', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Reset progress store
    useProgressStore.setState({
      lastUnlockedAchievement: null,
      achievements: [],
    })
  })

  describe('when no achievement is unlocked', () => {
    it('should not show toast when lastUnlockedAchievement is null', () => {
      useProgressStore.setState({ lastUnlockedAchievement: null })

      renderHook(() => useAchievementNotification())

      expect(mockToast).not.toHaveBeenCalled()
    })
  })

  describe('when an achievement is unlocked', () => {
    it('should show toast when new achievement is unlocked', () => {
      useProgressStore.setState({ lastUnlockedAchievement: 'streak-7' })

      renderHook(() => useAchievementNotification())

      expect(mockToast).toHaveBeenCalledWith({
        title: expect.stringContaining('Achievement Unlocked!'),
        description: '7 Day Streak',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top',
      })
    })

    it('should include achievement icon in toast title', () => {
      useProgressStore.setState({ lastUnlockedAchievement: 'streak-7' })

      renderHook(() => useAchievementNotification())

      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: expect.stringContaining('⚡'),
        })
      )
    })

    it('should clear lastUnlockedAchievement after showing toast', () => {
      useProgressStore.setState({ lastUnlockedAchievement: 'streak-7' })

      renderHook(() => useAchievementNotification())

      expect(useProgressStore.getState().lastUnlockedAchievement).toBeNull()
    })

    it('should not show toast for same achievement twice', async () => {
      useProgressStore.setState({ lastUnlockedAchievement: 'streak-7' })

      const { rerender } = renderHook(() => useAchievementNotification())

      expect(mockToast).toHaveBeenCalledTimes(1)

      // Set same achievement again (simulating re-render with same value)
      await act(async () => {
        useProgressStore.setState({ lastUnlockedAchievement: 'streak-7' })
      })
      rerender()

      // Should still only be called once
      expect(mockToast).toHaveBeenCalledTimes(1)
    })

    it('should show toast for different achievement', async () => {
      useProgressStore.setState({ lastUnlockedAchievement: 'streak-7' })

      const { rerender } = renderHook(() => useAchievementNotification())

      expect(mockToast).toHaveBeenCalledTimes(1)

      // Set different achievement
      await act(async () => {
        useProgressStore.setState({ lastUnlockedAchievement: 'words-100' })
      })
      rerender()

      expect(mockToast).toHaveBeenCalledTimes(2)
      expect(mockToast).toHaveBeenLastCalledWith(
        expect.objectContaining({
          description: '100 Words',
        })
      )
    })
  })

  describe('when achievement has no translation', () => {
    it('should not show toast for unknown achievement', () => {
      useProgressStore.setState({ lastUnlockedAchievement: 'unknown-achievement' })

      renderHook(() => useAchievementNotification())

      expect(mockToast).not.toHaveBeenCalled()
    })
  })
})

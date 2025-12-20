import { describe, it, expect, beforeEach } from 'vitest'
import { useProgressStore } from './useProgressStore'

describe('useProgressStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useProgressStore.setState({
      currentStreak: 0,
      longestStreak: 0,
      totalWordsLearned: 0,
      totalExercisesCompleted: 0,
      dailyProgress: [],
      achievements: [],
      lastActiveDate: new Date().toISOString().split('T')[0],
      dailyGoal: 10,
      todayWordsLearned: 0,
    })
  })

  describe('incrementWordsLearned', () => {
    it('should increment total words learned by 1 by default', () => {
      const { incrementWordsLearned } = useProgressStore.getState()

      incrementWordsLearned()

      const state = useProgressStore.getState()
      expect(state.totalWordsLearned).toBe(1)
      expect(state.todayWordsLearned).toBe(1)
    })

    it('should increment by custom count', () => {
      const { incrementWordsLearned } = useProgressStore.getState()

      incrementWordsLearned(5)

      const state = useProgressStore.getState()
      expect(state.totalWordsLearned).toBe(5)
      expect(state.todayWordsLearned).toBe(5)
    })

    it('should create daily progress entry if not exists', () => {
      const { incrementWordsLearned } = useProgressStore.getState()

      incrementWordsLearned()

      const state = useProgressStore.getState()
      expect(state.dailyProgress.length).toBe(1)
      expect(state.dailyProgress[0].wordsLearned).toBe(1)
    })

    it('should update existing daily progress entry', () => {
      const { incrementWordsLearned } = useProgressStore.getState()

      incrementWordsLearned(3)
      incrementWordsLearned(2)

      const state = useProgressStore.getState()
      expect(state.dailyProgress.length).toBe(1)
      expect(state.dailyProgress[0].wordsLearned).toBe(5)
    })
  })

  describe('incrementExercisesCompleted', () => {
    it('should increment total exercises completed', () => {
      const { incrementExercisesCompleted } = useProgressStore.getState()

      incrementExercisesCompleted()

      const state = useProgressStore.getState()
      expect(state.totalExercisesCompleted).toBe(1)
    })

    it('should update daily progress exercises count', () => {
      const { incrementExercisesCompleted } = useProgressStore.getState()

      incrementExercisesCompleted()
      incrementExercisesCompleted()

      const state = useProgressStore.getState()
      expect(state.dailyProgress[0].exercisesCompleted).toBe(2)
    })
  })

  describe('recordCorrectAnswer', () => {
    it('should increment correct answers in daily progress', () => {
      const { incrementExercisesCompleted, recordCorrectAnswer } = useProgressStore.getState()

      // First create a daily progress entry
      incrementExercisesCompleted()
      recordCorrectAnswer()

      const state = useProgressStore.getState()
      expect(state.dailyProgress[0].correctAnswers).toBe(1)
    })
  })

  describe('addTimeSpent', () => {
    it('should add time spent to daily progress', () => {
      const { incrementWordsLearned, addTimeSpent } = useProgressStore.getState()

      // Create daily progress entry first
      incrementWordsLearned()
      addTimeSpent(15)

      const state = useProgressStore.getState()
      expect(state.dailyProgress[0].timeSpent).toBe(15)
    })

    it('should accumulate time spent', () => {
      const { incrementWordsLearned, addTimeSpent } = useProgressStore.getState()

      incrementWordsLearned()
      addTimeSpent(10)
      addTimeSpent(5)

      const state = useProgressStore.getState()
      expect(state.dailyProgress[0].timeSpent).toBe(15)
    })
  })

  describe('unlockAchievement', () => {
    it('should add achievement to list', () => {
      const { unlockAchievement } = useProgressStore.getState()

      unlockAchievement('first-word')

      const state = useProgressStore.getState()
      expect(state.achievements).toContain('first-word')
    })

    it('should not duplicate achievements', () => {
      const { unlockAchievement } = useProgressStore.getState()

      unlockAchievement('first-word')
      unlockAchievement('first-word')

      const state = useProgressStore.getState()
      expect(state.achievements.filter((a) => a === 'first-word').length).toBe(1)
    })
  })

  describe('setDailyGoal', () => {
    it('should update daily goal', () => {
      const { setDailyGoal } = useProgressStore.getState()

      setDailyGoal(20)

      const state = useProgressStore.getState()
      expect(state.dailyGoal).toBe(20)
    })
  })

  describe('getTodayProgress', () => {
    it('should return undefined when no progress exists', () => {
      const { getTodayProgress } = useProgressStore.getState()

      const progress = getTodayProgress()

      expect(progress).toBeUndefined()
    })

    it('should return today progress when it exists', () => {
      const { incrementWordsLearned, getTodayProgress } = useProgressStore.getState()

      incrementWordsLearned(3)
      const progress = getTodayProgress()

      expect(progress).toBeDefined()
      expect(progress?.wordsLearned).toBe(3)
    })
  })
})

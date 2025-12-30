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
      lastWordIndex: {},
      wordIndexHistory: {},
      consecutiveCorrectAnswers: 0,
      lastUnlockedAchievement: null,
      gamesPlayed: 0,
      perfectGames: 0,
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

  describe('achievement auto-unlocking', () => {
    it('should unlock words-1 achievement when learning first word', () => {
      const { incrementWordsLearned } = useProgressStore.getState()

      incrementWordsLearned(1)

      const state = useProgressStore.getState()
      expect(state.achievements).toContain('words-1')
      // streak-1 is also unlocked on first word learned (first activity)
      expect(state.achievements).toContain('streak-1')
    })

    it('should unlock words-10 achievement when reaching 10 words', () => {
      const { incrementWordsLearned } = useProgressStore.getState()

      incrementWordsLearned(10)

      const state = useProgressStore.getState()
      expect(state.achievements).toContain('words-10')
    })

    it('should unlock exercises-1 achievement when completing first exercise', () => {
      const { incrementExercisesCompleted } = useProgressStore.getState()

      incrementExercisesCompleted()

      const state = useProgressStore.getState()
      expect(state.achievements).toContain('exercises-1')
    })

    it('should unlock accuracy-perfect-3 after 3 consecutive correct answers', () => {
      const { recordCorrectAnswer } = useProgressStore.getState()

      recordCorrectAnswer()
      recordCorrectAnswer()
      recordCorrectAnswer()

      const state = useProgressStore.getState()
      expect(state.consecutiveCorrectAnswers).toBe(3)
      expect(state.achievements).toContain('accuracy-perfect-3')
    })

    it('should reset consecutive correct answers on incorrect answer', () => {
      const { recordCorrectAnswer, recordIncorrectAnswer } = useProgressStore.getState()

      recordCorrectAnswer()
      recordCorrectAnswer()
      recordIncorrectAnswer()

      const state = useProgressStore.getState()
      expect(state.consecutiveCorrectAnswers).toBe(0)
    })

    it('should not duplicate achievements', () => {
      const { incrementWordsLearned } = useProgressStore.getState()

      incrementWordsLearned(10)
      incrementWordsLearned(5) // Still above 10

      const state = useProgressStore.getState()
      expect(state.achievements.filter((a) => a === 'words-10').length).toBe(1)
    })

    it('should unlock time-5 achievement after 5 minutes spent', () => {
      const { addTimeSpent } = useProgressStore.getState()

      addTimeSpent(5)

      const state = useProgressStore.getState()
      expect(state.achievements).toContain('time-5')
    })

    it('should clear lastUnlockedAchievement when requested', () => {
      const { incrementWordsLearned, clearLastUnlockedAchievement } = useProgressStore.getState()

      incrementWordsLearned(1)
      // streak-1 is the last achievement unlocked (after words-1)
      expect(useProgressStore.getState().lastUnlockedAchievement).toBe('streak-1')

      clearLastUnlockedAchievement()
      expect(useProgressStore.getState().lastUnlockedAchievement).toBeNull()
    })
  })

  describe('incrementGamesPlayed', () => {
    it('should increment games played count', () => {
      const { incrementGamesPlayed } = useProgressStore.getState()

      incrementGamesPlayed()

      const state = useProgressStore.getState()
      expect(state.gamesPlayed).toBe(1)
    })

    it('should accumulate games played', () => {
      const { incrementGamesPlayed } = useProgressStore.getState()

      incrementGamesPlayed()
      incrementGamesPlayed()
      incrementGamesPlayed()

      const state = useProgressStore.getState()
      expect(state.gamesPlayed).toBe(3)
    })

    it('should unlock games-1 achievement on first game', () => {
      const { incrementGamesPlayed } = useProgressStore.getState()

      incrementGamesPlayed()

      const state = useProgressStore.getState()
      expect(state.achievements).toContain('games-1')
    })

    it('should unlock games-10 achievement after 10 games', () => {
      const { incrementGamesPlayed } = useProgressStore.getState()

      for (let i = 0; i < 10; i++) {
        incrementGamesPlayed()
      }

      const state = useProgressStore.getState()
      expect(state.achievements).toContain('games-10')
    })
  })

  describe('incrementPerfectGames', () => {
    it('should increment perfect games count', () => {
      const { incrementPerfectGames } = useProgressStore.getState()

      incrementPerfectGames()

      const state = useProgressStore.getState()
      expect(state.perfectGames).toBe(1)
    })

    it('should accumulate perfect games', () => {
      const { incrementPerfectGames } = useProgressStore.getState()

      incrementPerfectGames()
      incrementPerfectGames()

      const state = useProgressStore.getState()
      expect(state.perfectGames).toBe(2)
    })

    it('should unlock perfect-3 achievement after 3 perfect games', () => {
      const { incrementPerfectGames } = useProgressStore.getState()

      incrementPerfectGames()
      incrementPerfectGames()
      incrementPerfectGames()

      const state = useProgressStore.getState()
      expect(state.achievements).toContain('perfect-3')
    })

    it('should unlock perfect-10 achievement after 10 perfect games', () => {
      const { incrementPerfectGames } = useProgressStore.getState()

      for (let i = 0; i < 10; i++) {
        incrementPerfectGames()
      }

      const state = useProgressStore.getState()
      expect(state.achievements).toContain('perfect-10')
    })
  })

  describe('lastWordIndex', () => {
    it('should return 0 for non-existent pack', () => {
      const { getLastWordIndex } = useProgressStore.getState()

      expect(getLastWordIndex('non-existent-pack')).toBe(0)
    })

    it('should store and retrieve last word index for a pack', () => {
      const { setLastWordIndex, getLastWordIndex } = useProgressStore.getState()

      setLastWordIndex('pack-1', 42)

      expect(getLastWordIndex('pack-1')).toBe(42)
    })

    it('should update existing word index', () => {
      const { setLastWordIndex, getLastWordIndex } = useProgressStore.getState()

      setLastWordIndex('pack-1', 10)
      setLastWordIndex('pack-1', 25)

      expect(getLastWordIndex('pack-1')).toBe(25)
    })

    it('should keep separate indices for different packs', () => {
      const { setLastWordIndex, getLastWordIndex } = useProgressStore.getState()

      setLastWordIndex('pack-1', 10)
      setLastWordIndex('pack-2', 20)
      setLastWordIndex('pack-1:favorites', 5)

      expect(getLastWordIndex('pack-1')).toBe(10)
      expect(getLastWordIndex('pack-2')).toBe(20)
      expect(getLastWordIndex('pack-1:favorites')).toBe(5)
    })
  })

  describe('wordIndexHistory', () => {
    it('should return empty array for non-existent key', () => {
      const { getWordIndexHistory } = useProgressStore.getState()

      expect(getWordIndexHistory('non-existent-key')).toEqual([])
    })

    it('should add index to history', () => {
      const { addToWordIndexHistory, getWordIndexHistory } = useProgressStore.getState()

      addToWordIndexHistory('pack-1', 10)

      const history = getWordIndexHistory('pack-1')
      expect(history.length).toBe(1)
      expect(history[0].index).toBe(10)
      expect(history[0].timestamp).toBeDefined()
    })

    it('should add new entries at the front', () => {
      const { addToWordIndexHistory, getWordIndexHistory } = useProgressStore.getState()

      addToWordIndexHistory('pack-1', 10)
      addToWordIndexHistory('pack-1', 20)
      addToWordIndexHistory('pack-1', 30)

      const history = getWordIndexHistory('pack-1')
      expect(history[0].index).toBe(30)
      expect(history[1].index).toBe(20)
      expect(history[2].index).toBe(10)
    })

    it('should remove duplicates when adding same index', () => {
      const { addToWordIndexHistory, getWordIndexHistory } = useProgressStore.getState()

      addToWordIndexHistory('pack-1', 10)
      addToWordIndexHistory('pack-1', 20)
      addToWordIndexHistory('pack-1', 10) // duplicate

      const history = getWordIndexHistory('pack-1')
      expect(history.length).toBe(2)
      expect(history[0].index).toBe(10)
      expect(history[1].index).toBe(20)
    })

    it('should keep only last 5 entries', () => {
      const { addToWordIndexHistory, getWordIndexHistory } = useProgressStore.getState()

      for (let i = 1; i <= 7; i++) {
        addToWordIndexHistory('pack-1', i * 10)
      }

      const history = getWordIndexHistory('pack-1')
      expect(history.length).toBe(5)
      expect(history[0].index).toBe(70) // most recent
      expect(history[4].index).toBe(30) // oldest (6th and 7th trimmed)
    })

    it('should keep separate histories for different keys', () => {
      const { addToWordIndexHistory, getWordIndexHistory } = useProgressStore.getState()

      addToWordIndexHistory('pack-1', 10)
      addToWordIndexHistory('pack-2', 20)
      addToWordIndexHistory('pack-1:favorites', 5)

      expect(getWordIndexHistory('pack-1')[0].index).toBe(10)
      expect(getWordIndexHistory('pack-2')[0].index).toBe(20)
      expect(getWordIndexHistory('pack-1:favorites')[0].index).toBe(5)
    })

    it('should have timestamps in descending order (most recent first)', () => {
      const { addToWordIndexHistory, getWordIndexHistory } = useProgressStore.getState()

      addToWordIndexHistory('pack-1', 10)
      // Small delay to ensure different timestamps
      addToWordIndexHistory('pack-1', 20)
      addToWordIndexHistory('pack-1', 30)

      const history = getWordIndexHistory('pack-1')
      // Most recent should be first
      expect(history[0].timestamp).toBeGreaterThanOrEqual(history[1].timestamp)
      expect(history[1].timestamp).toBeGreaterThanOrEqual(history[2].timestamp)
    })
  })
})

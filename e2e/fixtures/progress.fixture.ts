/**
 * Progress state fixtures for E2E tests
 * Mirrors the structure in useProgressStore.ts
 */

import { getToday } from './dates.fixture'

export interface ProgressStateFixture {
  state: {
    currentStreak: number
    longestStreak: number
    totalWordsLearned: number
    totalExercisesCompleted: number
    dailyProgress: Array<{
      date: string
      wordsLearned: number
      wordsReviewed: number
      exercisesCompleted: number
      correctAnswers: number
      timeSpent: number
    }>
    achievements: string[]
    lastActiveDate: string
    dailyGoal: number
    todayWordsLearned: number
    lastWordIndex: Record<string, number>
    consecutiveCorrectAnswers: number
    lastUnlockedAchievement: string | null
    gamesPlayed: number
    perfectGames: number
  }
  version: number
}

/**
 * Empty/fresh user progress state
 */
export const emptyProgressState: ProgressStateFixture = {
  state: {
    currentStreak: 0,
    longestStreak: 0,
    totalWordsLearned: 0,
    totalExercisesCompleted: 0,
    dailyProgress: [],
    achievements: [],
    lastActiveDate: getToday(),
    dailyGoal: 10,
    todayWordsLearned: 0,
    lastWordIndex: {},
    consecutiveCorrectAnswers: 0,
    lastUnlockedAchievement: null,
    gamesPlayed: 0,
    perfectGames: 0,
  },
  version: 0,
}

/**
 * Creates a progress state with an active streak
 */
export const activeStreakProgressState = (
  streakDays: number,
  lastActiveDate: string
): ProgressStateFixture => ({
  state: {
    ...emptyProgressState.state,
    currentStreak: streakDays,
    longestStreak: Math.max(streakDays, 7),
    lastActiveDate,
    totalWordsLearned: streakDays * 5,
    todayWordsLearned: 3,
  },
  version: 0,
})

/**
 * Creates a progress state with specific achievements unlocked
 */
export const withAchievementsProgressState = (
  achievementIds: string[]
): ProgressStateFixture => ({
  state: {
    ...emptyProgressState.state,
    achievements: achievementIds,
    totalWordsLearned: 100,
    currentStreak: 7,
    lastActiveDate: getToday(),
  },
  version: 0,
})

/**
 * Creates a progress state with custom values
 */
export const customProgressState = (
  overrides: Partial<ProgressStateFixture['state']>
): ProgressStateFixture => ({
  state: {
    ...emptyProgressState.state,
    ...overrides,
  },
  version: 0,
})

/**
 * Creates a progress state with daily goal completed
 */
export const dailyGoalCompletedState = (
  goal: number = 10
): ProgressStateFixture => ({
  state: {
    ...emptyProgressState.state,
    dailyGoal: goal,
    todayWordsLearned: goal,
    totalWordsLearned: goal,
    currentStreak: 1,
    lastActiveDate: getToday(),
  },
  version: 0,
})

/**
 * Creates a progress state with games played
 */
export const withGamesProgressState = (
  gamesPlayed: number,
  perfectGames: number = 0
): ProgressStateFixture => ({
  state: {
    ...emptyProgressState.state,
    gamesPlayed,
    perfectGames,
    achievements: gamesPlayed >= 1 ? ['games-1'] : [],
    lastActiveDate: getToday(),
  },
  version: 0,
})

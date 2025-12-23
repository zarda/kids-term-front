import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { DailyProgress, UserProgress, Achievement } from '../types/progress.types'
import { format, isToday, parseISO, differenceInDays } from 'date-fns'
import { getAchievementsByType } from '../data/achievements'

interface ProgressState extends UserProgress {
  dailyGoal: number
  todayWordsLearned: number

  // Last word index per language pack (packId -> wordIndex)
  lastWordIndex: Record<string, number>

  // Accuracy tracking
  consecutiveCorrectAnswers: number

  // Achievement notification
  lastUnlockedAchievement: string | null

  // Actions
  incrementWordsLearned: (count?: number) => void
  incrementExercisesCompleted: () => void
  recordCorrectAnswer: () => void
  recordIncorrectAnswer: () => void
  addTimeSpent: (minutes: number) => void
  updateStreak: () => void
  unlockAchievement: (achievementId: string) => void
  setDailyGoal: (goal: number) => void
  getTodayProgress: () => DailyProgress | undefined
  resetDailyProgress: () => void
  setLastWordIndex: (packId: string, index: number) => void
  getLastWordIndex: (packId: string) => number
  clearLastUnlockedAchievement: () => void
}

const getToday = () => format(new Date(), 'yyyy-MM-dd')

const createEmptyDailyProgress = (): DailyProgress => ({
  date: getToday(),
  wordsLearned: 0,
  wordsReviewed: 0,
  exercisesCompleted: 0,
  correctAnswers: 0,
  timeSpent: 0,
})

// Helper to get or create today's progress and return its index
const getOrCreateTodayProgress = (dailyProgress: DailyProgress[]): number => {
  const today = getToday()
  let idx = dailyProgress.findIndex((d) => d.date === today)
  if (idx === -1) {
    dailyProgress.push(createEmptyDailyProgress())
    idx = dailyProgress.length - 1
  }
  return idx
}

// Helper to check and unlock achievements for a given type
const checkAchievements = (
  state: {
    achievements: string[]
    lastUnlockedAchievement: string | null
  },
  type: Achievement['type'],
  currentValue: number
) => {
  const typeAchievements = getAchievementsByType(type)
  for (const achievement of typeAchievements) {
    if (
      !state.achievements.includes(achievement.id) &&
      currentValue >= achievement.requirement
    ) {
      state.achievements.push(achievement.id)
      state.lastUnlockedAchievement = achievement.id
    }
  }
}

export const useProgressStore = create<ProgressState>()(
  persist(
    immer((set, get) => ({
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

      incrementWordsLearned: (count = 1) =>
        set((state) => {
          state.totalWordsLearned += count
          state.todayWordsLearned += count

          const idx = getOrCreateTodayProgress(state.dailyProgress)
          state.dailyProgress[idx].wordsLearned += count
          state.lastActiveDate = getToday()

          // Check words achievements
          checkAchievements(state, 'words', state.totalWordsLearned)
        }),

      incrementExercisesCompleted: () =>
        set((state) => {
          state.totalExercisesCompleted += 1

          const idx = getOrCreateTodayProgress(state.dailyProgress)
          state.dailyProgress[idx].exercisesCompleted += 1

          // Check exercises achievements
          checkAchievements(state, 'exercises', state.totalExercisesCompleted)
        }),

      recordCorrectAnswer: () =>
        set((state) => {
          const idx = getOrCreateTodayProgress(state.dailyProgress)
          state.dailyProgress[idx].correctAnswers += 1

          // Track consecutive correct answers
          state.consecutiveCorrectAnswers += 1

          // Check accuracy achievements
          checkAchievements(state, 'accuracy', state.consecutiveCorrectAnswers)
        }),

      recordIncorrectAnswer: () =>
        set((state) => {
          // Reset consecutive correct answers streak
          state.consecutiveCorrectAnswers = 0
        }),

      addTimeSpent: (minutes) =>
        set((state) => {
          const idx = getOrCreateTodayProgress(state.dailyProgress)
          state.dailyProgress[idx].timeSpent += minutes

          // Calculate total time from all daily progress
          const totalTime = state.dailyProgress.reduce(
            (sum, day) => sum + day.timeSpent,
            0
          )

          // Check time achievements
          checkAchievements(state, 'time', totalTime)
        }),

      updateStreak: () =>
        set((state) => {
          const today = getToday()
          const lastActive = state.lastActiveDate

          if (lastActive === today) {
            return // Already updated today
          }

          const daysDiff = differenceInDays(new Date(), parseISO(lastActive))

          if (daysDiff === 1) {
            state.currentStreak += 1
          } else if (daysDiff > 1) {
            state.currentStreak = 1
          }

          if (state.currentStreak > state.longestStreak) {
            state.longestStreak = state.currentStreak
          }

          state.lastActiveDate = today

          // Check streak achievements
          checkAchievements(state, 'streak', state.currentStreak)
        }),

      unlockAchievement: (achievementId) =>
        set((state) => {
          if (!state.achievements.includes(achievementId)) {
            state.achievements.push(achievementId)
          }
        }),

      setDailyGoal: (goal) =>
        set((state) => {
          state.dailyGoal = goal
        }),

      getTodayProgress: () => {
        const today = getToday()
        return get().dailyProgress.find((d) => d.date === today)
      },

      resetDailyProgress: () =>
        set((state) => {
          if (!isToday(parseISO(state.lastActiveDate))) {
            state.todayWordsLearned = 0
          }
        }),

      setLastWordIndex: (packId, index) =>
        set((state) => {
          state.lastWordIndex[packId] = index
        }),

      getLastWordIndex: (packId) => {
        return get().lastWordIndex[packId] ?? 0
      },

      clearLastUnlockedAchievement: () =>
        set((state) => {
          state.lastUnlockedAchievement = null
        }),
    })),
    {
      name: 'kidsterm-progress-v1',
    }
  )
)

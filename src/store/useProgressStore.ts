import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { DailyProgress, UserProgress } from '../types/progress.types'
import { format, isToday, parseISO, differenceInDays } from 'date-fns'

interface ProgressState extends UserProgress {
  dailyGoal: number
  todayWordsLearned: number

  // Actions
  incrementWordsLearned: (count?: number) => void
  incrementExercisesCompleted: () => void
  recordCorrectAnswer: () => void
  addTimeSpent: (minutes: number) => void
  updateStreak: () => void
  unlockAchievement: (achievementId: string) => void
  setDailyGoal: (goal: number) => void
  getTodayProgress: () => DailyProgress | undefined
  resetDailyProgress: () => void
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

      incrementWordsLearned: (count = 1) =>
        set((state) => {
          state.totalWordsLearned += count
          state.todayWordsLearned += count

          const idx = getOrCreateTodayProgress(state.dailyProgress)
          state.dailyProgress[idx].wordsLearned += count
          state.lastActiveDate = getToday()
        }),

      incrementExercisesCompleted: () =>
        set((state) => {
          state.totalExercisesCompleted += 1

          const idx = getOrCreateTodayProgress(state.dailyProgress)
          state.dailyProgress[idx].exercisesCompleted += 1
        }),

      recordCorrectAnswer: () =>
        set((state) => {
          const idx = getOrCreateTodayProgress(state.dailyProgress)
          state.dailyProgress[idx].correctAnswers += 1
        }),

      addTimeSpent: (minutes) =>
        set((state) => {
          const idx = getOrCreateTodayProgress(state.dailyProgress)
          state.dailyProgress[idx].timeSpent += minutes
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
    })),
    {
      name: 'kitsterm-progress-v1',
    }
  )
)

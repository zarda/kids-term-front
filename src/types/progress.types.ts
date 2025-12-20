export interface DailyProgress {
  date: string
  wordsLearned: number
  wordsReviewed: number
  exercisesCompleted: number
  correctAnswers: number
  timeSpent: number // minutes
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  requirement: number
  type: 'streak' | 'words' | 'exercises' | 'accuracy' | 'time'
  unlockedAt?: string
}

export interface UserProgress {
  currentStreak: number
  longestStreak: number
  totalWordsLearned: number
  totalExercisesCompleted: number
  dailyProgress: DailyProgress[]
  achievements: string[] // Achievement IDs
  lastActiveDate: string
}

export interface StreakInfo {
  current: number
  longest: number
  lastActive: string
  isActiveToday: boolean
}

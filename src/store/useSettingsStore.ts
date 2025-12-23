import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type DifficultyLevel = 'all' | 'beginner' | 'intermediate' | 'advanced'

interface SettingsState {
  // Language settings
  sourceLang: string
  targetLang: string

  // Audio settings
  speechRate: number
  speechVolume: number
  autoPlayAudio: boolean

  // Practice settings
  exerciseTimeLimit: number // seconds
  dailyGoal: number
  selectedDifficulty: DifficultyLevel

  // Notification settings
  notificationsEnabled: boolean
  reminderTime: string // HH:mm format

  // Actions
  setSourceLang: (lang: string) => void
  setTargetLang: (lang: string) => void
  setSpeechRate: (rate: number) => void
  setSpeechVolume: (volume: number) => void
  setAutoPlayAudio: (enabled: boolean) => void
  setExerciseTimeLimit: (seconds: number) => void
  setDailyGoal: (goal: number) => void
  setSelectedDifficulty: (difficulty: DifficultyLevel) => void
  setNotificationsEnabled: (enabled: boolean) => void
  setReminderTime: (time: string) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      sourceLang: 'tc',
      targetLang: 'en',
      speechRate: 1.0,
      speechVolume: 1.0,
      autoPlayAudio: true,
      exerciseTimeLimit: 30,
      dailyGoal: 10,
      selectedDifficulty: 'all',
      notificationsEnabled: true,
      reminderTime: '09:00',

      setSourceLang: (lang) => set({ sourceLang: lang }),
      setTargetLang: (lang) => set({ targetLang: lang }),
      setSpeechRate: (rate) => set({ speechRate: rate }),
      setSpeechVolume: (volume) => set({ speechVolume: volume }),
      setAutoPlayAudio: (enabled) => set({ autoPlayAudio: enabled }),
      setExerciseTimeLimit: (seconds) => set({ exerciseTimeLimit: seconds }),
      setDailyGoal: (goal) => set({ dailyGoal: goal }),
      setSelectedDifficulty: (difficulty) => set({ selectedDifficulty: difficulty }),
      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
      setReminderTime: (time) => set({ reminderTime: time }),
    }),
    {
      name: 'kidsterm-settings-v1',
    }
  )
)

export interface Translations {
  // Common
  common: {
    loading: string
    error: string
    save: string
    cancel: string
    delete: string
    download: string
    next: string
    back: string
    done: string
    active: string
    learning: string
    refresh: string
  }

  // Navigation
  nav: {
    home: string
    learn: string
    practice: string
    progress: string
    settings: string
  }

  // Home Page
  home: {
    welcome: string
    todayProgress: string
    wordsLearned: string
    streak: string
    days: string
    continueLeaning: string
    startPractice: string
    dailyGoal: string
    wordsToday: string
    achievements: string
    recentActivity: string
    noActivity: string
  }

  // Learn Page
  learn: {
    title: string
    swipeHint: string
    tapToFlip: string
    pronunciation: string
    example: string
    markAsLearned: string
    cardOf: string
    noWords: string
    downloadPack: string
    resumeFromLast: string
    jumpToCard: string
    goToCard: string
    pronunciationWarning: string
  }

  // Practice Page
  practice: {
    title: string
    subtitle: string
    practicing: string
    multipleChoice: string
    multipleChoiceDesc: string
    listening: string
    listeningDesc: string
    lastSession: string
    accuracy: string
    endSession: string
    playAudio: string
    listenAndSelect: string
    whatDoesMean: string
    nextQuestion: string
    notEnoughWords: string
    notEnoughWordsDesc: string
    loadingExercise: string
  }

  // Progress Page
  progress: {
    title: string
    wordsLearned: string
    exercisesCompleted: string
    correctAnswers: string
    currentStreak: string
    totalTimeSpent: string
    minutes: string
    weeklyProgress: string
    achievements: string
    noAchievements: string
    resetProgress: string
    resetConfirm: string
  }

  // Settings Page
  settings: {
    title: string
    languagePacks: string
    languagePacksHint: string
    audio: string
    autoPlayPronunciation: string
    speechRate: string
    volume: string
    learning: string
    dailyGoal: string
    words: string
    exerciseTimeLimit: string
    difficultyLevel: string
    difficultyHint: string
    difficulty: {
      all: string
      beginner: string
      intermediate: string
      advanced: string
    }
    appearance: string
    darkMode: string
    notifications: string
    dailyReminders: string
    reminderTime: string
    enableNotifications: string
    testNotification: string
    permissionGranted: string
    permissionDenied: string
    permissionDefault: string
    notificationsNotSupported: string
    about: string
    version: string
    appDescription: string
    dangerZone: string
    clearAllData: string
    clearAllDataDesc: string
    clearAllDataConfirm: string
  }

  // Notifications
  notifications: {
    reminderTitle: string
    reminderBody: string
  }
}

export type TranslationKey = keyof Translations
export type SupportedLocale = 'en' | 'tc'

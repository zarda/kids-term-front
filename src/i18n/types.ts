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
    packProgress: string
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
    swipeHintSkip: string
    swipeHintLearned: string
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
    longestStreak: string
    totalTimeSpent: string
    minutes: string
    weeklyProgress: string
    achievements: string
    achievementUnlocked: string
    noAchievements: string
    resetProgress: string
    resetConfirm: string
  }

  // Achievements
  achievements: {
    // Streak
    'streak-1': { title: string; description: string }
    'streak-3': { title: string; description: string }
    'streak-5': { title: string; description: string }
    'streak-7': { title: string; description: string }
    'streak-14': { title: string; description: string }
    'streak-21': { title: string; description: string }
    'streak-30': { title: string; description: string }
    'streak-60': { title: string; description: string }
    'streak-100': { title: string; description: string }
    'streak-180': { title: string; description: string }
    'streak-365': { title: string; description: string }
    // Words
    'words-1': { title: string; description: string }
    'words-5': { title: string; description: string }
    'words-10': { title: string; description: string }
    'words-25': { title: string; description: string }
    'words-50': { title: string; description: string }
    'words-75': { title: string; description: string }
    'words-100': { title: string; description: string }
    'words-150': { title: string; description: string }
    'words-250': { title: string; description: string }
    'words-350': { title: string; description: string }
    'words-500': { title: string; description: string }
    'words-750': { title: string; description: string }
    'words-1000': { title: string; description: string }
    // Exercises
    'exercises-1': { title: string; description: string }
    'exercises-5': { title: string; description: string }
    'exercises-10': { title: string; description: string }
    'exercises-25': { title: string; description: string }
    'exercises-50': { title: string; description: string }
    'exercises-75': { title: string; description: string }
    'exercises-100': { title: string; description: string }
    'exercises-150': { title: string; description: string }
    'exercises-250': { title: string; description: string }
    'exercises-350': { title: string; description: string }
    'exercises-500': { title: string; description: string }
    'exercises-750': { title: string; description: string }
    'exercises-1000': { title: string; description: string }
    // Accuracy
    'accuracy-perfect-3': { title: string; description: string }
    'accuracy-perfect-5': { title: string; description: string }
    'accuracy-perfect-10': { title: string; description: string }
    'accuracy-perfect-15': { title: string; description: string }
    'accuracy-perfect-25': { title: string; description: string }
    'accuracy-perfect-50': { title: string; description: string }
    'accuracy-perfect-100': { title: string; description: string }
    // Time
    'time-5': { title: string; description: string }
    'time-15': { title: string; description: string }
    'time-30': { title: string; description: string }
    'time-60': { title: string; description: string }
    'time-120': { title: string; description: string }
    'time-300': { title: string; description: string }
    'time-480': { title: string; description: string }
    'time-600': { title: string; description: string }
    'time-1200': { title: string; description: string }
    'time-3000': { title: string; description: string }
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
export type SupportedLocale = 'en' | 'tc' | 'ja'

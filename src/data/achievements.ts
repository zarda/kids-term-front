import type { Achievement } from '../types/progress.types'

export const achievements: Achievement[] = [
  // Streak achievements
  {
    id: 'streak-3',
    title: 'Getting Started',
    description: 'Maintain a 3-day learning streak',
    icon: '🔥',
    requirement: 3,
    type: 'streak',
  },
  {
    id: 'streak-7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: '⚡',
    requirement: 7,
    type: 'streak',
  },
  {
    id: 'streak-30',
    title: 'Monthly Master',
    description: 'Maintain a 30-day learning streak',
    icon: '🏆',
    requirement: 30,
    type: 'streak',
  },
  {
    id: 'streak-100',
    title: 'Century Champion',
    description: 'Maintain a 100-day learning streak',
    icon: '👑',
    requirement: 100,
    type: 'streak',
  },

  // Words learned achievements
  {
    id: 'words-10',
    title: 'First Steps',
    description: 'Learn 10 words',
    icon: '📚',
    requirement: 10,
    type: 'words',
  },
  {
    id: 'words-50',
    title: 'Vocabulary Builder',
    description: 'Learn 50 words',
    icon: '📖',
    requirement: 50,
    type: 'words',
  },
  {
    id: 'words-100',
    title: 'Word Collector',
    description: 'Learn 100 words',
    icon: '📕',
    requirement: 100,
    type: 'words',
  },
  {
    id: 'words-500',
    title: 'Lexicon Legend',
    description: 'Learn 500 words',
    icon: '🎓',
    requirement: 500,
    type: 'words',
  },

  // Exercise achievements
  {
    id: 'exercises-25',
    title: 'Practice Makes Perfect',
    description: 'Complete 25 exercises',
    icon: '💪',
    requirement: 25,
    type: 'exercises',
  },
  {
    id: 'exercises-100',
    title: 'Exercise Expert',
    description: 'Complete 100 exercises',
    icon: '🎯',
    requirement: 100,
    type: 'exercises',
  },
  {
    id: 'exercises-500',
    title: 'Training Titan',
    description: 'Complete 500 exercises',
    icon: '🏅',
    requirement: 500,
    type: 'exercises',
  },

  // Accuracy achievements
  {
    id: 'accuracy-perfect-10',
    title: 'Sharp Mind',
    description: 'Get 10 correct answers in a row',
    icon: '🎯',
    requirement: 10,
    type: 'accuracy',
  },
  {
    id: 'accuracy-perfect-25',
    title: 'Precision Pro',
    description: 'Get 25 correct answers in a row',
    icon: '🔮',
    requirement: 25,
    type: 'accuracy',
  },

  // Time achievements
  {
    id: 'time-60',
    title: 'Dedicated Learner',
    description: 'Spend 60 minutes learning',
    icon: '⏰',
    requirement: 60,
    type: 'time',
  },
  {
    id: 'time-300',
    title: 'Time Investor',
    description: 'Spend 5 hours learning',
    icon: '⌛',
    requirement: 300,
    type: 'time',
  },
  {
    id: 'time-600',
    title: 'Marathon Learner',
    description: 'Spend 10 hours learning',
    icon: '🕐',
    requirement: 600,
    type: 'time',
  },
]

export const getAchievementById = (id: string): Achievement | undefined => {
  return achievements.find((a) => a.id === id)
}

export const getAchievementsByType = (type: Achievement['type']): Achievement[] => {
  return achievements.filter((a) => a.type === type)
}

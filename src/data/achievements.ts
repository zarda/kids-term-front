import type { Achievement } from '../types/progress.types'

export const achievements: Achievement[] = [
  // Streak achievements
  { id: 'streak-1', icon: '🌟', requirement: 1, type: 'streak' },
  { id: 'streak-3', icon: '🔥', requirement: 3, type: 'streak' },
  { id: 'streak-5', icon: '✋', requirement: 5, type: 'streak' },
  { id: 'streak-7', icon: '⚡', requirement: 7, type: 'streak' },
  { id: 'streak-14', icon: '💫', requirement: 14, type: 'streak' },
  { id: 'streak-21', icon: '🌈', requirement: 21, type: 'streak' },
  { id: 'streak-30', icon: '🏆', requirement: 30, type: 'streak' },
  { id: 'streak-60', icon: '🎖️', requirement: 60, type: 'streak' },
  { id: 'streak-100', icon: '👑', requirement: 100, type: 'streak' },
  { id: 'streak-180', icon: '🦸', requirement: 180, type: 'streak' },
  { id: 'streak-365', icon: '🏅', requirement: 365, type: 'streak' },

  // Words learned achievements
  { id: 'words-1', icon: '🌱', requirement: 1, type: 'words' },
  { id: 'words-5', icon: '🌿', requirement: 5, type: 'words' },
  { id: 'words-10', icon: '📚', requirement: 10, type: 'words' },
  { id: 'words-25', icon: '🔍', requirement: 25, type: 'words' },
  { id: 'words-50', icon: '📖', requirement: 50, type: 'words' },
  { id: 'words-75', icon: '🌳', requirement: 75, type: 'words' },
  { id: 'words-100', icon: '📕', requirement: 100, type: 'words' },
  { id: 'words-150', icon: '📗', requirement: 150, type: 'words' },
  { id: 'words-250', icon: '📘', requirement: 250, type: 'words' },
  { id: 'words-350', icon: '🧙', requirement: 350, type: 'words' },
  { id: 'words-500', icon: '🎓', requirement: 500, type: 'words' },
  { id: 'words-750', icon: '🏛️', requirement: 750, type: 'words' },
  { id: 'words-1000', icon: '🎯', requirement: 1000, type: 'words' },

  // Exercise achievements
  { id: 'exercises-1', icon: '🎈', requirement: 1, type: 'exercises' },
  { id: 'exercises-5', icon: '🎉', requirement: 5, type: 'exercises' },
  { id: 'exercises-10', icon: '🎊', requirement: 10, type: 'exercises' },
  { id: 'exercises-25', icon: '💪', requirement: 25, type: 'exercises' },
  { id: 'exercises-50', icon: '🏋️', requirement: 50, type: 'exercises' },
  { id: 'exercises-75', icon: '⭐', requirement: 75, type: 'exercises' },
  { id: 'exercises-100', icon: '🎯', requirement: 100, type: 'exercises' },
  { id: 'exercises-150', icon: '🌟', requirement: 150, type: 'exercises' },
  { id: 'exercises-250', icon: '🥇', requirement: 250, type: 'exercises' },
  { id: 'exercises-350', icon: '⚔️', requirement: 350, type: 'exercises' },
  { id: 'exercises-500', icon: '🏅', requirement: 500, type: 'exercises' },
  { id: 'exercises-750', icon: '🦁', requirement: 750, type: 'exercises' },
  { id: 'exercises-1000', icon: '🏆', requirement: 1000, type: 'exercises' },

  // Accuracy achievements
  { id: 'accuracy-perfect-3', icon: '👍', requirement: 3, type: 'accuracy' },
  { id: 'accuracy-perfect-5', icon: '✨', requirement: 5, type: 'accuracy' },
  { id: 'accuracy-perfect-10', icon: '🎯', requirement: 10, type: 'accuracy' },
  { id: 'accuracy-perfect-15', icon: '🔥', requirement: 15, type: 'accuracy' },
  { id: 'accuracy-perfect-25', icon: '🔮', requirement: 25, type: 'accuracy' },
  { id: 'accuracy-perfect-50', icon: '💎', requirement: 50, type: 'accuracy' },
  { id: 'accuracy-perfect-100', icon: '🌠', requirement: 100, type: 'accuracy' },

  // Time achievements
  { id: 'time-5', icon: '⏱️', requirement: 5, type: 'time' },
  { id: 'time-15', icon: '📝', requirement: 15, type: 'time' },
  { id: 'time-30', icon: '🎧', requirement: 30, type: 'time' },
  { id: 'time-60', icon: '⏰', requirement: 60, type: 'time' },
  { id: 'time-120', icon: '🎪', requirement: 120, type: 'time' },
  { id: 'time-300', icon: '⌛', requirement: 300, type: 'time' },
  { id: 'time-480', icon: '🌅', requirement: 480, type: 'time' },
  { id: 'time-600', icon: '🕐', requirement: 600, type: 'time' },
  { id: 'time-1200', icon: '🕰️', requirement: 1200, type: 'time' },
  { id: 'time-3000', icon: '⚡', requirement: 3000, type: 'time' },
]

export const getAchievementById = (id: string): Achievement | undefined => {
  return achievements.find((a) => a.id === id)
}

export const getAchievementsByType = (type: Achievement['type']): Achievement[] => {
  return achievements.filter((a) => a.type === type)
}

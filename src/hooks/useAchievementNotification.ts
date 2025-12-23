import { useEffect, useRef } from 'react'
import { useToast } from '@chakra-ui/react'
import { useProgressStore } from '../store/useProgressStore'
import { getAchievementById } from '../data/achievements'
import { useTranslation } from './useTranslation'

export function useAchievementNotification() {
  const { t } = useTranslation()
  const toast = useToast()
  const lastUnlockedAchievement = useProgressStore((s) => s.lastUnlockedAchievement)
  const clearLastUnlockedAchievement = useProgressStore(
    (s) => s.clearLastUnlockedAchievement
  )
  const previousAchievement = useRef<string | null>(null)

  useEffect(() => {
    if (
      lastUnlockedAchievement &&
      lastUnlockedAchievement !== previousAchievement.current
    ) {
      const achievement = getAchievementById(lastUnlockedAchievement)
      const achievementTranslation = t.achievements[lastUnlockedAchievement as keyof typeof t.achievements]

      if (achievement && achievementTranslation) {
        toast({
          title: `${achievement.icon} ${t.progress.achievementUnlocked}`,
          description: achievementTranslation.title,
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: 'top',
        })
      }

      previousAchievement.current = lastUnlockedAchievement
      clearLastUnlockedAchievement()
    }
  }, [lastUnlockedAchievement, clearLastUnlockedAchievement, toast, t])
}

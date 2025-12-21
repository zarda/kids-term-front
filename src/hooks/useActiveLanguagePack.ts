import { useMemo } from 'react'
import { useLanguagePackStore } from '../store/useLanguagePackStore'
import { useSettingsStore } from '../store/useSettingsStore'
import type { LanguagePack, LanguageWord } from '../types/language.types'

interface UseActiveLanguagePackReturn {
  words: LanguageWord[]
  activePack: LanguagePack | undefined
  activePackId: string
  isLoading: boolean
}

export function useActiveLanguagePack(): UseActiveLanguagePackReturn {
  const getActivePackWords = useLanguagePackStore((s) => s.getActivePackWords)
  const getPackById = useLanguagePackStore((s) => s.getPackById)
  const activePackId = useLanguagePackStore((s) => s.activePackId)
  const downloadingPackId = useLanguagePackStore((s) => s.downloadingPackId)
  const selectedDifficulty = useSettingsStore((s) => s.selectedDifficulty)

  // Memoize words based on activePackId and selectedDifficulty changes
  const words = useMemo(() => {
    const allWords = getActivePackWords()
    if (selectedDifficulty === 'all') {
      return allWords
    }
    return allWords.filter((word) => word.difficulty === selectedDifficulty)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePackId, selectedDifficulty])

  const activePack = getPackById(activePackId)
  const isLoading = downloadingPackId === activePackId

  return {
    words,
    activePack,
    activePackId,
    isLoading,
  }
}

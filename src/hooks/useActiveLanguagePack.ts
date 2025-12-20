import { useMemo } from 'react'
import { useLanguagePackStore } from '../store/useLanguagePackStore'
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

  // Memoize words based on activePackId changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const words = useMemo(() => getActivePackWords(), [activePackId])

  const activePack = getPackById(activePackId)
  const isLoading = downloadingPackId === activePackId

  return {
    words,
    activePack,
    activePackId,
    isLoading,
  }
}

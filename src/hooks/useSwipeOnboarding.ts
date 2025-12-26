import { useCallback, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'

interface SwipeHintState {
  date: string
  swipeCount: number
}

const SWIPE_THRESHOLD = 3

function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0]
}

export function useSwipeOnboarding() {
  const [state, setState] = useLocalStorage<SwipeHintState>('kidsterm-swipe-hints', {
    date: '',
    swipeCount: 0,
  })

  const today = getTodayDateString()
  const isNewDay = state.date !== today

  // Reset count if it's a new day
  const effectiveSwipeCount = isNewDay ? 0 : state.swipeCount

  const showHints = effectiveSwipeCount < SWIPE_THRESHOLD

  const recordSwipe = useCallback(() => {
    const currentDate = getTodayDateString()
    setState((prev) => {
      // If it's a new day, start fresh
      if (prev.date !== currentDate) {
        return { date: currentDate, swipeCount: 1 }
      }
      // Otherwise increment
      return { date: currentDate, swipeCount: prev.swipeCount + 1 }
    })
  }, [setState])

  return useMemo(
    () => ({
      showHints,
      swipeCount: effectiveSwipeCount,
      recordSwipe,
    }),
    [showHints, effectiveSwipeCount, recordSwipe]
  )
}

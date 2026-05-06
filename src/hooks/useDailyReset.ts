import { useEffect } from 'react'
import { useProgressStore } from '../store/useProgressStore'

const CHECK_INTERVAL_MS = 60 * 1000

export function useDailyReset(): void {
  useEffect(() => {
    const reset = () => useProgressStore.getState().resetDailyProgress()

    reset()

    const intervalId = setInterval(reset, CHECK_INTERVAL_MS)

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        reset()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(intervalId)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])
}

import { useState, useEffect, useCallback, useRef } from 'react'

interface UseTimerReturn {
  timeLeft: number
  isRunning: boolean
  isExpired: boolean
  start: () => void
  pause: () => void
  reset: (newDuration?: number) => void
  formatTime: (seconds: number) => string
}

export function useTimer(initialSeconds: number): UseTimerReturn {
  const [timeLeft, setTimeLeft] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)

  const isExpired = timeLeft <= 0

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    if (isExpired) return
    setIsRunning(true)
  }, [isExpired])

  const pause = useCallback(() => {
    setIsRunning(false)
  }, [])

  const reset = useCallback(
    (newDuration?: number) => {
      clearTimer()
      setTimeLeft(newDuration ?? initialSeconds)
      setIsRunning(false)
    },
    [clearTimer, initialSeconds]
  )

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }, [])

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearTimer()
            setIsRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearTimer()
    }

    return clearTimer
  }, [isRunning, timeLeft, clearTimer])

  return { timeLeft, isRunning, isExpired, start, pause, reset, formatTime }
}

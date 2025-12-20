import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTimer } from './useTimer'

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should initialize with the given duration', () => {
    const { result } = renderHook(() => useTimer(30))

    expect(result.current.timeLeft).toBe(30)
    expect(result.current.isRunning).toBe(false)
    expect(result.current.isExpired).toBe(false)
  })

  it('should start counting down when start is called', () => {
    const { result } = renderHook(() => useTimer(30))

    act(() => {
      result.current.start()
    })

    expect(result.current.isRunning).toBe(true)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.timeLeft).toBe(29)
  })

  it('should pause when pause is called', () => {
    const { result } = renderHook(() => useTimer(30))

    act(() => {
      result.current.start()
    })

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    act(() => {
      result.current.pause()
    })

    expect(result.current.isRunning).toBe(false)
    expect(result.current.timeLeft).toBe(28)

    // Time should not advance after pause
    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(result.current.timeLeft).toBe(28)
  })

  it('should reset to initial duration', () => {
    const { result } = renderHook(() => useTimer(30))

    act(() => {
      result.current.start()
    })

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    act(() => {
      result.current.reset()
    })

    expect(result.current.timeLeft).toBe(30)
    expect(result.current.isRunning).toBe(false)
  })

  it('should reset to new duration when provided', () => {
    const { result } = renderHook(() => useTimer(30))

    act(() => {
      result.current.reset(60)
    })

    expect(result.current.timeLeft).toBe(60)
  })

  it('should expire when time runs out', () => {
    const { result } = renderHook(() => useTimer(3))

    act(() => {
      result.current.start()
    })

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(result.current.timeLeft).toBe(0)
    expect(result.current.isExpired).toBe(true)
    expect(result.current.isRunning).toBe(false)
  })

  it('should not start when already expired', () => {
    const { result } = renderHook(() => useTimer(0))

    expect(result.current.isExpired).toBe(true)

    act(() => {
      result.current.start()
    })

    expect(result.current.isRunning).toBe(false)
  })

  describe('formatTime', () => {
    it('should format seconds correctly', () => {
      const { result } = renderHook(() => useTimer(30))

      expect(result.current.formatTime(0)).toBe('0:00')
      expect(result.current.formatTime(5)).toBe('0:05')
      expect(result.current.formatTime(30)).toBe('0:30')
      expect(result.current.formatTime(60)).toBe('1:00')
      expect(result.current.formatTime(90)).toBe('1:30')
      expect(result.current.formatTime(125)).toBe('2:05')
    })
  })
})

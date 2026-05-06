import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDailyReset } from './useDailyReset'
import { useProgressStore } from '../store/useProgressStore'

describe('useDailyReset', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    useProgressStore.setState({
      todayWordsLearned: 5,
      lastActiveDate: '2020-01-01',
    })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('should reset todayWordsLearned on mount when lastActiveDate is in the past', () => {
    expect(useProgressStore.getState().todayWordsLearned).toBe(5)

    renderHook(() => useDailyReset())

    expect(useProgressStore.getState().todayWordsLearned).toBe(0)
  })

  it('should re-check on interval tick', () => {
    renderHook(() => useDailyReset())

    // After initial reset, simulate a stale day arriving while app is open.
    useProgressStore.setState({
      todayWordsLearned: 8,
      lastActiveDate: '2020-01-02',
    })

    act(() => {
      vi.advanceTimersByTime(60 * 1000)
    })

    expect(useProgressStore.getState().todayWordsLearned).toBe(0)
  })

  it('should reset when the document becomes visible again', () => {
    renderHook(() => useDailyReset())

    useProgressStore.setState({
      todayWordsLearned: 4,
      lastActiveDate: '2020-01-03',
    })

    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: () => 'visible',
    })
    document.dispatchEvent(new Event('visibilitychange'))

    expect(useProgressStore.getState().todayWordsLearned).toBe(0)
  })

  it('should clean up interval and listener on unmount', () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')
    const removeListenerSpy = vi.spyOn(document, 'removeEventListener')

    const { unmount } = renderHook(() => useDailyReset())
    unmount()

    expect(clearIntervalSpy).toHaveBeenCalled()
    expect(removeListenerSpy).toHaveBeenCalledWith(
      'visibilitychange',
      expect.any(Function)
    )
  })
})

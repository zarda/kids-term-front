import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useNotificationScheduler } from './useNotificationScheduler'
import { useSettingsStore } from '../store/useSettingsStore'
import * as useNotificationsModule from './useNotifications'
import * as useTranslationModule from './useTranslation'

vi.mock('./useNotifications')
vi.mock('./useTranslation')

describe('useNotificationScheduler', () => {
  const mockSendNotification = vi.fn()
  const mockSetLastNotificationDate = vi.fn()

  beforeEach(() => {
    vi.useFakeTimers()

    // Mock useNotifications
    vi.mocked(useNotificationsModule.useNotifications).mockReturnValue({
      isSupported: true,
      permission: 'granted',
      requestPermission: vi.fn(),
      sendNotification: mockSendNotification,
    })

    // Mock useTranslation
    vi.mocked(useTranslationModule.useTranslation).mockReturnValue({
      t: {
        notifications: {
          reminderTitle: 'Time to Learn!',
          reminderBody: 'Test body',
        },
      } as ReturnType<typeof useTranslationModule.useTranslation>['t'],
      locale: 'en',
    })

    // Reset settings store
    useSettingsStore.setState({
      notificationsEnabled: true,
      reminderTime: '09:00',
      lastNotificationDate: null,
      setLastNotificationDate: mockSetLastNotificationDate,
    })

    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('should not send notification when notifications are disabled', () => {
    useSettingsStore.setState({ notificationsEnabled: false })

    renderHook(() => useNotificationScheduler())

    expect(mockSendNotification).not.toHaveBeenCalled()
  })

  it('should not send notification when permission is not granted', () => {
    vi.mocked(useNotificationsModule.useNotifications).mockReturnValue({
      isSupported: true,
      permission: 'denied',
      requestPermission: vi.fn(),
      sendNotification: mockSendNotification,
    })

    renderHook(() => useNotificationScheduler())

    expect(mockSendNotification).not.toHaveBeenCalled()
  })

  it('should send notification when time matches and not sent today', () => {
    const now = new Date('2025-12-23T09:00:00')
    vi.setSystemTime(now)

    useSettingsStore.setState({
      notificationsEnabled: true,
      reminderTime: '09:00',
      lastNotificationDate: null,
      setLastNotificationDate: mockSetLastNotificationDate,
    })

    renderHook(() => useNotificationScheduler())

    expect(mockSendNotification).toHaveBeenCalledWith('Time to Learn!', {
      body: 'Test body',
      tag: 'daily-reminder',
    })
    expect(mockSetLastNotificationDate).toHaveBeenCalledWith('2025-12-23')
  })

  it('should not send notification when already sent today', () => {
    const now = new Date('2025-12-23T09:00:00')
    vi.setSystemTime(now)

    useSettingsStore.setState({
      notificationsEnabled: true,
      reminderTime: '09:00',
      lastNotificationDate: '2025-12-23',
      setLastNotificationDate: mockSetLastNotificationDate,
    })

    renderHook(() => useNotificationScheduler())

    expect(mockSendNotification).not.toHaveBeenCalled()
  })

  it('should not send notification when time does not match', () => {
    const now = new Date('2025-12-23T10:00:00')
    vi.setSystemTime(now)

    useSettingsStore.setState({
      notificationsEnabled: true,
      reminderTime: '09:00',
      lastNotificationDate: null,
      setLastNotificationDate: mockSetLastNotificationDate,
    })

    renderHook(() => useNotificationScheduler())

    expect(mockSendNotification).not.toHaveBeenCalled()
  })

  it('should clean up interval on unmount', () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')

    const { unmount } = renderHook(() => useNotificationScheduler())

    unmount()

    expect(clearIntervalSpy).toHaveBeenCalled()
  })
})

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useNotifications } from './useNotifications'

describe('useNotifications', () => {
  const originalNotification = global.Notification

  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    global.Notification = originalNotification
  })

  describe('when notifications are not supported', () => {
    beforeEach(() => {
      // @ts-expect-error - Removing Notification for testing
      delete global.Notification
    })

    it('should return isSupported as false', () => {
      const { result } = renderHook(() => useNotifications())

      expect(result.current.isSupported).toBe(false)
      expect(result.current.permission).toBe('denied')
    })

    it('should return denied when requesting permission', async () => {
      const { result } = renderHook(() => useNotifications())

      let permission: NotificationPermission = 'default'
      await act(async () => {
        permission = await result.current.requestPermission()
      })

      expect(permission).toBe('denied')
    })

    it('should return null when sending notification', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const { result } = renderHook(() => useNotifications())

      const notification = result.current.sendNotification('Test', { body: 'Test body' })

      expect(notification).toBeNull()
      expect(consoleSpy).toHaveBeenCalledWith('Notifications not supported in this browser')
      consoleSpy.mockRestore()
    })
  })

  describe('when notifications are supported', () => {
    let mockNotification: typeof Notification

    beforeEach(() => {
      mockNotification = vi.fn() as unknown as typeof Notification
      Object.defineProperty(mockNotification, 'permission', {
        value: 'default',
        writable: true,
        configurable: true,
      })
      mockNotification.requestPermission = vi.fn().mockResolvedValue('granted')
      global.Notification = mockNotification
    })

    it('should return isSupported as true', () => {
      const { result } = renderHook(() => useNotifications())

      expect(result.current.isSupported).toBe(true)
    })

    it('should return the current permission status', () => {
      Object.defineProperty(mockNotification, 'permission', {
        value: 'granted',
        writable: true,
        configurable: true,
      })

      const { result } = renderHook(() => useNotifications())

      expect(result.current.permission).toBe('granted')
    })

    it('should request permission and update state', async () => {
      const { result } = renderHook(() => useNotifications())

      await act(async () => {
        await result.current.requestPermission()
      })

      expect(mockNotification.requestPermission).toHaveBeenCalled()
      expect(result.current.permission).toBe('granted')
    })

    it('should send notification when permission is granted', () => {
      Object.defineProperty(mockNotification, 'permission', {
        value: 'granted',
        writable: true,
        configurable: true,
      })

      const { result } = renderHook(() => useNotifications())

      act(() => {
        result.current.sendNotification('Test Title', { body: 'Test body' })
      })

      expect(mockNotification).toHaveBeenCalledWith('Test Title', {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        body: 'Test body',
      })
    })

    it('should not send notification when permission is not granted', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      Object.defineProperty(mockNotification, 'permission', {
        value: 'denied',
        writable: true,
        configurable: true,
      })

      const { result } = renderHook(() => useNotifications())

      const notification = result.current.sendNotification('Test Title')

      expect(notification).toBeNull()
      expect(mockNotification).not.toHaveBeenCalled()
      expect(consoleSpy).toHaveBeenCalledWith('Notification permission not granted:', 'denied')
      consoleSpy.mockRestore()
    })
  })
})

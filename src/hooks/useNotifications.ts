import { useState, useCallback, useEffect } from 'react'

export interface UseNotificationsReturn {
  isSupported: boolean
  permission: NotificationPermission
  requestPermission: () => Promise<NotificationPermission>
  sendNotification: (title: string, options?: NotificationOptions) => Notification | null
}

export function useNotifications(): UseNotificationsReturn {
  const isSupported = typeof window !== 'undefined' && 'Notification' in window

  const [permission, setPermission] = useState<NotificationPermission>(
    isSupported ? Notification.permission : 'denied'
  )

  useEffect(() => {
    if (isSupported) {
      setPermission(Notification.permission)
    }
  }, [isSupported])

  const requestPermission = useCallback(async (): Promise<NotificationPermission> => {
    if (!isSupported) {
      return 'denied'
    }

    try {
      const result = await Notification.requestPermission()
      setPermission(result)
      return result
    } catch {
      return 'denied'
    }
  }, [isSupported])

  const sendNotification = useCallback(
    (title: string, options?: NotificationOptions): Notification | null => {
      if (!isSupported) {
        console.warn('Notifications not supported in this browser')
        return null
      }

      if (permission !== 'granted') {
        console.warn('Notification permission not granted:', permission)
        return null
      }

      try {
        const notification = new Notification(title, {
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          ...options,
        })

        return notification
      } catch (error) {
        console.error('Failed to create notification:', error)
        return null
      }
    },
    [isSupported, permission]
  )

  return {
    isSupported,
    permission,
    requestPermission,
    sendNotification,
  }
}

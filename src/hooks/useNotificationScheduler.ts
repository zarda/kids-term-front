import { useEffect, useRef } from 'react'
import { format } from 'date-fns'
import { useSettingsStore } from '../store/useSettingsStore'
import { useNotifications } from './useNotifications'
import { useTranslation } from './useTranslation'

const CHECK_INTERVAL_MS = 60 * 1000 // Check every minutes

export function useNotificationScheduler(): void {
  const { notificationsEnabled, reminderTime, lastNotificationDate, setLastNotificationDate } =
    useSettingsStore()
  const { permission, sendNotification } = useNotifications()
  const { t } = useTranslation()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!notificationsEnabled || permission !== 'granted') {
      return
    }

    const checkAndSendNotification = () => {
      const now = new Date()
      const currentTime = format(now, 'HH:mm')
      const today = format(now, 'yyyy-MM-dd')

      // Check if it's time and we haven't sent a notification today
      if (currentTime === reminderTime && lastNotificationDate !== today) {
        sendNotification(t.notifications.reminderTitle, {
          body: t.notifications.reminderBody,
          tag: 'daily-reminder',
        })
        setLastNotificationDate(today)
      }
    }

    // Check immediately on mount
    checkAndSendNotification()

    // Set up interval for periodic checking
    intervalRef.current = setInterval(checkAndSendNotification, CHECK_INTERVAL_MS)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [
    notificationsEnabled,
    permission,
    reminderTime,
    lastNotificationDate,
    setLastNotificationDate,
    sendNotification,
    t,
  ])
}

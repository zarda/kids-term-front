import { describe, it, expect, beforeEach } from 'vitest'
import { useSettingsStore } from './useSettingsStore'

describe('useSettingsStore', () => {
  beforeEach(() => {
    // Reset to default values
    useSettingsStore.setState({
      sourceLang: 'tc',
      targetLang: 'en',
      speechRate: 1.0,
      speechVolume: 1.0,
      autoPlayAudio: true,
      exerciseTimeLimit: 30,
      dailyGoal: 10,
      notificationsEnabled: true,
      reminderTime: '09:00',
      lastNotificationDate: null,
    })
  })

  describe('language settings', () => {
    it('should set source language', () => {
      const { setSourceLang } = useSettingsStore.getState()

      setSourceLang('es')

      expect(useSettingsStore.getState().sourceLang).toBe('es')
    })

    it('should set target language', () => {
      const { setTargetLang } = useSettingsStore.getState()

      setTargetLang('fr')

      expect(useSettingsStore.getState().targetLang).toBe('fr')
    })
  })

  describe('audio settings', () => {
    it('should set speech rate', () => {
      const { setSpeechRate } = useSettingsStore.getState()

      setSpeechRate(1.5)

      expect(useSettingsStore.getState().speechRate).toBe(1.5)
    })

    it('should set speech volume', () => {
      const { setSpeechVolume } = useSettingsStore.getState()

      setSpeechVolume(0.5)

      expect(useSettingsStore.getState().speechVolume).toBe(0.5)
    })

    it('should toggle auto play audio', () => {
      const { setAutoPlayAudio } = useSettingsStore.getState()

      setAutoPlayAudio(false)

      expect(useSettingsStore.getState().autoPlayAudio).toBe(false)
    })
  })

  describe('practice settings', () => {
    it('should set exercise time limit', () => {
      const { setExerciseTimeLimit } = useSettingsStore.getState()

      setExerciseTimeLimit(60)

      expect(useSettingsStore.getState().exerciseTimeLimit).toBe(60)
    })

    it('should set daily goal', () => {
      const { setDailyGoal } = useSettingsStore.getState()

      setDailyGoal(25)

      expect(useSettingsStore.getState().dailyGoal).toBe(25)
    })
  })

  describe('notification settings', () => {
    it('should toggle notifications', () => {
      const { setNotificationsEnabled } = useSettingsStore.getState()

      setNotificationsEnabled(false)

      expect(useSettingsStore.getState().notificationsEnabled).toBe(false)
    })

    it('should set reminder time', () => {
      const { setReminderTime } = useSettingsStore.getState()

      setReminderTime('18:30')

      expect(useSettingsStore.getState().reminderTime).toBe('18:30')
    })

    it('should set last notification date', () => {
      const { setLastNotificationDate } = useSettingsStore.getState()

      setLastNotificationDate('2025-12-23')

      expect(useSettingsStore.getState().lastNotificationDate).toBe('2025-12-23')
    })

    it('should clear last notification date', () => {
      const { setLastNotificationDate } = useSettingsStore.getState()

      setLastNotificationDate('2025-12-23')
      setLastNotificationDate(null)

      expect(useSettingsStore.getState().lastNotificationDate).toBeNull()
    })
  })
})

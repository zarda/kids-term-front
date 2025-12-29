import { describe, it, expect } from 'vitest'
import { achievements, getAchievementById, getAchievementsByType } from './achievements'

describe('achievements', () => {
  describe('achievements array', () => {
    it('should contain achievements of all types', () => {
      const types = new Set(achievements.map((a) => a.type))
      expect(types).toContain('streak')
      expect(types).toContain('words')
      expect(types).toContain('exercises')
      expect(types).toContain('accuracy')
      expect(types).toContain('time')
      expect(types).toContain('games')
      expect(types).toContain('perfect')
    })

    it('should have unique ids', () => {
      const ids = achievements.map((a) => a.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })

  describe('getAchievementById', () => {
    it('should return the correct achievement for streak-7', () => {
      const achievement = getAchievementById('streak-7')
      expect(achievement).toBeDefined()
      expect(achievement?.id).toBe('streak-7')
      expect(achievement?.type).toBe('streak')
      expect(achievement?.requirement).toBe(7)
      expect(achievement?.icon).toBe('⚡')
    })

    it('should return the correct achievement for words-100', () => {
      const achievement = getAchievementById('words-100')
      expect(achievement).toBeDefined()
      expect(achievement?.id).toBe('words-100')
      expect(achievement?.type).toBe('words')
      expect(achievement?.requirement).toBe(100)
    })

    it('should return undefined for non-existent id', () => {
      const achievement = getAchievementById('nonexistent')
      expect(achievement).toBeUndefined()
    })

    it('should return undefined for empty string', () => {
      const achievement = getAchievementById('')
      expect(achievement).toBeUndefined()
    })
  })

  describe('getAchievementsByType', () => {
    it('should return all 11 streak achievements', () => {
      const streakAchievements = getAchievementsByType('streak')
      expect(streakAchievements).toHaveLength(11)
      expect(streakAchievements.every((a) => a.type === 'streak')).toBe(true)
    })

    it('should return all 13 word achievements', () => {
      const wordAchievements = getAchievementsByType('words')
      expect(wordAchievements).toHaveLength(13)
      expect(wordAchievements.every((a) => a.type === 'words')).toBe(true)
    })

    it('should return all 13 exercise achievements', () => {
      const exerciseAchievements = getAchievementsByType('exercises')
      expect(exerciseAchievements).toHaveLength(13)
      expect(exerciseAchievements.every((a) => a.type === 'exercises')).toBe(true)
    })

    it('should return all 7 accuracy achievements', () => {
      const accuracyAchievements = getAchievementsByType('accuracy')
      expect(accuracyAchievements).toHaveLength(7)
      expect(accuracyAchievements.every((a) => a.type === 'accuracy')).toBe(true)
    })

    it('should return all 10 time achievements', () => {
      const timeAchievements = getAchievementsByType('time')
      expect(timeAchievements).toHaveLength(10)
      expect(timeAchievements.every((a) => a.type === 'time')).toBe(true)
    })

    it('should return all 4 games achievements', () => {
      const gamesAchievements = getAchievementsByType('games')
      expect(gamesAchievements).toHaveLength(4)
      expect(gamesAchievements.every((a) => a.type === 'games')).toBe(true)
    })

    it('should return all 3 perfect achievements', () => {
      const perfectAchievements = getAchievementsByType('perfect')
      expect(perfectAchievements).toHaveLength(3)
      expect(perfectAchievements.every((a) => a.type === 'perfect')).toBe(true)
    })

    it('should return empty array for invalid type', () => {
      // @ts-expect-error Testing invalid type
      const invalid = getAchievementsByType('invalid')
      expect(invalid).toHaveLength(0)
    })

    it('should return achievements sorted by requirement within type', () => {
      const streakAchievements = getAchievementsByType('streak')
      const requirements = streakAchievements.map((a) => a.requirement)
      const sortedRequirements = [...requirements].sort((a, b) => a - b)
      expect(requirements).toEqual(sortedRequirements)
    })
  })
})

import { describe, it, expect, beforeEach } from 'vitest'
import { generateExercise } from './exerciseGenerator'
import { createMockWord, createMockWords, resetFactoryCounters } from '../test/factories'

describe('generateExercise', () => {
  beforeEach(() => {
    resetFactoryCounters()
  })

  describe('when words.length < 4', () => {
    it('should return null when words array is empty', () => {
      const result = generateExercise([], 'multiple-choice')
      expect(result).toBeNull()
    })

    it('should return null when words array has 1 word', () => {
      const words = createMockWords(1)
      const result = generateExercise(words, 'multiple-choice')
      expect(result).toBeNull()
    })

    it('should return null when words array has 2 words', () => {
      const words = createMockWords(2)
      const result = generateExercise(words, 'multiple-choice')
      expect(result).toBeNull()
    })

    it('should return null when words array has 3 words', () => {
      const words = createMockWords(3)
      const result = generateExercise(words, 'multiple-choice')
      expect(result).toBeNull()
    })
  })

  describe('when words.length >= 4', () => {
    it('should return an Exercise object when words.length is exactly 4', () => {
      const words = createMockWords(4)
      const result = generateExercise(words, 'multiple-choice')

      expect(result).not.toBeNull()
      expect(result).toHaveProperty('id')
      expect(result).toHaveProperty('type')
      expect(result).toHaveProperty('wordId')
      expect(result).toHaveProperty('question')
      expect(result).toHaveProperty('options')
      expect(result).toHaveProperty('correctAnswer')
      expect(result).toHaveProperty('timeLimit')
    })

    it('should return an Exercise object when words.length is greater than 4', () => {
      const words = createMockWords(10)
      const result = generateExercise(words, 'listening')

      expect(result).not.toBeNull()
    })

    it('should have exactly 4 options', () => {
      const words = createMockWords(10)
      const result = generateExercise(words, 'multiple-choice')

      expect(result?.options).toHaveLength(4)
    })

    it('should include the correct answer in options', () => {
      const words = createMockWords(10)
      const result = generateExercise(words, 'multiple-choice')

      expect(result?.options).toContain(result?.correctAnswer)
    })

    it('should have no duplicate options', () => {
      const words = createMockWords(10)
      // Run multiple times to increase chance of catching duplicates
      for (let i = 0; i < 20; i++) {
        const result = generateExercise(words, 'multiple-choice')
        const uniqueOptions = new Set(result?.options)
        expect(uniqueOptions.size).toBe(4)
      }
    })

    it('should set question to the target term wrapped in quotes', () => {
      const word = createMockWord({ term: 'hello' })
      const words = [word, ...createMockWords(3)]

      // Generate exercises until we get one with our target word
      let result
      for (let i = 0; i < 100; i++) {
        result = generateExercise(words, 'multiple-choice')
        if (result?.wordId === word.id) break
      }

      if (result?.wordId === word.id) {
        expect(result.question).toBe('"hello"')
      }
    })

    it('should set correct answer to the target word definition', () => {
      const word = createMockWord({ definition: 'greeting' })
      const words = [word, ...createMockWords(3)]

      // Generate exercises until we get one with our target word
      let result
      for (let i = 0; i < 100; i++) {
        result = generateExercise(words, 'multiple-choice')
        if (result?.wordId === word.id) break
      }

      if (result?.wordId === word.id) {
        expect(result.correctAnswer).toBe('greeting')
      }
    })

    it('should match the exercise type to input type', () => {
      const words = createMockWords(10)

      const multipleChoice = generateExercise(words, 'multiple-choice')
      expect(multipleChoice?.type).toBe('multiple-choice')

      const listening = generateExercise(words, 'listening')
      expect(listening?.type).toBe('listening')

      const fillBlank = generateExercise(words, 'fill-blank')
      expect(fillBlank?.type).toBe('fill-blank')
    })

    it('should set timeLimit to 30', () => {
      const words = createMockWords(10)
      const result = generateExercise(words, 'multiple-choice')

      expect(result?.timeLimit).toBe(30)
    })

    it('should generate exercise IDs with expected format', () => {
      const words = createMockWords(10)
      const result = generateExercise(words, 'multiple-choice')

      expect(result?.id).toMatch(/^ex-\d+$/)
    })

    it('should select wordId from the provided words', () => {
      const words = createMockWords(10)
      const wordIds = words.map((w) => w.id)

      for (let i = 0; i < 20; i++) {
        const result = generateExercise(words, 'multiple-choice')
        expect(wordIds).toContain(result?.wordId)
      }
    })
  })
})

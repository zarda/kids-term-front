import { describe, it, expect } from 'vitest'
import { learningMethods, getLearningMethod, type LearningMethodId } from './learningMethods'

describe('learningMethods registry', () => {
  it('contains the four learning methods with unique ids and paths', () => {
    const ids = learningMethods.map((m) => m.id)
    expect(ids).toEqual(['flashcards', 'srs', 'typing', 'context'])
    expect(new Set(ids).size).toBe(ids.length)
    expect(new Set(learningMethods.map((m) => m.path)).size).toBe(learningMethods.length)
  })

  it('routes every method under /learn', () => {
    for (const method of learningMethods) {
      expect(method.path.startsWith('/learn/')).toBe(true)
      expect(method.minWords).toBeGreaterThanOrEqual(1)
    }
  })
})

describe('getLearningMethod', () => {
  it('finds a method by id', () => {
    expect(getLearningMethod('srs')?.path).toBe('/learn/srs')
  })

  it('returns undefined for an unknown id', () => {
    expect(getLearningMethod('unknown' as LearningMethodId)).toBeUndefined()
  })
})

import { describe, it, expect, beforeEach } from 'vitest'
import {
  escapeRegExp,
  findExampleWithTerm,
  blankOutTerm,
  wordsWithUsableExamples,
  generateCloze,
  CLOZE_BLANK,
} from './clozeGenerator'
import { createMockWord, createMockWords, resetFactoryCounters } from '../test/factories'

/** Build a word whose example sentence actually contains its term. */
const usableWord = (term: string) =>
  createMockWord({ term, definition: `meaning of ${term}`, examples: [`I really like ${term} a lot`] })

describe('escapeRegExp', () => {
  it('escapes regex special characters', () => {
    expect(escapeRegExp('a.b*c+(d)')).toBe('a\\.b\\*c\\+\\(d\\)')
  })
})

describe('findExampleWithTerm', () => {
  it('returns the example containing the term (case-insensitive)', () => {
    const word = createMockWord({ term: 'Apple', examples: ['Look, an apple!'] })
    expect(findExampleWithTerm(word)).toBe('Look, an apple!')
  })

  it('returns undefined when no example contains the term', () => {
    const word = createMockWord({ term: 'apple', examples: ['A fruit', 'Tasty'] })
    expect(findExampleWithTerm(word)).toBeUndefined()
  })
})

describe('blankOutTerm', () => {
  it('replaces the first case-insensitive occurrence with a blank', () => {
    expect(blankOutTerm('I ate an Apple today', 'apple')).toBe(`I ate an ${CLOZE_BLANK} today`)
  })
})

describe('wordsWithUsableExamples', () => {
  it('keeps only words whose example contains the term', () => {
    resetFactoryCounters()
    const good = usableWord('apple')
    const bad = createMockWord({ term: 'banana', examples: ['no match here'] })
    expect(wordsWithUsableExamples([good, bad])).toEqual([good])
  })
})

describe('generateCloze', () => {
  beforeEach(() => resetFactoryCounters())

  it('returns null when fewer than 4 usable words', () => {
    // Default mock examples ("Example sentence for word-X") never contain the term.
    expect(generateCloze(createMockWords(10))).toBeNull()
  })

  it('builds a valid question when there are enough usable words', () => {
    const words = ['apple', 'banana', 'cherry', 'date', 'fig'].map(usableWord)
    const byId = Object.fromEntries(words.map((w) => [w.id, w]))

    // Run several times to exercise the random selection paths.
    for (let i = 0; i < 30; i++) {
      const q = generateCloze(words)
      expect(q).not.toBeNull()
      if (!q) continue

      expect(q.options).toHaveLength(4)
      expect(q.options).toContain(q.answer)
      expect(new Set(q.options).size).toBe(4) // no duplicate options
      expect(q.sentence).toContain(CLOZE_BLANK)
      expect(q.fullSentence).toContain(q.answer)
      expect(q.definition).toBe(byId[q.wordId].definition)
      expect(q.answer).toBe(byId[q.wordId].term)
    }
  })
})

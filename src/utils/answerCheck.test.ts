import { describe, it, expect } from 'vitest'
import { normalizeAnswer, checkTypingAnswer } from './answerCheck'

describe('normalizeAnswer', () => {
  it('trims, lowercases and collapses internal whitespace', () => {
    expect(normalizeAnswer('  Ice   Cream  ')).toBe('ice cream')
  })

  it('returns an empty string for whitespace-only input', () => {
    expect(normalizeAnswer('   ')).toBe('')
  })
})

describe('checkTypingAnswer', () => {
  it('matches ignoring case and surrounding whitespace', () => {
    expect(checkTypingAnswer('  Apple ', 'apple')).toBe(true)
  })

  it('matches when internal whitespace differs', () => {
    expect(checkTypingAnswer('ice  cream', 'Ice Cream')).toBe(true)
  })

  it('rejects a different word', () => {
    expect(checkTypingAnswer('banana', 'apple')).toBe(false)
  })

  it('rejects empty input even against an empty target', () => {
    expect(checkTypingAnswer('', '')).toBe(false)
    expect(checkTypingAnswer('   ', 'apple')).toBe(false)
  })
})

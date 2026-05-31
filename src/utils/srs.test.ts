import { describe, it, expect } from 'vitest'
import { addDays, format } from 'date-fns'
import {
  createSrsCard,
  reviewCard,
  isDue,
  getSrsStats,
  buildSrsQueue,
  DEFAULT_EASE,
  MIN_EASE,
} from './srs'
import type { SrsCard } from '../types/srs.types'
import { createMockWords, resetFactoryCounters } from '../test/factories'

const NOW = new Date('2026-05-31T12:00:00')
const fmt = (d: Date) => format(d, 'yyyy-MM-dd')

const makeCard = (overrides: Partial<SrsCard> = {}): SrsCard => ({
  wordId: 'w',
  ease: DEFAULT_EASE,
  interval: 1,
  repetitions: 1,
  dueDate: fmt(NOW),
  lastReviewed: null,
  ...overrides,
})

describe('createSrsCard', () => {
  it('creates a card due today with default ease', () => {
    const card = createSrsCard('word-1', NOW)
    expect(card).toMatchObject({
      wordId: 'word-1',
      ease: DEFAULT_EASE,
      interval: 0,
      repetitions: 0,
      dueDate: fmt(NOW),
      lastReviewed: null,
    })
  })
})

describe('reviewCard', () => {
  it('schedules a new card 1 day out on "good"', () => {
    const updated = reviewCard(createSrsCard('w', NOW), 'good', NOW)
    expect(updated.interval).toBe(1)
    expect(updated.repetitions).toBe(1)
    expect(updated.dueDate).toBe(fmt(addDays(NOW, 1)))
    expect(updated.lastReviewed).toBe(NOW.toISOString())
  })

  it('uses a 3-day interval on the second "good"', () => {
    const updated = reviewCard(makeCard({ repetitions: 1, interval: 1 }), 'good', NOW)
    expect(updated.interval).toBe(3)
    expect(updated.repetitions).toBe(2)
  })

  it('multiplies interval by ease once past the learning steps', () => {
    const updated = reviewCard(
      makeCard({ repetitions: 2, interval: 10, ease: 2.5 }),
      'good',
      NOW
    )
    expect(updated.interval).toBe(25) // round(10 * 2.5)
    expect(updated.repetitions).toBe(3)
  })

  it('bumps ease and stretches the interval on "easy"', () => {
    const updated = reviewCard(makeCard({ repetitions: 1, interval: 1, ease: 2.5 }), 'easy', NOW)
    expect(updated.ease).toBe(2.65)
    expect(updated.interval).toBe(8) // round(6 * 1.3)
  })

  it('resets and lowers ease on "again"', () => {
    const updated = reviewCard(makeCard({ repetitions: 3, interval: 20, ease: 2.5 }), 'again', NOW)
    expect(updated.repetitions).toBe(0)
    expect(updated.interval).toBe(0)
    expect(updated.ease).toBe(2.3)
    expect(updated.dueDate).toBe(fmt(NOW))
  })

  it('never lowers ease below the floor', () => {
    const updated = reviewCard(makeCard({ ease: MIN_EASE }), 'again', NOW)
    expect(updated.ease).toBe(MIN_EASE)
  })
})

describe('isDue', () => {
  it('is true when the due date is today or earlier', () => {
    expect(isDue(makeCard({ dueDate: fmt(NOW) }), NOW)).toBe(true)
    expect(isDue(makeCard({ dueDate: fmt(addDays(NOW, -1)) }), NOW)).toBe(true)
  })

  it('is false when the due date is in the future', () => {
    expect(isDue(makeCard({ dueDate: fmt(addDays(NOW, 1)) }), NOW)).toBe(false)
  })
})

describe('getSrsStats', () => {
  it('counts due, fresh and total words', () => {
    resetFactoryCounters()
    const [a, b, c] = createMockWords(3)
    const cards: Record<string, SrsCard> = {
      [a.id]: makeCard({ wordId: a.id, dueDate: fmt(NOW) }), // due
      [b.id]: makeCard({ wordId: b.id, dueDate: fmt(addDays(NOW, 5)) }), // not due
      // c has no card -> fresh
    }
    expect(getSrsStats([a, b, c], cards, NOW)).toEqual({ due: 1, fresh: 1, total: 3 })
  })
})

describe('buildSrsQueue', () => {
  it('puts due cards first, then new words, respecting caps', () => {
    resetFactoryCounters()
    const words = createMockWords(6)
    const [d1, d2, d3, f1, f2, f3] = words
    const cards: Record<string, SrsCard> = {
      [d1.id]: makeCard({ wordId: d1.id, dueDate: fmt(NOW) }),
      [d2.id]: makeCard({ wordId: d2.id, dueDate: fmt(NOW) }),
      [d3.id]: makeCard({ wordId: d3.id, dueDate: fmt(NOW) }),
    }
    const queue = buildSrsQueue(words, cards, { maxReview: 2, maxNew: 2, now: NOW })
    expect(queue).toEqual([d1, d2, f1, f2])
    // f3 and d3 trimmed by the caps
    expect(queue).not.toContain(d3)
    expect(queue).not.toContain(f3)
  })

  it('uses the default caps when none are provided', () => {
    resetFactoryCounters()
    const words = createMockWords(3)
    const queue = buildSrsQueue(words, {}, { now: NOW })
    expect(queue).toHaveLength(3) // all fresh, under the default cap
  })
})

import { addDays, format } from 'date-fns'
import type { LanguageWord } from '../types/language.types'
import type { SrsCard, SrsRating, SrsStats } from '../types/srs.types'

/**
 * Spaced-repetition scheduling, a simplified take on the SM-2 algorithm.
 *
 * All functions are pure: they take the current card (and "now") and return a
 * new card, so they are trivially testable and never touch storage. The store
 * (`useSrsStore`) and the page (`SrsLearningPage`) are thin wrappers over these.
 */

/** Default ease factor for a fresh card (standard SM-2 starting value). */
export const DEFAULT_EASE = 2.5
/** Ease is never allowed below this floor, matching SM-2. */
export const MIN_EASE = 1.3
/** Max review cards pulled into a single session queue. */
export const DEFAULT_MAX_REVIEW = 20
/** Max brand-new cards introduced in a single session queue. */
export const DEFAULT_MAX_NEW = 10

const toDateString = (date: Date): string => format(date, 'yyyy-MM-dd')

/** Create the initial scheduling state for a word, due immediately. */
export function createSrsCard(wordId: string, now: Date = new Date()): SrsCard {
  return {
    wordId,
    ease: DEFAULT_EASE,
    interval: 0,
    repetitions: 0,
    dueDate: toDateString(now),
    lastReviewed: null,
  }
}

/**
 * Apply a self-rating to a card and return the rescheduled card.
 *
 * - `again`: the learner failed — reset repetitions, lower ease, show again today.
 * - `good`: a normal success — grow the interval by the ease factor.
 * - `easy`: an effortless success — bump ease and stretch the interval further.
 */
export function reviewCard(
  card: SrsCard,
  rating: SrsRating,
  now: Date = new Date()
): SrsCard {
  let { ease, interval, repetitions } = card

  if (rating === 'again') {
    repetitions = 0
    interval = 0
    ease = Math.max(MIN_EASE, ease - 0.2)
  } else {
    if (repetitions === 0) {
      interval = 1
    } else if (repetitions === 1) {
      interval = rating === 'easy' ? 6 : 3
    } else {
      interval = Math.round(interval * ease)
    }

    if (rating === 'easy') {
      ease = ease + 0.15
      interval = Math.round(interval * 1.3)
    }

    repetitions = repetitions + 1
  }

  return {
    ...card,
    ease: Number(ease.toFixed(2)),
    interval,
    repetitions,
    dueDate: toDateString(addDays(now, interval)),
    lastReviewed: now.toISOString(),
  }
}

/** Whether an existing card is due for review on `now` (date granularity). */
export function isDue(card: SrsCard, now: Date = new Date()): boolean {
  // `yyyy-MM-dd` strings compare correctly lexicographically.
  return card.dueDate <= toDateString(now)
}

/** Count due vs. brand-new words for the current pack (drives hub badges). */
export function getSrsStats(
  words: LanguageWord[],
  cards: Record<string, SrsCard>,
  now: Date = new Date()
): SrsStats {
  let due = 0
  let fresh = 0
  for (const word of words) {
    const card = cards[word.id]
    if (!card) {
      fresh += 1
    } else if (isDue(card, now)) {
      due += 1
    }
  }
  return { due, fresh, total: words.length }
}

/**
 * Build the ordered queue of words for a review session: due cards first
 * (capped at `maxReview`), then a handful of brand-new words (capped at `maxNew`).
 */
export function buildSrsQueue(
  words: LanguageWord[],
  cards: Record<string, SrsCard>,
  options: { maxReview?: number; maxNew?: number; now?: Date } = {}
): LanguageWord[] {
  const {
    maxReview = DEFAULT_MAX_REVIEW,
    maxNew = DEFAULT_MAX_NEW,
    now = new Date(),
  } = options

  const due: LanguageWord[] = []
  const fresh: LanguageWord[] = []
  for (const word of words) {
    const card = cards[word.id]
    if (!card) {
      fresh.push(word)
    } else if (isDue(card, now)) {
      due.push(word)
    }
  }

  return [...due.slice(0, maxReview), ...fresh.slice(0, maxNew)]
}

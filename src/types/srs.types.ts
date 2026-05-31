/**
 * Types for the Spaced Repetition (SRS) learning method.
 *
 * Each word the learner reviews gets an `SrsCard` that tracks how well it is
 * known, using a simplified SM-2 scheduling algorithm (see `src/utils/srs.ts`).
 */

/** The three kid-friendly self-rating buttons shown after revealing a card. */
export type SrsRating = 'again' | 'good' | 'easy'

/** Scheduling state stored per word. Dates use the `yyyy-MM-dd` format so they
 * can be compared lexicographically and are timezone-stable. */
export interface SrsCard {
  /** Id of the `LanguageWord` this card schedules. */
  wordId: string
  /** SM-2 ease factor. Starts at 2.5 and is clamped to a minimum of 1.3. */
  ease: number
  /** Current interval in days until the card becomes due again. */
  interval: number
  /** Number of consecutive successful (good/easy) reviews. */
  repetitions: number
  /** Date (`yyyy-MM-dd`) on/after which the card is due for review. */
  dueDate: string
  /** ISO timestamp of the last review, or `null` for a brand-new card. */
  lastReviewed: string | null
}

/** Aggregate counts used to drive the hub badges and empty states. */
export interface SrsStats {
  /** Words with an existing card that is due today or earlier. */
  due: number
  /** Words that have never been reviewed (no card yet). */
  fresh: number
  /** Total words considered. */
  total: number
}

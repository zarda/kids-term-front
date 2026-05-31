import type { LanguageWord } from '../types/language.types'

/**
 * Cloze ("fill in the blank") generation for the sentence/context learning
 * method. Given a set of words, we pick one whose example sentence contains the
 * term, blank the term out, and offer it among distractor terms.
 *
 * Pure and storage-free so it can be unit tested directly (randomness is
 * exercised by the page/tests, mirroring `exerciseGenerator`).
 */

/** Placeholder shown where the missing word goes. */
export const CLOZE_BLANK = '_____'

/** Minimum eligible words required to build a cloze question (1 answer + 3 distractors). */
export const MIN_CLOZE_WORDS = 4

export interface ClozeQuestion {
  wordId: string
  /** The example sentence with the target term replaced by {@link CLOZE_BLANK}. */
  sentence: string
  /** The original, unmodified example sentence. */
  fullSentence: string
  /** The correct term (the blanked-out word). */
  answer: string
  /** Four shuffled term options including the answer. */
  options: string[]
  /** The target word's definition, revealed after answering. */
  definition: string
}

/** Escape a string for safe use inside a RegExp. */
export function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** Find the first example sentence of a word that actually contains its term. */
export function findExampleWithTerm(word: LanguageWord): string | undefined {
  const term = word.term.toLowerCase()
  return word.examples.find((example) => example.toLowerCase().includes(term))
}

/** Replace the first case-insensitive occurrence of `term` with a blank. */
export function blankOutTerm(sentence: string, term: string): string {
  return sentence.replace(new RegExp(escapeRegExp(term), 'i'), CLOZE_BLANK)
}

/** Words usable for cloze: those with an example sentence containing the term. */
export function wordsWithUsableExamples(words: LanguageWord[]): LanguageWord[] {
  return words.filter((word) => findExampleWithTerm(word) !== undefined)
}

/**
 * Build a single cloze question, or `null` if there aren't enough eligible words.
 * Distractors are drawn from the full word list (not just eligible ones) for variety.
 */
export function generateCloze(words: LanguageWord[]): ClozeQuestion | null {
  const eligible = wordsWithUsableExamples(words)
  if (eligible.length < MIN_CLOZE_WORDS) return null

  const target = eligible[Math.floor(Math.random() * eligible.length)]
  const example = findExampleWithTerm(target) as string

  const distractors = words
    .filter((word) => word.id !== target.id)
    .map((word) => word.term)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

  const options = [...distractors, target.term].sort(() => Math.random() - 0.5)

  return {
    wordId: target.id,
    sentence: blankOutTerm(example, target.term),
    fullSentence: example,
    answer: target.term,
    options,
    definition: target.definition,
  }
}

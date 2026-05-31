/**
 * Answer checking for the typing/spelling learning method.
 *
 * Kept deliberately forgiving for kids: leading/trailing whitespace is trimmed,
 * comparison is case-insensitive, and internal runs of whitespace are collapsed
 * so "ice  cream" matches "Ice Cream".
 */

/** Normalize a string for comparison: trim, lowercase, collapse whitespace. */
export function normalizeAnswer(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ')
}

/**
 * Whether `input` matches the `target` term after normalization.
 * Empty (or whitespace-only) input never counts as correct.
 */
export function checkTypingAnswer(input: string, target: string): boolean {
  const normalizedInput = normalizeAnswer(input)
  if (normalizedInput.length === 0) return false
  return normalizedInput === normalizeAnswer(target)
}

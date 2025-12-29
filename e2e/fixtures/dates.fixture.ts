/**
 * Date helper fixtures for E2E tests
 * Used primarily for testing streak logic
 */

export const getToday = (): string => {
  return new Date().toISOString().split('T')[0]
}

export const getYesterday = (): string => {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return date.toISOString().split('T')[0]
}

export const getDaysAgo = (days: number): string => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date.toISOString().split('T')[0]
}

export const getTomorrow = (): string => {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  return date.toISOString().split('T')[0]
}

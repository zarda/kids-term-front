/**
 * E2E Test Fixtures - Export all fixtures from a single location
 */

// Date fixtures
export {
  getToday,
  getYesterday,
  getDaysAgo,
  getTomorrow,
} from './dates.fixture'

// Progress state fixtures
export {
  emptyProgressState,
  activeStreakProgressState,
  withAchievementsProgressState,
  customProgressState,
  dailyGoalCompletedState,
  withGamesProgressState,
} from './progress.fixture'
export type { ProgressStateFixture } from './progress.fixture'

// Language pack fixtures
export {
  mockLanguagePackStore,
  multiPackStore,
  emptyPackStore,
  getMockWords,
} from './language-pack.fixture'
export type { LanguagePackStateFixture } from './language-pack.fixture'

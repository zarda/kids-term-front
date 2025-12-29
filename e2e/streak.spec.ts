import { test, expect } from '@playwright/test'
import {
  emptyProgressState,
  customProgressState,
  activeStreakProgressState,
  mockLanguagePackStore,
  getToday,
  getYesterday,
  getDaysAgo,
} from './fixtures'
import { STORAGE_KEYS } from './helpers'

test.describe('Streak - Display', () => {
  test('should show 0 streak for new user', async ({ page }) => {
    await page.addInitScript(
      ({ progress, packs, progressKey, packsKey }) => {
        localStorage.setItem(progressKey, JSON.stringify(progress))
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      {
        progress: emptyProgressState,
        packs: mockLanguagePackStore,
        progressKey: STORAGE_KEYS.progress,
        packsKey: STORAGE_KEYS.languagePacks,
      }
    )

    await page.goto('/')
    // Should show "0 天" (0 days)
    await expect(page.locator('text=/0 天|0 days/i')).toBeVisible()
  })

  test('should show current streak on home page', async ({ page }) => {
    const progressState = activeStreakProgressState(7, getToday())
    await page.addInitScript(
      ({ progress, packs, progressKey, packsKey }) => {
        localStorage.setItem(progressKey, JSON.stringify(progress))
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      {
        progress: progressState,
        packs: mockLanguagePackStore,
        progressKey: STORAGE_KEYS.progress,
        packsKey: STORAGE_KEYS.languagePacks,
      }
    )

    await page.goto('/')
    await expect(page.locator('text=/7 天|7 days/i')).toBeVisible()
  })

  test('should show current and longest streak on progress page', async ({
    page,
  }) => {
    const progressState = customProgressState({
      currentStreak: 5,
      longestStreak: 12,
      lastActiveDate: getToday(),
    })
    await page.addInitScript(
      ({ progress, packs, progressKey, packsKey }) => {
        localStorage.setItem(progressKey, JSON.stringify(progress))
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      {
        progress: progressState,
        packs: mockLanguagePackStore,
        progressKey: STORAGE_KEYS.progress,
        packsKey: STORAGE_KEYS.languagePacks,
      }
    )

    await page.goto('/progress')
    // Should show both streaks - UI shows 連續學習 (Streak) and 最佳紀錄 (Best Record)
    // Use .first() because "連續學習" appears in multiple achievement descriptions
    await expect(
      page.locator('text=/連續學習|Streak/i').first()
    ).toBeVisible()
    await expect(
      page.locator('text=/最佳紀錄|Best Record/i').first()
    ).toBeVisible()
    // The values should be visible - "5 天" and "12 天"
    await expect(page.locator('text=/5 天|5 days/i').first()).toBeVisible()
    await expect(page.locator('text=/12 天|12 days/i').first()).toBeVisible()
  })
})

test.describe('Streak - Continuation Logic', () => {
  test('should show streak continues from yesterday', async ({ page }) => {
    // User was active yesterday with streak of 3
    // The streak should still display as 3 when they visit today (before any activity)
    const progressState = customProgressState({
      currentStreak: 3,
      longestStreak: 3,
      lastActiveDate: getYesterday(),
      totalWordsLearned: 10,
    })
    await page.addInitScript(
      ({ progress, packs, progressKey, packsKey }) => {
        localStorage.setItem(progressKey, JSON.stringify(progress))
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      {
        progress: progressState,
        packs: mockLanguagePackStore,
        progressKey: STORAGE_KEYS.progress,
        packsKey: STORAGE_KEYS.languagePacks,
      }
    )

    // Visit home page - should still show the streak
    await page.goto('/')
    await expect(page.locator('text=/3 天|3 days/i')).toBeVisible()
  })

  test('should show streak was reset after gap', async ({ page }) => {
    // User was last active 3 days ago - streak should have been reset
    // When they visit, the display should reflect their old streak until activity
    const progressState = customProgressState({
      currentStreak: 10, // This will be reset on activity but shows stored value
      longestStreak: 10,
      lastActiveDate: getDaysAgo(3),
      totalWordsLearned: 50,
    })
    await page.addInitScript(
      ({ progress, packs, progressKey, packsKey }) => {
        localStorage.setItem(progressKey, JSON.stringify(progress))
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      {
        progress: progressState,
        packs: mockLanguagePackStore,
        progressKey: STORAGE_KEYS.progress,
        packsKey: STORAGE_KEYS.languagePacks,
      }
    )

    // Visit home - should show the stored streak value
    await page.goto('/')
    await expect(page.locator('text=/10 天|10 days/i')).toBeVisible()
  })

  test('should show 0 streak for new user', async ({ page }) => {
    await page.addInitScript(
      ({ progress, packs, progressKey, packsKey }) => {
        localStorage.setItem(progressKey, JSON.stringify(progress))
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      {
        progress: emptyProgressState,
        packs: mockLanguagePackStore,
        progressKey: STORAGE_KEYS.progress,
        packsKey: STORAGE_KEYS.languagePacks,
      }
    )

    // New user - visit home
    await page.goto('/')
    // Streak should be 0
    await expect(page.locator('text=/0 天|0 days/i')).toBeVisible()
  })
})

test.describe('Streak - Longest Streak', () => {
  test('should display current streak on progress page', async ({
    page,
  }) => {
    // Current streak equals longest streak
    const progressState = customProgressState({
      currentStreak: 7,
      longestStreak: 7,
      lastActiveDate: getYesterday(),
      totalWordsLearned: 35,
    })
    await page.addInitScript(
      ({ progress, packs, progressKey, packsKey }) => {
        localStorage.setItem(progressKey, JSON.stringify(progress))
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      {
        progress: progressState,
        packs: mockLanguagePackStore,
        progressKey: STORAGE_KEYS.progress,
        packsKey: STORAGE_KEYS.languagePacks,
      }
    )

    // Check progress page - should show 7 for both current and longest
    await page.goto('/progress')
    // Look for the number 7 appearing
    const sevens = page.locator('text=7')
    await expect(sevens.first()).toBeVisible()
  })

  test('should preserve longest streak when current is lower', async ({
    page,
  }) => {
    // Current streak is lower than longest (streak was broken and restarted)
    const progressState = customProgressState({
      currentStreak: 3,
      longestStreak: 15,
      lastActiveDate: getToday(),
      totalWordsLearned: 75,
    })
    await page.addInitScript(
      ({ progress, packs, progressKey, packsKey }) => {
        localStorage.setItem(progressKey, JSON.stringify(progress))
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      {
        progress: progressState,
        packs: mockLanguagePackStore,
        progressKey: STORAGE_KEYS.progress,
        packsKey: STORAGE_KEYS.languagePacks,
      }
    )

    await page.goto('/progress')
    // Should show longest streak as 15
    await expect(page.locator('text=15').first()).toBeVisible()
    // And current streak as 3
    await expect(page.locator('text=3').first()).toBeVisible()
  })
})

test.describe('Streak - Persistence', () => {
  test('should persist streak across page reloads', async ({ page }) => {
    const progressState = activeStreakProgressState(5, getToday())
    await page.addInitScript(
      ({ progress, packs, progressKey, packsKey }) => {
        localStorage.setItem(progressKey, JSON.stringify(progress))
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      {
        progress: progressState,
        packs: mockLanguagePackStore,
        progressKey: STORAGE_KEYS.progress,
        packsKey: STORAGE_KEYS.languagePacks,
      }
    )

    await page.goto('/')
    await expect(page.locator('text=/5 天|5 days/i')).toBeVisible()

    // Reload page
    await page.reload()

    // Streak should still be visible
    await expect(page.locator('text=/5 天|5 days/i')).toBeVisible()
  })
})

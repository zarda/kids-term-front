import { test, expect } from '@playwright/test'
import {
  customProgressState,
  dailyGoalCompletedState,
  mockLanguagePackStore,
  getToday,
} from './fixtures'
import { STORAGE_KEYS } from './helpers'

test.describe('Home Page - Initial Display', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(
      ({ packs, packsKey }) => {
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      { packs: mockLanguagePackStore, packsKey: STORAGE_KEYS.languagePacks }
    )
  })

  test('should display welcome message', async ({ page }) => {
    await page.goto('/')
    await expect(
      page.getByRole('heading', { name: /歡迎回來|Welcome back/i })
    ).toBeVisible()
  })

  test('should display daily goal card', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=/每日目標|Daily Goal/i')).toBeVisible()
    // Should show progress like "0 / 10 個單字"
    await expect(page.locator('text=/\\d+ \\/ \\d+/').first()).toBeVisible()
  })

  test('should display all stat cards', async ({ page }) => {
    await page.goto('/')
    // Streak card
    await expect(page.locator('text=/連續學習|Streak/i')).toBeVisible()
    // Words learned card
    await expect(page.locator('text=/已學單字|Words Learned/i')).toBeVisible()
    // Pack progress card
    await expect(page.locator('text=/課程進度|Pack Progress/i')).toBeVisible()
    // Achievements card
    await expect(page.locator('text=/成就|Achievements/i')).toBeVisible()
  })

  test('should display action buttons', async ({ page }) => {
    await page.goto('/')
    await expect(
      page.getByRole('button', { name: /繼續學習|Continue Learning/i })
    ).toBeVisible()
    await expect(
      page.getByRole('button', { name: /開始練習|Start Practice/i })
    ).toBeVisible()
  })
})

test.describe('Home Page - With Progress Data', () => {
  test('should display correct streak count', async ({ page }) => {
    const progressState = customProgressState({
      currentStreak: 5,
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

    await page.goto('/')
    // Should show "5 天" (5 days)
    await expect(page.locator('text=/5 天|5 days/i')).toBeVisible()
  })

  test('should display correct words learned count', async ({ page }) => {
    const progressState = customProgressState({
      totalWordsLearned: 42,
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

    await page.goto('/')
    // Look for "42" appearing - use exact match to avoid matching "42 / 10"
    await expect(page.getByText('42', { exact: true })).toBeVisible()
  })

  test('should display daily goal progress correctly', async ({ page }) => {
    const progressState = customProgressState({
      dailyGoal: 10,
      todayWordsLearned: 7,
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

    await page.goto('/')
    // Should show "7 / 10 個單字"
    await expect(page.locator('text=7 / 10')).toBeVisible()
  })

  test('should show completion message when daily goal met', async ({
    page,
  }) => {
    const progressState = dailyGoalCompletedState(10)
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
    // Should show "完成!" or "Done!"
    await expect(page.locator('text=/完成|Done/i')).toBeVisible()
  })

  test('should display unlocked achievements count', async ({ page }) => {
    const progressState = customProgressState({
      achievements: ['streak-1', 'words-1', 'exercises-1'],
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

    await page.goto('/')
    // Achievements stat should show 3 in main content
    await expect(page.getByRole('main').locator('text=3').first()).toBeVisible()
  })

  test('should display pack progress', async ({ page }) => {
    const progressState = customProgressState({
      totalWordsLearned: 5,
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

    await page.goto('/')
    // Pack progress should show words learned vs total in pack
    // Mock pack has 10 words, so should show "5 / 10"
    await expect(page.getByRole('main').locator('text=/5 \\/ 10/')).toBeVisible()
  })
})

test.describe('Home Page - Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(
      ({ packs, packsKey }) => {
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      { packs: mockLanguagePackStore, packsKey: STORAGE_KEYS.languagePacks }
    )
  })

  test('should navigate to learn page when clicking continue button', async ({
    page,
  }) => {
    await page.goto('/')
    await page
      .getByRole('button', { name: /繼續學習|Continue Learning/i })
      .click()
    // Should see card indicator on learn page
    await expect(page.locator('text=/1 \\//i')).toBeVisible()
  })

  test('should navigate to practice page when clicking practice button', async ({
    page,
  }) => {
    await page.goto('/')
    await page
      .getByRole('button', { name: /開始練習|Start Practice/i })
      .click()
    // Should see practice mode heading
    await expect(
      page.getByRole('heading', { name: /練習模式|Practice Mode/i })
    ).toBeVisible()
  })
})

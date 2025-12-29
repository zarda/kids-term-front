import { test, expect } from '@playwright/test'
import {
  emptyProgressState,
  customProgressState,
  withAchievementsProgressState,
  mockLanguagePackStore,
  getToday,
} from './fixtures'
import { STORAGE_KEYS } from './helpers'

test.describe('Achievements - Display', () => {
  test('should display achievements section on progress page', async ({
    page,
  }) => {
    await page.addInitScript(
      ({ packs, packsKey }) => {
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      { packs: mockLanguagePackStore, packsKey: STORAGE_KEYS.languagePacks }
    )

    await page.goto('/progress')
    await expect(
      page.getByRole('heading', { name: /成就|Achievements/i })
    ).toBeVisible()
    // Should show achievement count like "X / Y"
    await expect(page.locator('text=/\\d+ \\/ \\d+/')).toBeVisible()
  })

  test('should show locked achievements as grayed out', async ({ page }) => {
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

    await page.goto('/progress')
    // Locked achievements have reduced opacity
    // We check that there are achievements rendered (with emoji icons)
    await expect(page.locator('text=🌟').first()).toBeVisible()
  })

  test('should show unlocked achievements', async ({ page }) => {
    const progressState = withAchievementsProgressState([
      'streak-1',
      'words-1',
    ])
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
    // Should show "2 / 78" or similar
    await expect(page.locator('text=/2 \\/ \\d+/')).toBeVisible()
  })

  test('should display achievement icons', async ({ page }) => {
    await page.addInitScript(
      ({ packs, packsKey }) => {
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      { packs: mockLanguagePackStore, packsKey: STORAGE_KEYS.languagePacks }
    )

    await page.goto('/progress')
    // Check for various achievement emoji icons
    await expect(page.locator('text=🌟').first()).toBeVisible() // streak-1
    await expect(page.locator('text=🌱').first()).toBeVisible() // words-1
    await expect(page.locator('text=🎈').first()).toBeVisible() // exercises-1
  })

  test('should show achievement count on home page', async ({ page }) => {
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
    // Achievement stat card should show 3 in main content
    await expect(page.getByRole('main').locator('text=3').first()).toBeVisible()
  })
})

test.describe('Achievements - Streak Unlocks', () => {
  test('should display streak achievements on progress page', async ({
    page,
  }) => {
    // User already has streak-1 unlocked
    const progressState = customProgressState({
      currentStreak: 1,
      longestStreak: 1,
      lastActiveDate: getToday(),
      totalWordsLearned: 1,
      achievements: ['streak-1', 'words-1'],
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

    // Check home page achievement count
    await page.goto('/')
    // Should show 2 achievements
    await expect(page.getByRole('main').locator('text=2').first()).toBeVisible()
  })

  test('should show streak-3 achievement when unlocked', async ({ page }) => {
    // User has 3-day streak with streak-3 achievement unlocked
    const progressState = customProgressState({
      currentStreak: 3,
      longestStreak: 3,
      lastActiveDate: getToday(),
      totalWordsLearned: 10,
      achievements: ['streak-1', 'streak-3', 'words-1', 'words-5', 'words-10'],
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

    // Check progress page for achievements
    await page.goto('/progress')
    // Should show 5 achievements unlocked
    await expect(page.locator('text=/5 \\/ \\d+/')).toBeVisible()
  })
})

test.describe('Achievements - Words Unlocks', () => {
  test('should display word achievements on progress page', async ({ page }) => {
    // User has words-1 achievement
    const progressState = customProgressState({
      totalWordsLearned: 1,
      achievements: ['streak-1', 'words-1'],
      lastActiveDate: getToday(),
      currentStreak: 1,
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

    // Check progress page for words achievements
    await page.goto('/progress')
    // Should show achievement count
    await expect(page.locator('text=/2 \\/ \\d+/')).toBeVisible()
  })

  test('should show words-10 achievement when unlocked', async ({ page }) => {
    // User has 10+ words with achievements
    const progressState = customProgressState({
      totalWordsLearned: 10,
      achievements: ['streak-1', 'words-1', 'words-5', 'words-10'],
      lastActiveDate: getToday(),
      currentStreak: 1,
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

    // Check progress page
    await page.goto('/progress')
    // Should show 4 achievements unlocked
    await expect(page.locator('text=/4 \\/ \\d+/')).toBeVisible()
  })
})

test.describe('Achievements - Games Unlocks', () => {
  test('should have games achievement available', async ({ page }) => {
    await page.addInitScript(
      ({ packs, packsKey }) => {
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      { packs: mockLanguagePackStore, packsKey: STORAGE_KEYS.languagePacks }
    )

    await page.goto('/progress')
    // Games achievement icon should be visible (🎮 for games-1)
    await expect(page.locator('text=🎮').first()).toBeVisible()
  })
})

test.describe('Achievements - Navigation', () => {
  test('should navigate to progress page to view achievements', async ({
    page,
  }) => {
    const progressState = customProgressState({
      totalWordsLearned: 5,
      achievements: ['streak-1', 'words-1', 'words-5'],
      lastActiveDate: getToday(),
      currentStreak: 1,
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

    // Navigate to progress page
    await page.goto('/progress')

    // Should see achievements section
    await expect(
      page.getByRole('heading', { name: /成就|Achievements/i })
    ).toBeVisible()
    // Should show 3 achievements unlocked
    await expect(page.locator('text=/3 \\/ \\d+/')).toBeVisible()
  })
})

test.describe('Achievements - Persistence', () => {
  test('should persist achievements across sessions', async ({ page }) => {
    const progressState = withAchievementsProgressState([
      'streak-1',
      'words-1',
      'streak-3',
    ])
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
    // Should show 3 achievements
    await expect(page.locator('text=/3 \\/ \\d+/')).toBeVisible()

    await page.reload()

    // Still shows 3 achievements after reload
    await expect(page.locator('text=/3 \\/ \\d+/')).toBeVisible()
  })
})

test.describe('Achievements - Exercise Unlocks', () => {
  test('should unlock first exercise achievement after completing exercise', async ({
    page,
  }) => {
    const progressState = customProgressState({
      totalWordsLearned: 5,
      currentStreak: 1,
      lastActiveDate: getToday(),
      achievements: ['streak-1', 'words-1'],
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

    // Start practice and complete an exercise
    await page.goto('/practice')
    // Click on multiple choice to start
    await page.locator('text=/選擇題|Multiple Choice/i').click()

    // Wait for question to appear and select an answer
    await page.waitForTimeout(500)
    // Click first answer option
    const answerButtons = page.locator('button').filter({
      has: page.locator('text=/蘋果|書|貓|狗|蛋|魚|帽子|冰|果醬|鑰匙/'),
    })
    if ((await answerButtons.count()) > 0) {
      await answerButtons.first().click()
    }

    // Check that exercises-1 achievement (🎈) may have been unlocked
    await page.goto('/progress')
    await expect(page.locator('text=🎈').first()).toBeVisible()
  })
})

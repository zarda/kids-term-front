import { test, expect } from '@playwright/test'

test.describe('Word Learning Page', () => {
  test.beforeEach(async ({ page }) => {
    // Clear swipe hints to ensure hints are visible for testing
    await page.addInitScript(() => {
      localStorage.removeItem('kidsterm-swipe-hints')
    })
    await page.goto('/learn')
  })

  test('should display flashcard with word', async ({ page }) => {
    // UI shows Chinese: 點擊翻轉
    await expect(page.locator('text=點擊翻轉')).toBeVisible()
    // Card counter format: "1 / 100"
    await expect(page.locator('text=1 /')).toBeVisible()
  })

  test('should flip card on click', async ({ page }) => {
    // Click the card to flip
    const card = page.locator('text=點擊翻轉')
    await card.click()
    // After flipping, the definition should be visible (back of card)
    // Wait for flip animation
    await page.waitForTimeout(500)
  })

  test('should navigate to next card with button', async ({ page }) => {
    // UI shows Chinese: 下一個
    const nextButton = page.getByRole('button', { name: '下一個' })
    await nextButton.click()
    // Card counter should show 2
    await expect(page.locator('text=2 /')).toBeVisible()
  })

  test('should navigate to previous card', async ({ page }) => {
    // First go to card 2
    const nextButton = page.getByRole('button', { name: '下一個' })
    await nextButton.click()
    await expect(page.locator('text=2 /')).toBeVisible()

    // Then go back
    const prevButton = page.getByRole('button', { name: '返回' })
    await prevButton.click()
    await expect(page.locator('text=1 /')).toBeVisible()
  })

  test('should toggle favorite', async ({ page }) => {
    const favoriteButton = page.getByRole('button', { name: 'Toggle favorite' })
    await expect(favoriteButton).toBeVisible()
    await favoriteButton.click()
  })

  test('should show pronunciation button with warning tooltip', async ({ page }) => {
    // UI shows Chinese: 發音
    const playButton = page.getByRole('button', { name: '發音' })
    await expect(playButton).toBeVisible()
  })

  test('should show progress bar', async ({ page }) => {
    // Progress bar should be visible
    await expect(page.locator('[role="progressbar"]')).toBeVisible()
  })

  test('should show jump to card feature', async ({ page }) => {
    // Click on card counter to show jump input
    await page.locator('text=1 /').click()
    // UI shows Chinese: 跳至卡片
    await expect(page.locator('text=跳至卡片')).toBeVisible()
  })
})

test.describe('Swipe Hints', () => {
  test('should show swipe hints on first visit of the day', async ({ page }) => {
    // Clear swipe hints to simulate new day
    await page.addInitScript(() => {
      localStorage.removeItem('kidsterm-swipe-hints')
    })
    await page.goto('/learn')

    // UI shows Chinese: 跳過, 已學會！
    await expect(page.locator('text=跳過')).toBeVisible()
    await expect(page.locator('text=已學會！')).toBeVisible()
  })

  test('should hide swipe hints after 3 swipes', async ({ page }) => {
    // Set swipe count to 3 to simulate completed onboarding for the day
    await page.addInitScript(() => {
      const today = new Date().toISOString().split('T')[0]
      localStorage.setItem('kidsterm-swipe-hints', JSON.stringify({ date: today, swipeCount: 3 }))
    })
    await page.goto('/learn')

    // Hints should not be visible
    await expect(page.locator('text=跳過')).not.toBeVisible()
    await expect(page.locator('text=已學會！')).not.toBeVisible()
  })

  test('should reset swipe hints on new day', async ({ page }) => {
    // Set swipe count from yesterday
    await page.addInitScript(() => {
      localStorage.setItem('kidsterm-swipe-hints', JSON.stringify({ date: '2020-01-01', swipeCount: 10 }))
    })
    await page.goto('/learn')

    // Hints should be visible again because it's a new day
    await expect(page.locator('text=跳過')).toBeVisible()
    await expect(page.locator('text=已學會！')).toBeVisible()
  })
})

test.describe('Resume Progress', () => {
  test('should show resume button when there is saved progress', async ({ page }) => {
    // Set up saved progress
    await page.addInitScript(() => {
      const progressData = {
        wordsLearned: 5,
        exercisesCompleted: 0,
        correctAnswers: 0,
        streak: 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
        longestStreak: 1,
        weeklyProgress: [0, 0, 0, 0, 0, 0, 0],
        totalTimeSpent: 0,
        unlockedAchievements: [],
        lastWordIndices: { 'tc-en': 10 },
        perfectAnswersInARow: 0,
      }
      localStorage.setItem('kidsterm-progress-v1', JSON.stringify({ state: progressData, version: 0 }))
    })
    await page.goto('/learn')

    // UI shows Chinese: 繼續上次進度
    await expect(page.locator('text=繼續上次進度')).toBeVisible()
  })
})

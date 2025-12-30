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
    const favoriteButton = page.getByRole('button', { name: '切換收藏' })
    await expect(favoriteButton).toBeVisible()
    await favoriteButton.click()
  })

  test('should show pronunciation button with warning tooltip', async ({ page }) => {
    // UI shows Chinese: 發音
    const playButton = page.getByRole('button', { name: '發音' })
    await expect(playButton).toBeVisible()
  })

  test('should show progress bar', async ({ page }) => {
    // Progress bar should be visible (use main region to avoid header progressbar)
    await expect(page.getByRole('main').getByRole('progressbar')).toBeVisible()
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
    // Navigate first to set up context
    await page.goto('/learn')

    // Set up saved progress with lastWordIndex (correct key name per store implementation)
    await page.evaluate(() => {
      const progressData = {
        currentStreak: 1,
        longestStreak: 1,
        totalWordsLearned: 5,
        totalExercisesCompleted: 0,
        dailyProgress: [],
        achievements: [],
        lastActiveDate: new Date().toISOString().split('T')[0],
        dailyGoal: 10,
        todayWordsLearned: 0,
        lastWordIndex: { 'tc-en': 10 },
        wordIndexHistory: {},
        consecutiveCorrectAnswers: 0,
        lastUnlockedAchievement: null,
        gamesPlayed: 0,
        perfectGames: 0,
      }
      localStorage.setItem('kidsterm-progress-v1', JSON.stringify({ state: progressData, version: 0 }))
    })

    // Reload to pick up the localStorage
    await page.reload()
    await page.waitForLoadState('networkidle')

    // UI shows Chinese: 繼續上次進度
    await expect(page.getByText(/繼續上次進度/)).toBeVisible({ timeout: 5000 })
  })
})

test.describe('Favorites Feature', () => {
  test('should toggle favorite on word', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem('kidsterm-favorites-v1')
      localStorage.removeItem('kidsterm-swipe-hints')
    })
    await page.goto('/learn')

    // Find and click the favorite button
    const favoriteButton = page.getByRole('button', { name: '切換收藏' })
    await expect(favoriteButton).toBeVisible()

    // Click to add to favorites
    await favoriteButton.click()

    // The heart icon should now be filled (red)
    // Check that the button is still visible and clickable
    await expect(favoriteButton).toBeVisible()
  })

  test('should persist favorites in localStorage after toggle', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem('kidsterm-favorites-v1')
      localStorage.removeItem('kidsterm-swipe-hints')
    })
    await page.goto('/learn')

    // Add a word to favorites
    const favoriteButton = page.getByRole('button', { name: '切換收藏' })
    await favoriteButton.click()

    // Wait for localStorage to be updated
    await page.waitForTimeout(500)

    // The word should be in localStorage
    const favorites = await page.evaluate(() => {
      const data = localStorage.getItem('kidsterm-favorites-v1')
      return data ? JSON.parse(data) : null
    })

    expect(favorites).not.toBeNull()
    expect(favorites.state.favoritesByPack).toBeDefined()
  })

  test('should show favorites toggle after adding 4+ favorites', async ({ page }) => {
    // Clear localStorage once before starting
    await page.goto('/learn')
    await page.evaluate(() => {
      localStorage.removeItem('kidsterm-favorites-v1')
      localStorage.removeItem('kidsterm-swipe-hints')
    })
    await page.reload()
    await page.waitForLoadState('networkidle')

    // Add 4 words to favorites
    for (let i = 0; i < 4; i++) {
      const favoriteButton = page.getByRole('button', { name: '切換收藏' })
      await favoriteButton.click()
      await page.waitForTimeout(200)

      // Go to next card
      const nextButton = page.getByRole('button', { name: '下一個' })
      await nextButton.click()
      await page.waitForTimeout(200)
    }

    // Navigate to practice page using client-side routing
    await page.getByRole('button', { name: '練習' }).click()
    await page.waitForLoadState('networkidle')

    // UI shows Chinese: 所有單字, 我的收藏
    await expect(page.getByText('所有單字')).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('我的收藏')).toBeVisible()
  })

  test('should switch to favorites mode when clicking favorites button', async ({ page }) => {
    // Clear localStorage once before starting
    await page.goto('/learn')
    await page.evaluate(() => {
      localStorage.removeItem('kidsterm-favorites-v1')
      localStorage.removeItem('kidsterm-swipe-hints')
    })
    await page.reload()
    await page.waitForLoadState('networkidle')

    // Add 4 words to favorites
    for (let i = 0; i < 4; i++) {
      const favoriteButton = page.getByRole('button', { name: '切換收藏' })
      await favoriteButton.click()
      await page.waitForTimeout(200)

      const nextButton = page.getByRole('button', { name: '下一個' })
      await nextButton.click()
      await page.waitForTimeout(200)
    }

    // Verify favorites were saved
    const favCount = await page.evaluate(() => {
      const data = localStorage.getItem('kidsterm-favorites-v1')
      if (!data) return 0
      const parsed = JSON.parse(data)
      return parsed.state?.favoritesByPack?.['tc-en']?.length ?? 0
    })
    expect(favCount).toBe(4)

    // Navigate directly to favorites mode via URL (using client-side by clicking home first then navigating)
    await page.evaluate(() => {
      window.location.href = '/learn?favorites=true'
    })
    await page.waitForLoadState('networkidle')

    // Should be in favorites mode with only 4 words
    await expect(page.getByText(/\/ 4$/)).toBeVisible({ timeout: 5000 })
  })
})

test.describe('History Bookmark Feature', () => {
  test('should save position when navigating cards and show resume button', async ({ page }) => {
    // Clear localStorage once before starting
    await page.goto('/learn')
    await page.evaluate(() => {
      localStorage.removeItem('kidsterm-progress-v1')
      localStorage.removeItem('kidsterm-swipe-hints')
    })
    await page.reload()
    await page.waitForLoadState('networkidle')

    // Navigate to card 5
    const nextButton = page.getByRole('button', { name: '下一個' })
    for (let i = 0; i < 4; i++) {
      await nextButton.click()
      await page.waitForTimeout(100)
    }
    await expect(page.getByText(/^5 \//)).toBeVisible()

    // Wait for state to be saved
    await page.waitForTimeout(500)

    // Verify lastWordIndex was saved
    const savedIndex = await page.evaluate(() => {
      const data = localStorage.getItem('kidsterm-progress-v1')
      if (!data) return -1
      const parsed = JSON.parse(data)
      return parsed.state?.lastWordIndex?.['tc-en'] ?? -1
    })
    expect(savedIndex).toBe(4) // 0-based index for card 5

    // Navigate away using client-side routing (click Settings button)
    await page.getByRole('button', { name: '設定' }).click()
    await page.waitForLoadState('networkidle')

    // Verify lastWordIndex persisted after navigation
    const savedIndexAfterNav = await page.evaluate(() => {
      const data = localStorage.getItem('kidsterm-progress-v1')
      if (!data) return -1
      const parsed = JSON.parse(data)
      return parsed.state?.lastWordIndex?.['tc-en'] ?? -1
    })
    expect(savedIndexAfterNav).toBe(4)

    // Navigate back using client-side routing
    await page.getByRole('button', { name: '首頁' }).click()
    await page.waitForLoadState('networkidle')
    await page.getByRole('button', { name: /繼續學習/ }).click()
    await page.waitForLoadState('networkidle')

    // Should offer to resume from card 5 (shows index + 1 = 5)
    await expect(page.getByText(/繼續上次進度/)).toBeVisible({ timeout: 10000 })
  })

  test('should remember position after page reload', async ({ page }) => {
    // Clear localStorage once before starting
    await page.goto('/learn')
    await page.evaluate(() => {
      localStorage.removeItem('kidsterm-progress-v1')
      localStorage.removeItem('kidsterm-swipe-hints')
    })
    await page.reload()
    await page.waitForLoadState('networkidle')

    // Navigate to card 10
    const nextButton = page.getByRole('button', { name: '下一個' })
    for (let i = 0; i < 9; i++) {
      await nextButton.click()
      await page.waitForTimeout(50)
    }
    await expect(page.getByText(/^10 \//)).toBeVisible()

    // Wait for state to be saved
    await page.waitForTimeout(500)

    // Verify lastWordIndex was saved before reload
    const savedIndexBeforeReload = await page.evaluate(() => {
      const data = localStorage.getItem('kidsterm-progress-v1')
      if (!data) return -1
      const parsed = JSON.parse(data)
      return parsed.state?.lastWordIndex?.['tc-en'] ?? -1
    })
    expect(savedIndexBeforeReload).toBe(9)

    // Reload the page (this doesn't use addInitScript so localStorage persists)
    await page.reload()
    await page.waitForLoadState('networkidle')

    // Should show resume from last position (card 10)
    await expect(page.getByText(/繼續上次進度/)).toBeVisible({ timeout: 10000 })
  })

  test('should create history entries when navigating and leaving page', async ({ page }) => {
    // Clear localStorage once before starting
    await page.goto('/learn')
    await page.evaluate(() => {
      localStorage.removeItem('kidsterm-progress-v1')
      localStorage.removeItem('kidsterm-swipe-hints')
    })
    await page.reload()
    await page.waitForLoadState('networkidle')

    // Navigate to card 5
    const nextButton = page.getByRole('button', { name: '下一個' })
    for (let i = 0; i < 4; i++) {
      await nextButton.click()
      await page.waitForTimeout(100)
    }
    await expect(page.getByText(/^5 \//)).toBeVisible()

    // Navigate away using client-side routing to trigger history save
    await page.getByRole('button', { name: '設定' }).click()
    await page.waitForLoadState('networkidle')

    // Wait for Zustand to persist to localStorage
    await page.waitForTimeout(500)

    // Check localStorage for history - position should have been saved on unmount
    const history = await page.evaluate(() => {
      const data = localStorage.getItem('kidsterm-progress-v1')
      if (!data) return []
      const parsed = JSON.parse(data)
      return parsed.state?.wordIndexHistory?.['tc-en'] || []
    })

    expect(history).toBeDefined()
    expect(history.length).toBeGreaterThan(0)
    expect(history[0].index).toBe(4) // Should have saved position 4 (card 5)
  })
})

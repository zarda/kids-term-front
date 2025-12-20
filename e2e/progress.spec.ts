import { test, expect } from '@playwright/test'

test.describe('Progress Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/progress')
  })

  test('should display progress heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Your Progress' })).toBeVisible()
  })

  test('should display streak stats', async ({ page }) => {
    await expect(page.locator('text=Current Streak')).toBeVisible()
    await expect(page.locator('text=Best Streak')).toBeVisible()
  })

  test('should display word stats', async ({ page }) => {
    await expect(page.locator('text=Words Learned')).toBeVisible()
    await expect(page.locator('text=Accuracy')).toBeVisible()
  })

  test('should display weekly activity chart', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Weekly Activity' })).toBeVisible()
  })

  test('should display achievements section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Achievements' })).toBeVisible()
    // Should show some achievement cards
    await expect(page.locator('text=Getting Started')).toBeVisible()
  })

  test('should display all-time stats', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'All-Time Stats' })).toBeVisible()
    await expect(page.locator('text=Total Exercises')).toBeVisible()
    await expect(page.locator('text=Time Spent')).toBeVisible()
  })
})

import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load the home page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Welcome back!' })).toBeVisible()
  })

  test('should navigate to practice page', async ({ page }) => {
    await page.getByRole('button', { name: 'Practice' }).click()
    await expect(page.getByRole('heading', { name: 'Practice Mode' })).toBeVisible()
  })

  test('should navigate to progress page', async ({ page }) => {
    await page.getByRole('button', { name: 'Progress' }).click()
    await expect(page.getByRole('heading', { name: 'Your Progress' })).toBeVisible()
  })

  test('should navigate to settings page', async ({ page }) => {
    await page.getByRole('button', { name: 'Settings' }).click()
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible()
  })

  test('should open flashcards from the home continue button', async ({ page }) => {
    await page
      .getByRole('button', { name: /Continue Learning|繼續學習|学習を続ける/i })
      .click()
    await expect(page).toHaveURL(/\/learn\/flashcards/)
  })
})

test.describe('Theme Toggle', () => {
  test('should toggle dark mode', async ({ page }) => {
    await page.goto('/')
    const toggleButton = page.getByRole('button', { name: 'Toggle color mode' })
    await toggleButton.click()
    // Verify the color mode changed (body background changes)
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(20, 20, 20)')
  })
})

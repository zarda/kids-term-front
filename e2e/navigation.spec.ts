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

  test('should navigate to learn page from home', async ({ page }) => {
    await page.getByRole('button', { name: /Learn Words/i }).click()
    await expect(page.locator('text=Card 1 of')).toBeVisible()
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

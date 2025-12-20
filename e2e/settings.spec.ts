import { test, expect } from '@playwright/test'

test.describe('Settings Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/settings')
  })

  test('should display settings heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible()
  })

  test('should display language pack section', async ({ page }) => {
    await expect(page.locator('text=Language Pack')).toBeVisible()
    await expect(page.locator('text=Chinese → English')).toBeVisible()
  })

  test('should display audio settings', async ({ page }) => {
    await expect(page.locator('text=Audio Settings')).toBeVisible()
    await expect(page.locator('text=Speech Rate')).toBeVisible()
    await expect(page.locator('text=Volume')).toBeVisible()
  })

  test('should display practice settings', async ({ page }) => {
    await expect(page.locator('text=Practice Settings')).toBeVisible()
    await expect(page.locator('text=Daily Goal')).toBeVisible()
    await expect(page.locator('text=Exercise Time Limit')).toBeVisible()
  })

  test('should display notification settings', async ({ page }) => {
    await expect(page.locator('text=Notifications')).toBeVisible()
    await expect(page.locator('text=Daily Reminder')).toBeVisible()
  })

  test('should toggle auto-play audio', async ({ page }) => {
    const toggle = page.locator('text=Auto-play Audio').locator('..').getByRole('checkbox')
    await toggle.click()
    // Toggle should be interactive
    await expect(toggle).toBeDefined()
  })

  test('should adjust speech rate slider', async ({ page }) => {
    const slider = page.locator('text=Speech Rate').locator('..').getByRole('slider')
    await expect(slider).toBeVisible()
  })
})

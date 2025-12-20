import { test, expect } from '@playwright/test'

test.describe('Word Learning', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/learn')
  })

  test('should display flashcard with word', async ({ page }) => {
    await expect(page.locator('text=Card 1 of')).toBeVisible()
    await expect(page.locator('text=Tap to reveal')).toBeVisible()
  })

  test('should flip card on click', async ({ page }) => {
    // Click the card to flip
    await page.locator('text=Tap to reveal').click()
    // After flipping, the definition should be visible
    await expect(page.locator('text=Hello')).toBeVisible()
  })

  test('should navigate to next card', async ({ page }) => {
    const nextButton = page.getByRole('button', { name: 'Next' })
    await nextButton.click()
    await expect(page.locator('text=Card 2 of')).toBeVisible()
  })

  test('should toggle favorite', async ({ page }) => {
    const favoriteButton = page.getByRole('button', { name: 'Toggle favorite' })
    await favoriteButton.click()
    // Button should change to filled state
    await expect(favoriteButton).toHaveAttribute('data-active', '')
  })

  test('should play pronunciation', async ({ page }) => {
    const playButton = page.getByRole('button', { name: 'Play pronunciation' })
    await expect(playButton).toBeVisible()
    // Click should not throw error (audio may not work in test)
    await playButton.click()
  })

  test('should show mastery level', async ({ page }) => {
    await expect(page.locator('text=Mastery Level')).toBeVisible()
    await expect(page.locator('text=0%')).toBeVisible()
  })
})

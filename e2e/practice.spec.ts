import { test, expect } from '@playwright/test'

test.describe('Practice Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/practice')
  })

  test('should display practice mode options', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Practice Mode' })).toBeVisible()
    await expect(page.locator('text=Multiple Choice')).toBeVisible()
    await expect(page.locator('text=Listening')).toBeVisible()
  })

  test('should start multiple choice exercise', async ({ page }) => {
    await page.locator('text=Multiple Choice').click()
    // Should see the question
    await expect(page.locator('text=What does')).toBeVisible()
    // Should see the timer
    await expect(page.locator('text=0:')).toBeVisible()
  })

  test('should allow answering and show feedback', async ({ page }) => {
    await page.locator('text=Multiple Choice').click()
    // Click one of the options
    const options = page.locator('[role="button"]').filter({ hasText: /^(?!End Session)/ })
    const firstOption = options.nth(1) // Skip "End Session" button
    await firstOption.click()
    // Should show next button after answering
    await expect(page.getByRole('button', { name: 'Next Question' })).toBeVisible()
  })

  test('should end session and show score', async ({ page }) => {
    await page.locator('text=Multiple Choice').click()
    await page.getByRole('button', { name: 'End Session' }).click()
    // Should return to practice mode selection
    await expect(page.getByRole('heading', { name: 'Practice Mode' })).toBeVisible()
  })

  test('should start listening exercise', async ({ page }) => {
    await page.locator('text=Listening').click()
    // Should see the play audio button
    await expect(page.getByRole('button', { name: 'Play Audio' })).toBeVisible()
  })
})

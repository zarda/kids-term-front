import { test, expect } from '@playwright/test'

/**
 * Smoke coverage for the Learn hub and each learning-method route. Assertions
 * are locale-agnostic (URL + the `main` landmark) with a bilingual check on the
 * hub heading, since the UI language follows the active language pack.
 */

const methodRoutes = [
  '/learn/flashcards',
  '/learn/srs',
  '/learn/typing',
  '/learn/context',
]

test.describe('Learn hub', () => {
  test('hub lists the learning methods', async ({ page }) => {
    await page.goto('/learn')
    await expect(page).toHaveURL(/\/learn$/)
    await expect(
      page.getByRole('heading', { name: /Learn New Words|學習新單字|新しい単語を学ぶ/ })
    ).toBeVisible()
    await expect(page.getByRole('main')).toBeVisible()
  })

  for (const route of methodRoutes) {
    test(`renders ${route} without crashing`, async ({ page }) => {
      await page.goto(route)
      await expect(page).toHaveURL(new RegExp(route.replace(/\//g, '\\/') + '$'))
      await expect(page.getByRole('main')).toBeVisible()
    })
  }
})

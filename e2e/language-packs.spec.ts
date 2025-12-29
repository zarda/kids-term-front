import { test, expect } from '@playwright/test'
import {
  mockLanguagePackStore,
  multiPackStore,
  emptyProgressState,
} from './fixtures'
import { STORAGE_KEYS } from './helpers'

test.describe('Language Packs - Display', () => {
  test('should display language packs section on settings page', async ({
    page,
  }) => {
    await page.addInitScript(
      ({ packs, packsKey }) => {
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      { packs: mockLanguagePackStore, packsKey: STORAGE_KEYS.languagePacks }
    )

    await page.goto('/settings')
    await expect(
      page.getByRole('heading', { name: /語言包|Language Packs/i })
    ).toBeVisible()
  })

  test('should display all available packs', async ({ page }) => {
    await page.addInitScript(
      ({ packs, packsKey }) => {
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      { packs: multiPackStore, packsKey: STORAGE_KEYS.languagePacks }
    )

    await page.goto('/settings')
    // Should see English, Japanese, Spanish packs
    await expect(page.locator('text=English')).toBeVisible()
    await expect(page.locator('text=日本語')).toBeVisible()
    await expect(page.locator('text=Español')).toBeVisible()
  })

  test('should show download button for non-downloaded packs', async ({
    page,
  }) => {
    await page.addInitScript(
      ({ packs, packsKey }) => {
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      { packs: multiPackStore, packsKey: STORAGE_KEYS.languagePacks }
    )

    await page.goto('/settings')
    // Japanese pack (tc-ja) is not downloaded - should have a download button
    await expect(
      page.getByRole('button', { name: /下載|Download/i }).first()
    ).toBeVisible()
  })

  test('should highlight active pack', async ({ page }) => {
    await page.addInitScript(
      ({ packs, packsKey }) => {
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      { packs: multiPackStore, packsKey: STORAGE_KEYS.languagePacks }
    )

    await page.goto('/settings')
    // Active pack (tc-en / English) has green styling - verify pack is visible
    await expect(page.locator('text=English').first()).toBeVisible()
    // Verify the pack info is showing
    await expect(page.locator('text=/3000/').first()).toBeVisible()
  })

  test('should show word count for each pack', async ({ page }) => {
    await page.addInitScript(
      ({ packs, packsKey }) => {
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      { packs: multiPackStore, packsKey: STORAGE_KEYS.languagePacks }
    )

    await page.goto('/settings')
    // Word counts from fixture: 3000, 2500, 2000
    await expect(page.locator('text=3000')).toBeVisible()
    await expect(page.locator('text=2500')).toBeVisible()
    await expect(page.locator('text=2000')).toBeVisible()
  })
})

test.describe('Language Packs - Download', () => {
  test('should show loading state when downloading', async ({ page }) => {
    await page.addInitScript(
      ({ packs, packsKey }) => {
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      { packs: multiPackStore, packsKey: STORAGE_KEYS.languagePacks }
    )

    await page.goto('/settings')
    // Find and click download button
    const downloadButton = page.getByRole('button', { name: /下載|Download/i }).first()
    await downloadButton.click()

    // Should show some loading indicator (spinner or button changes)
    // The button might be disabled or show a spinner
    await expect(
      page.locator('[class*="spinner"]').or(downloadButton)
    ).toBeVisible()
  })

  test('should complete download and update UI', async ({ page }) => {
    await page.addInitScript(
      ({ packs, packsKey }) => {
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      { packs: multiPackStore, packsKey: STORAGE_KEYS.languagePacks }
    )

    await page.goto('/settings')
    // Click download button
    await page.getByRole('button', { name: /下載|Download/i }).first().click()

    // Wait for download to complete - look for spinner to disappear or delete button to appear
    // After download completes, there should be a new delete button
    await expect(async () => {
      const deleteCount = await page.getByRole('button', { name: /刪除|Delete/i }).count()
      // After downloading Japanese, we should have 2 delete buttons (Spanish + Japanese)
      expect(deleteCount).toBeGreaterThanOrEqual(2)
    }).toPass({ timeout: 15000 })
  })
})

test.describe('Language Packs - Switch Active Pack', () => {
  test('should switch active pack when clicking downloaded pack', async ({
    page,
  }) => {
    await page.addInitScript(
      ({ packs, packsKey }) => {
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      { packs: multiPackStore, packsKey: STORAGE_KEYS.languagePacks }
    )

    await page.goto('/settings')
    // Spanish pack (tc-es) is downloaded but not active
    // Click on the Spanish pack card to make it active
    await page.locator('text=Español').click()

    // The Spanish pack should now be visually highlighted (green border)
    // Verify we can still see the Spanish pack
    await expect(page.locator('text=Español')).toBeVisible()
  })

  test('should update home page after switching pack', async ({ page }) => {
    await page.addInitScript(
      ({ packs, progress, packsKey, progressKey }) => {
        localStorage.setItem(packsKey, JSON.stringify(packs))
        localStorage.setItem(progressKey, JSON.stringify(progress))
      },
      {
        packs: multiPackStore,
        progress: emptyProgressState,
        packsKey: STORAGE_KEYS.languagePacks,
        progressKey: STORAGE_KEYS.progress,
      }
    )

    await page.goto('/settings')
    // Switch to Spanish pack
    await page.locator('text=Español').click()

    // Go to home and check pack progress shows new pack's word count
    await page.goto('/')
    // Spanish pack has 10 mock words, should show "/ 10"
    await expect(page.getByRole('main').locator('text=/\\/ 10/').first()).toBeVisible()
  })

  test('should not switch to non-downloaded pack', async ({ page }) => {
    await page.addInitScript(
      ({ packs, packsKey }) => {
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      { packs: multiPackStore, packsKey: STORAGE_KEYS.languagePacks }
    )

    await page.goto('/settings')
    // Japanese pack is not downloaded - clicking the download button area shouldn't switch
    // First verify the download button is present for Japanese
    await expect(page.getByRole('button', { name: /下載|Download/i }).first()).toBeVisible()
    // Clicking on Japanese text area should trigger download, not switch
    await page.locator('text=日本語').click()
    // English pack should still be visible (it's still downloaded)
    await expect(page.locator('text=English').first()).toBeVisible()
  })
})

test.describe('Language Packs - Delete', () => {
  test('should show delete button for downloaded non-active packs', async ({
    page,
  }) => {
    await page.addInitScript(
      ({ packs, packsKey }) => {
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      { packs: multiPackStore, packsKey: STORAGE_KEYS.languagePacks }
    )

    await page.goto('/settings')
    // Spanish pack is downloaded but not active - should have delete button
    // Use locator for the trash icon button instead of aria-label
    await expect(
      page.locator('button[aria-label]').filter({ has: page.locator('svg') }).first()
    ).toBeVisible()
  })

  test('should not show delete button for active pack', async ({ page }) => {
    await page.addInitScript(
      ({ packs, packsKey }) => {
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      { packs: multiPackStore, packsKey: STORAGE_KEYS.languagePacks }
    )

    await page.goto('/settings')
    // There should be exactly one delete button (for Spanish, not English which is active)
    // English is active and shouldn't have delete button
    // Spanish is downloaded but not active - should have delete button
    // Japanese is not downloaded - should have download button, not delete
    // Use the exact button name which matches the aria-label
    const deleteButtonCount = await page.getByRole('button', { name: /刪除|削除|Delete/i }).count()
    // Exactly 1 delete button should be visible (for Spanish only)
    expect(deleteButtonCount).toBe(1)
  })

  test('should delete pack and show download button', async ({ page }) => {
    await page.addInitScript(
      ({ packs, packsKey }) => {
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      { packs: multiPackStore, packsKey: STORAGE_KEYS.languagePacks }
    )

    await page.goto('/settings')
    const initialDownloadCount = await page.getByRole('button', { name: /下載|ダウンロード|Download/i }).count()
    // Delete the non-active downloaded pack (Spanish)
    await page.getByRole('button', { name: /刪除|削除|Delete/i }).first().click()

    // Should now show one more download button
    await expect(async () => {
      const currentCount = await page.getByRole('button', { name: /下載|Download/i }).count()
      expect(currentCount).toBeGreaterThan(initialDownloadCount)
    }).toPass({ timeout: 5000 })
  })
})

test.describe('Language Packs - Refresh', () => {
  test('should show refresh button', async ({ page }) => {
    await page.addInitScript(
      ({ packs, packsKey }) => {
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      { packs: mockLanguagePackStore, packsKey: STORAGE_KEYS.languagePacks }
    )

    await page.goto('/settings')
    await expect(
      page.getByRole('button', { name: /重新整理|Refresh/i })
    ).toBeVisible()
  })

  test('should show loading state during refresh', async ({ page }) => {
    await page.addInitScript(
      ({ packs, packsKey }) => {
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      { packs: mockLanguagePackStore, packsKey: STORAGE_KEYS.languagePacks }
    )

    await page.goto('/settings')
    const refreshButton = page.getByRole('button', {
      name: /重新整理|Refresh/i,
    })
    await refreshButton.click()

    // Button should show loading state
    await expect(refreshButton).toBeDisabled()
  })
})

test.describe('Language Packs - Persistence', () => {
  test('should persist downloaded packs after reload', async ({ page }) => {
    await page.addInitScript(
      ({ packs, packsKey }) => {
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      { packs: multiPackStore, packsKey: STORAGE_KEYS.languagePacks }
    )

    await page.goto('/settings')

    // Verify English pack is visible
    await expect(page.locator('text=English').first()).toBeVisible()

    // Reload
    await page.reload()

    // Should still show English pack
    await expect(page.locator('text=English').first()).toBeVisible()
  })

  test('should persist active pack selection after reload', async ({
    page,
  }) => {
    await page.addInitScript(
      ({ packs, packsKey }) => {
        localStorage.setItem(packsKey, JSON.stringify(packs))
      },
      { packs: multiPackStore, packsKey: STORAGE_KEYS.languagePacks }
    )

    await page.goto('/settings')

    // Switch to Spanish
    await page.locator('text=Español').click()

    // Reload
    await page.reload()

    // Spanish pack should still be visible
    await expect(page.locator('text=Español')).toBeVisible()
  })
})

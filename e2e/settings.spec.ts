import { test, expect } from '@playwright/test'

test.describe('Settings Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/settings')
  })

  test('should display settings heading', async ({ page }) => {
    // UI shows Chinese text: 設定
    await expect(page.getByRole('heading', { name: '設定' })).toBeVisible()
  })

  test('should display language pack section', async ({ page }) => {
    // UI shows Chinese: 語言包
    await expect(page.getByRole('heading', { name: '語言包' })).toBeVisible()
    // Check for default language pack
    await expect(page.locator('text=英文 (繁體中文)')).toBeVisible()
  })

  test('should display audio settings', async ({ page }) => {
    // UI shows Chinese: 音訊, 語速, 音量
    await expect(page.getByRole('heading', { name: '音訊' })).toBeVisible()
    await expect(page.locator('text=語速')).toBeVisible()
    await expect(page.locator('text=音量')).toBeVisible()
  })

  test('should display learning settings', async ({ page }) => {
    // UI shows Chinese: 學習, 每日目標, 練習時間限制
    await expect(page.getByRole('heading', { name: '學習' })).toBeVisible()
    await expect(page.locator('text=每日目標')).toBeVisible()
    await expect(page.locator('text=練習時間限制')).toBeVisible()
  })

  test('should display notification settings', async ({ page }) => {
    // UI shows Chinese: 通知, 每日提醒
    await expect(page.getByRole('heading', { name: '通知' })).toBeVisible()
    await expect(page.locator('text=每日提醒')).toBeVisible()
  })

  test('should toggle auto-play audio', async ({ page }) => {
    // UI shows Chinese: 自動播放發音
    // Use the label to click since Chakra Switch label intercepts pointer events
    const toggleLabel = page.locator('label').filter({ has: page.getByRole('checkbox', { name: '自動播放發音' }) })
    const checkbox = page.getByRole('checkbox', { name: '自動播放發音' })
    await expect(checkbox).toBeVisible()
    const wasChecked = await checkbox.isChecked()
    await toggleLabel.click()
    // Toggle should change state
    await expect(checkbox).toBeChecked({ checked: !wasChecked })
  })

  test('should adjust speech rate slider', async ({ page }) => {
    // UI shows Chinese: 語速
    const slider = page.locator('text=語速').locator('..').locator('..').getByRole('slider')
    await expect(slider).toBeVisible()
  })
})

test.describe('Notification Settings', () => {
  test.beforeEach(async ({ page, context }) => {
    // Grant notification permission before navigating
    await context.grantPermissions(['notifications'])
    // Mock Notification.permission to return 'granted'
    await page.addInitScript(() => {
      Object.defineProperty(Notification, 'permission', {
        get: () => 'granted',
        configurable: true,
      })
    })
    await page.goto('/settings')
  })

  test('should display notification section with permission status', async ({ page }) => {
    // UI shows Chinese: 通知, 已啟用
    await expect(page.getByRole('heading', { name: '通知' })).toBeVisible()
    // Should show "已啟用" (Enabled) badge when permission is granted
    await expect(page.locator('text=已啟用')).toBeVisible()
  })

  test('should display daily reminders toggle', async ({ page }) => {
    // UI shows Chinese: 每日提醒
    await expect(page.locator('text=每日提醒')).toBeVisible()
    const toggle = page.getByRole('checkbox', { name: '每日提醒' })
    await expect(toggle).toBeVisible()
    await expect(toggle).not.toBeDisabled()
  })

  test('should show reminder time picker when notifications enabled', async ({ page }) => {
    // UI shows Chinese: 每日提醒, 提醒時間
    const toggleLabel = page.locator('label').filter({ has: page.getByRole('checkbox', { name: '每日提醒' }) })
    const toggle = page.getByRole('checkbox', { name: '每日提醒' })
    const isChecked = await toggle.isChecked()

    if (!isChecked) {
      await toggleLabel.click()
    }

    // Should show time picker (提醒時間)
    await expect(page.locator('text=提醒時間')).toBeVisible()
    await expect(page.locator('input[type="time"]')).toBeVisible()
  })

  test('should show test notification button when enabled', async ({ page }) => {
    // UI shows Chinese: 測試通知
    const toggleLabel = page.locator('label').filter({ has: page.getByRole('checkbox', { name: '每日提醒' }) })
    const toggle = page.getByRole('checkbox', { name: '每日提醒' })
    const isChecked = await toggle.isChecked()

    if (!isChecked) {
      await toggleLabel.click()
    }

    await expect(page.getByRole('button', { name: '測試通知' })).toBeVisible()
  })

  test('should allow changing reminder time', async ({ page }) => {
    const toggleLabel = page.locator('label').filter({ has: page.getByRole('checkbox', { name: '每日提醒' }) })
    const toggle = page.getByRole('checkbox', { name: '每日提醒' })
    const isChecked = await toggle.isChecked()

    if (!isChecked) {
      await toggleLabel.click()
    }

    const timeInput = page.locator('input[type="time"]')
    await timeInput.fill('18:30')

    await expect(timeInput).toHaveValue('18:30')
  })

  test('should hide time picker and test button when notifications disabled', async ({ page }) => {
    // First ensure toggle is on
    const toggleLabel = page.locator('label').filter({ has: page.getByRole('checkbox', { name: '每日提醒' }) })
    const toggle = page.getByRole('checkbox', { name: '每日提醒' })
    const isChecked = await toggle.isChecked()

    if (!isChecked) {
      await toggleLabel.click()
    }

    // Verify time picker is visible
    await expect(page.locator('input[type="time"]')).toBeVisible()

    // Now disable notifications
    await toggleLabel.click()

    // Time picker and test button should be hidden
    await expect(page.locator('input[type="time"]')).not.toBeVisible()
    await expect(page.getByRole('button', { name: '測試通知' })).not.toBeVisible()
  })

  test('should persist notification settings after page reload', async ({ page }) => {
    // Ensure toggle is on and set a specific time
    const toggleLabel = page.locator('label').filter({ has: page.getByRole('checkbox', { name: '每日提醒' }) })
    const toggle = page.getByRole('checkbox', { name: '每日提醒' })
    const isChecked = await toggle.isChecked()

    if (!isChecked) {
      await toggleLabel.click()
    }

    const timeInput = page.locator('input[type="time"]')
    await timeInput.fill('20:00')

    // Reload the page
    await page.reload()

    // Settings should persist
    await expect(page.locator('input[type="time"]')).toHaveValue('20:00')
  })
})

test.describe('Notification Settings - Permission Denied', () => {
  test('should show blocked status when permission denied', async ({ page, context }) => {
    // Deny notification permission
    await context.clearPermissions()

    await page.goto('/settings')

    // UI shows Chinese: 每日提醒
    // The switch should be disabled when permission is not granted
    const toggle = page.getByRole('checkbox', { name: '每日提醒' })
    await expect(toggle).toBeDisabled()
  })
})

test.describe('Clear All Data', () => {
  test('should display danger zone section', async ({ page }) => {
    await page.goto('/settings')
    // UI shows Chinese: 危險區域, 清除所有資料
    await expect(page.getByRole('heading', { name: '危險區域' })).toBeVisible()
    await expect(page.getByRole('button', { name: '清除所有資料' })).toBeVisible()
  })

  test('should show confirmation dialog when clicking clear all data', async ({ page }) => {
    await page.goto('/settings')
    await page.getByRole('button', { name: '清除所有資料' }).click()
    // UI shows Chinese: 確定要執行嗎？此操作無法復原。
    await expect(page.locator('text=確定要執行嗎？此操作無法復原。')).toBeVisible()
  })

  test('should clear all localStorage keys including swipe hints', async ({ page }) => {
    await page.goto('/settings')

    // Set up some localStorage data
    await page.evaluate(() => {
      localStorage.setItem('kidsterm-settings-v1', JSON.stringify({ test: true }))
      localStorage.setItem('kidsterm-language-packs-v1', JSON.stringify({ test: true }))
      localStorage.setItem('kidsterm-progress-v1', JSON.stringify({ test: true }))
      localStorage.setItem('kidsterm-swipe-hints', JSON.stringify({ date: '2025-12-25', swipeCount: 3 }))
    })

    // Click clear all data
    await page.getByRole('button', { name: '清除所有資料' }).click()
    // Confirm in dialog
    await page.getByRole('button', { name: '刪除' }).click()

    // Page should reload, so wait for navigation
    await page.waitForLoadState('networkidle')

    // Verify localStorage is cleared
    const remainingKeys = await page.evaluate(() => {
      return {
        settings: localStorage.getItem('kidsterm-settings-v1'),
        packs: localStorage.getItem('kidsterm-language-packs-v1'),
        progress: localStorage.getItem('kidsterm-progress-v1'),
        swipeHints: localStorage.getItem('kidsterm-swipe-hints'),
      }
    })

    expect(remainingKeys.settings).toBeNull()
    expect(remainingKeys.packs).toBeNull()
    expect(remainingKeys.progress).toBeNull()
    expect(remainingKeys.swipeHints).toBeNull()
  })
})

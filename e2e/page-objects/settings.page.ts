/**
 * Settings Page Object
 * Provides locators and methods for interacting with the settings page
 */

import { Page, Locator } from '@playwright/test'

export class SettingsPage {
  readonly page: Page

  // Page heading
  readonly heading: Locator

  // Language Packs section
  readonly languagePacksHeading: Locator
  readonly refreshButton: Locator

  // Audio section
  readonly audioHeading: Locator
  readonly speechRateSlider: Locator
  readonly volumeSlider: Locator

  // Learning section
  readonly learningHeading: Locator
  readonly dailyGoalSlider: Locator
  readonly timeLimitSlider: Locator

  // Notifications section
  readonly notificationsHeading: Locator
  readonly notificationToggle: Locator

  // Danger zone
  readonly clearDataButton: Locator

  constructor(page: Page) {
    this.page = page

    // Heading - bilingual
    this.heading = page.getByRole('heading', { name: /設定|Settings/i })

    // Language packs
    this.languagePacksHeading = page.getByRole('heading', {
      name: /語言包|Language Packs/i,
    })
    this.refreshButton = page.getByRole('button', {
      name: /重新整理|Refresh/i,
    })

    // Audio
    this.audioHeading = page.getByRole('heading', { name: /音訊|Audio/i })
    this.speechRateSlider = page.locator('text=/語速|Speech Rate/i')
    this.volumeSlider = page.locator('text=/音量|Volume/i')

    // Learning
    this.learningHeading = page.getByRole('heading', {
      name: /學習設定|Learning/i,
    })
    this.dailyGoalSlider = page.locator('text=/每日目標|Daily Goal/i')
    this.timeLimitSlider = page.locator('text=/練習時間|Time Limit/i')

    // Notifications
    this.notificationsHeading = page.getByRole('heading', {
      name: /通知|Notifications/i,
    })
    this.notificationToggle = page.locator('text=/每日提醒|Daily Reminder/i')

    // Danger zone
    this.clearDataButton = page.getByRole('button', {
      name: /清除所有資料|Clear All Data/i,
    })
  }

  async goto(): Promise<void> {
    await this.page.goto('/settings')
  }

  /**
   * Get all language pack cards on the page
   */
  getPackCards(): Locator {
    // Pack cards contain flag emojis and pack names
    return this.page.locator('[class*="chakra-card"]').filter({
      has: this.page.locator('text=/🇺🇸|🇯🇵|🇪🇸|🇫🇷|🇩🇪|🇮🇹|🇵🇹|🇰🇷|🇹🇼/'),
    })
  }

  /**
   * Get a specific pack card by name
   */
  getPackCard(packName: string): Locator {
    return this.page.locator('[class*="chakra-card"]').filter({
      hasText: packName,
    })
  }

  /**
   * Click download button for a pack
   */
  async downloadPack(packName: string): Promise<void> {
    const card = this.getPackCard(packName)
    await card.getByRole('button', { name: /下載|Download/i }).click()
  }

  /**
   * Click delete button for a pack
   */
  async deletePack(packName: string): Promise<void> {
    const card = this.getPackCard(packName)
    await card.getByRole('button', { name: /刪除|Delete/i }).click()
  }

  /**
   * Click a pack card to make it active
   */
  async selectPack(packName: string): Promise<void> {
    const card = this.getPackCard(packName)
    await card.click()
  }
}

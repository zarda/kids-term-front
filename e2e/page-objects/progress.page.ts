/**
 * Progress Page Object
 * Provides locators and methods for interacting with the progress page
 */

import { Page, Locator } from '@playwright/test'

export class ProgressPage {
  readonly page: Page

  // Page heading
  readonly heading: Locator

  // Stats section
  readonly currentStreakStat: Locator
  readonly longestStreakStat: Locator
  readonly wordsLearnedStat: Locator
  readonly accuracyStat: Locator

  // Weekly chart
  readonly weeklyChart: Locator

  // Achievements section
  readonly achievementsHeading: Locator
  readonly achievementCount: Locator

  constructor(page: Page) {
    this.page = page

    // Heading - bilingual support
    this.heading = page.getByRole('heading', {
      name: /你的進度|Your Progress/i,
    })

    // Stats - bilingual
    this.currentStreakStat = page.locator('text=/目前連續|Current Streak/i')
    this.longestStreakStat = page.locator('text=/最長連續|Longest Streak/i')
    this.wordsLearnedStat = page.locator('text=/已學單字|Words Learned/i')
    this.accuracyStat = page.locator('text=/正確率|Accuracy/i')

    // Weekly chart
    this.weeklyChart = page.locator('text=/每週進度|Weekly Progress/i')

    // Achievements
    this.achievementsHeading = page.getByRole('heading', {
      name: /成就|Achievements/i,
    })
    // Count display like "3 / 78"
    this.achievementCount = page.locator('text=/\\d+ \\/ \\d+/')
  }

  async goto(): Promise<void> {
    await this.page.goto('/progress')
  }

  async getCurrentStreakValue(): Promise<string | null> {
    // Find the stat card with Current Streak and get its number
    const card = this.currentStreakStat.locator('..').locator('..')
    const value = card.locator('text=/\\d+/')
    return value.first().textContent()
  }

  async getLongestStreakValue(): Promise<string | null> {
    const card = this.longestStreakStat.locator('..').locator('..')
    const value = card.locator('text=/\\d+/')
    return value.first().textContent()
  }

  async getUnlockedAchievementCount(): Promise<number> {
    const countText = await this.achievementCount.textContent()
    if (!countText) return 0
    const match = countText.match(/(\d+)\s*\//)
    return match ? parseInt(match[1], 10) : 0
  }
}

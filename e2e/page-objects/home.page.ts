/**
 * Home Page Object
 * Provides locators and methods for interacting with the home page
 */

import { Page, Locator } from '@playwright/test'

export class HomePage {
  readonly page: Page

  // Welcome section
  readonly welcomeHeading: Locator
  readonly todayProgressText: Locator

  // Daily goal card
  readonly dailyGoalLabel: Locator
  readonly dailyGoalProgress: Locator
  readonly progressBar: Locator
  readonly doneText: Locator

  // Stats cards
  readonly streakStat: Locator
  readonly wordsLearnedStat: Locator
  readonly packProgressStat: Locator
  readonly achievementsStat: Locator

  // Action buttons
  readonly continueButton: Locator
  readonly practiceButton: Locator

  constructor(page: Page) {
    this.page = page

    // Welcome section - bilingual support
    this.welcomeHeading = page.getByRole('heading', {
      name: /歡迎回來|Welcome back/i,
    })
    this.todayProgressText = page.locator('text=/今日進度|today/i')

    // Daily goal card
    this.dailyGoalLabel = page.locator('text=/每日目標|Daily Goal/i')
    this.dailyGoalProgress = page.locator('text=/\\d+ \\/ \\d+ 個單字/')
    this.progressBar = page.locator('[role="progressbar"]')
    this.doneText = page.locator('text=/完成|done/i')

    // Stats - use the labels that appear in stat cards
    this.streakStat = page.locator('text=/連續學習|Streak/i')
    this.wordsLearnedStat = page.locator('text=/已學單字|Words Learned/i')
    this.packProgressStat = page.locator('text=/課程進度|Pack Progress/i')
    this.achievementsStat = page.locator('text=/成就|Achievements/i')

    // Action buttons
    this.continueButton = page.getByRole('button', {
      name: /繼續學習|Continue Learning/i,
    })
    this.practiceButton = page.getByRole('button', {
      name: /開始練習|Start Practice/i,
    })
  }

  async goto(): Promise<void> {
    await this.page.goto('/')
  }

  async navigateToLearn(): Promise<void> {
    await this.continueButton.click()
  }

  async navigateToPractice(): Promise<void> {
    await this.practiceButton.click()
  }

  async getStreakValue(): Promise<string> {
    // Get the StatNumber text near the streak label
    const statCard = this.streakStat.locator('..').locator('..')
    const statNumber = statCard.locator('[class*="chakra-stat__number"]')
    return (await statNumber.textContent()) || '0'
  }

  async getWordsLearnedValue(): Promise<string> {
    const statCard = this.wordsLearnedStat.locator('..').locator('..')
    const statNumber = statCard.locator('[class*="chakra-stat__number"]')
    return (await statNumber.textContent()) || '0'
  }

  async getAchievementCount(): Promise<string> {
    const statCard = this.achievementsStat.locator('..').locator('..')
    const statNumber = statCard.locator('[class*="chakra-stat__number"]')
    return (await statNumber.textContent()) || '0'
  }

  async isDailyGoalCompleted(): Promise<boolean> {
    return this.doneText.isVisible()
  }
}

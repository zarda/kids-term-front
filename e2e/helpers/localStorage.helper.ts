/**
 * localStorage helper utilities for E2E tests
 * Provides type-safe methods to set up and read localStorage state
 */

import { Page } from '@playwright/test'
import type { ProgressStateFixture } from '../fixtures/progress.fixture'
import type { LanguagePackStateFixture } from '../fixtures/language-pack.fixture'

/**
 * Storage keys used by the application
 */
export const STORAGE_KEYS = {
  progress: 'kidsterm-progress-v1',
  languagePacks: 'kidsterm-language-packs-v1',
  settings: 'kidsterm-settings-v1',
  swipeHints: 'kidsterm-swipe-hints',
} as const

/**
 * Set up localStorage state before page navigation
 * Must be called before page.goto()
 */
export async function setLocalStorageState(
  page: Page,
  key: string,
  state: unknown
): Promise<void> {
  await page.addInitScript(
    ({ key, state }) => {
      localStorage.setItem(key, JSON.stringify(state))
    },
    { key, state }
  )
}

/**
 * Get localStorage state from the page
 * Must be called after page has loaded
 */
export async function getLocalStorageState<T>(
  page: Page,
  key: string
): Promise<T | null> {
  return page.evaluate((key) => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  }, key)
}

/**
 * Clear all localStorage
 */
export async function clearAllLocalStorage(page: Page): Promise<void> {
  await page.evaluate(() => {
    localStorage.clear()
  })
}

/**
 * Set up progress state before navigation
 */
export async function setupProgressState(
  page: Page,
  state: ProgressStateFixture
): Promise<void> {
  await setLocalStorageState(page, STORAGE_KEYS.progress, state)
}

/**
 * Set up language pack state before navigation
 */
export async function setupLanguagePackState(
  page: Page,
  state: LanguagePackStateFixture
): Promise<void> {
  await setLocalStorageState(page, STORAGE_KEYS.languagePacks, state)
}

/**
 * Set up both progress and language pack state
 * Convenience method for common test setup
 */
export async function setupFullState(
  page: Page,
  progressState: ProgressStateFixture,
  languagePackState: LanguagePackStateFixture
): Promise<void> {
  await page.addInitScript(
    ({ progress, packs, progressKey, packsKey }) => {
      localStorage.setItem(progressKey, JSON.stringify(progress))
      localStorage.setItem(packsKey, JSON.stringify(packs))
    },
    {
      progress: progressState,
      packs: languagePackState,
      progressKey: STORAGE_KEYS.progress,
      packsKey: STORAGE_KEYS.languagePacks,
    }
  )
}

/**
 * Get progress state from the page
 */
export async function getProgressState(
  page: Page
): Promise<ProgressStateFixture | null> {
  return getLocalStorageState<ProgressStateFixture>(page, STORAGE_KEYS.progress)
}

/**
 * Get language pack state from the page
 */
export async function getLanguagePackState(
  page: Page
): Promise<LanguagePackStateFixture | null> {
  return getLocalStorageState<LanguagePackStateFixture>(
    page,
    STORAGE_KEYS.languagePacks
  )
}

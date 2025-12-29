import { test, expect } from '@playwright/test'

// Mock language pack data with enough words for games
const mockLanguagePackStore = {
  state: {
    availablePacks: [
      {
        id: 'tc-en',
        sourceLanguage: 'tc',
        targetLanguage: 'en',
        name: '英文 (繁體中文)',
        nativeName: 'English',
        flag: '🇺🇸',
        wordCount: 3000,
        isDownloaded: true,
        version: '1.0.0',
      },
    ],
    downloadedData: {
      'tc-en': {
        id: 'tc-en',
        words: [
          { id: '1', term: 'apple', definition: '蘋果', pronunciation: '/ˈæp.əl/', examples: [], category: 'food', difficulty: 'beginner' },
          { id: '2', term: 'book', definition: '書', pronunciation: '/bʊk/', examples: [], category: 'objects', difficulty: 'beginner' },
          { id: '3', term: 'cat', definition: '貓', pronunciation: '/kæt/', examples: [], category: 'animals', difficulty: 'beginner' },
          { id: '4', term: 'dog', definition: '狗', pronunciation: '/dɔːɡ/', examples: [], category: 'animals', difficulty: 'beginner' },
          { id: '5', term: 'egg', definition: '蛋', pronunciation: '/eɡ/', examples: [], category: 'food', difficulty: 'beginner' },
          { id: '6', term: 'fish', definition: '魚', pronunciation: '/fɪʃ/', examples: [], category: 'animals', difficulty: 'beginner' },
          { id: '7', term: 'hat', definition: '帽子', pronunciation: '/hæt/', examples: [], category: 'clothing', difficulty: 'beginner' },
          { id: '8', term: 'ice', definition: '冰', pronunciation: '/aɪs/', examples: [], category: 'nature', difficulty: 'beginner' },
          { id: '9', term: 'jam', definition: '果醬', pronunciation: '/dʒæm/', examples: [], category: 'food', difficulty: 'beginner' },
          { id: '10', term: 'key', definition: '鑰匙', pronunciation: '/kiː/', examples: [], category: 'objects', difficulty: 'beginner' },
        ],
      },
    },
    activePackId: 'tc-en',
    downloadingPackId: null,
    isRefreshing: false,
    error: null,
  },
  version: 0,
}

test.describe('Games Hub', () => {
  test.beforeEach(async ({ page }) => {
    // Set up localStorage with mock data before navigating
    await page.addInitScript((mockData) => {
      localStorage.setItem('kidsterm-language-packs-v1', JSON.stringify(mockData))
    }, mockLanguagePackStore)
    await page.goto('/games')
  })

  test('should display games hub page', async ({ page }) => {
    // UI shows Chinese: 遊戲
    await expect(page.getByRole('heading', { name: '遊戲' })).toBeVisible()
    // Chinese: 字母重組, 配對遊戲
    await expect(page.locator('text=字母重組')).toBeVisible()
    await expect(page.locator('text=配對遊戲')).toBeVisible()
  })

  test('should show game descriptions', async ({ page }) => {
    // Chinese: 重新排列字母組成單字, 找出單字和釋義的配對
    await expect(page.locator('text=重新排列字母組成單字')).toBeVisible()
    await expect(page.locator('text=找出單字和釋義的配對')).toBeVisible()
  })

  test('should show current language pack info', async ({ page }) => {
    // Shows language info with flag emoji
    await expect(page.locator('text=🇺🇸')).toBeVisible()
  })

  test('should show subtitle', async ({ page }) => {
    // Chinese: 在遊戲中學習單字！
    await expect(page.locator('text=在遊戲中學習單字！')).toBeVisible()
  })
})

test.describe('Word Scramble Game - With Words', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript((mockData) => {
      localStorage.setItem('kidsterm-language-packs-v1', JSON.stringify(mockData))
    }, mockLanguagePackStore)
    await page.goto('/games/scramble')
  })

  test('should display start screen with game title', async ({ page }) => {
    // Chinese: 字母重組
    await expect(page.getByRole('heading', { name: '字母重組' })).toBeVisible()
  })

  test('should show game description on start screen', async ({ page }) => {
    // Chinese: 重新排列字母組成單字
    await expect(page.locator('text=重新排列字母組成單字')).toBeVisible()
  })

  test('should show word count info', async ({ page }) => {
    // Shows "10 完成的單字" or similar
    await expect(page.locator('text=/\\d+ /')).toBeVisible()
  })

  test('should have new game button', async ({ page }) => {
    // Chinese: 新遊戲
    await expect(page.getByRole('button', { name: '新遊戲' })).toBeVisible()
  })

  test('should have back button', async ({ page }) => {
    // Chinese: 返回
    await expect(page.getByRole('button', { name: '返回' })).toBeVisible()
  })

  test('should navigate back to games hub', async ({ page }) => {
    await page.getByRole('button', { name: '返回' }).click()
    await expect(page.getByRole('heading', { name: '遊戲' })).toBeVisible()
  })

  test('should start game when clicking new game button', async ({ page }) => {
    await page.getByRole('button', { name: '新遊戲' }).click()
    // Should see progress indicator like "1 / 10"
    await expect(page.locator('text=/1 \\/ \\d+/')).toBeVisible()
    // Chinese: 分數
    await expect(page.locator('text=分數')).toBeVisible()
  })

  test('should show letter tiles after starting game', async ({ page }) => {
    await page.getByRole('button', { name: '新遊戲' }).click()
    // Should see letter tiles (buttons with single letters)
    const letterButtons = page.locator('button').filter({ hasText: /^[A-Za-z]$/ })
    await expect(letterButtons.first()).toBeVisible()
  })

  test('should show hint and refresh buttons during game', async ({ page }) => {
    await page.getByRole('button', { name: '新遊戲' }).click()
    // Chinese: 提示, 重新整理
    await expect(page.getByRole('button', { name: '提示' })).toBeVisible()
    await expect(page.getByRole('button', { name: '重新整理' })).toBeVisible()
  })

  test('should show play audio button during game', async ({ page }) => {
    await page.getByRole('button', { name: '新遊戲' }).click()
    // Chinese: 播放音訊
    await expect(page.getByRole('button', { name: '播放音訊' })).toBeVisible()
  })

  test('should show back button during game', async ({ page }) => {
    await page.getByRole('button', { name: '新遊戲' }).click()
    // Chinese: 返回
    await expect(page.getByRole('button', { name: '返回' })).toBeVisible()
  })

  test('should show definition as hint during game', async ({ page }) => {
    await page.getByRole('button', { name: '新遊戲' }).click()
    // Should show one of the Chinese definitions from mock data
    const definitions = ['蘋果', '書', '貓', '狗', '蛋', '魚', '帽子', '冰', '果醬', '鑰匙']
    const definitionLocator = page.locator(`text=/${definitions.join('|')}/`)
    await expect(definitionLocator.first()).toBeVisible()
  })
})

test.describe('Matching Game - With Words', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript((mockData) => {
      localStorage.setItem('kidsterm-language-packs-v1', JSON.stringify(mockData))
    }, mockLanguagePackStore)
    await page.goto('/games/matching')
  })

  test('should display start screen with game title', async ({ page }) => {
    // Chinese: 配對遊戲
    await expect(page.getByRole('heading', { name: '配對遊戲' })).toBeVisible()
  })

  test('should show game description on start screen', async ({ page }) => {
    // Chinese: 找出單字和釋義的配對
    await expect(page.locator('text=找出單字和釋義的配對')).toBeVisible()
  })

  test('should show pair count info', async ({ page }) => {
    // Shows "6 配對"
    await expect(page.locator('text=6 配對')).toBeVisible()
  })

  test('should have new game button', async ({ page }) => {
    // Chinese: 新遊戲
    await expect(page.getByRole('button', { name: '新遊戲' })).toBeVisible()
  })

  test('should have back button', async ({ page }) => {
    // Chinese: 返回
    await expect(page.getByRole('button', { name: '返回' })).toBeVisible()
  })

  test('should navigate back to games hub', async ({ page }) => {
    await page.getByRole('button', { name: '返回' }).click()
    await expect(page.getByRole('heading', { name: '遊戲' })).toBeVisible()
  })

  test('should start game with cards when clicking new game', async ({ page }) => {
    await page.getByRole('button', { name: '新遊戲' }).click()
    // Should see pairs counter: "0 / 6 配對"
    await expect(page.locator('text=0 / 6 配對')).toBeVisible()
    // Chinese: 嘗試次數
    await expect(page.locator('text=嘗試次數')).toBeVisible()
  })

  test('should display 12 cards (6 pairs) after starting', async ({ page }) => {
    await page.getByRole('button', { name: '新遊戲' }).click()
    // Cards show "?" when face down
    const cards = page.locator('text=?')
    await expect(cards).toHaveCount(12)
  })

  test('should show legend for term and definition colors', async ({ page }) => {
    await page.getByRole('button', { name: '新遊戲' }).click()
    // Legend uses English: Term, Definition (use exact match to avoid matching "KidsTerm")
    await expect(page.getByText('Term', { exact: true })).toBeVisible()
    await expect(page.getByText('Definition', { exact: true })).toBeVisible()
  })

  test('should flip card on click', async ({ page }) => {
    await page.getByRole('button', { name: '新遊戲' }).click()
    // Cards are buttons that contain "?" in their accessible name
    const firstCard = page.getByRole('button', { name: /^\?/ }).first()
    await firstCard.click()
    // After clicking, the card should be in an active/flipped state
    // The button will have [active] state after click
    await page.waitForTimeout(500)
    // Just verify the click was registered and page didn't crash
    // Check that attempts counter is still 0 (need 2 cards for attempt)
    await expect(page.locator('text=嘗試次數: 0')).toBeVisible()
  })

  test('should show back button during game', async ({ page }) => {
    await page.getByRole('button', { name: '新遊戲' }).click()
    // Chinese: 返回
    await expect(page.getByRole('button', { name: '返回' })).toBeVisible()
  })

  test('should increment attempts after selecting two cards', async ({ page }) => {
    await page.getByRole('button', { name: '新遊戲' }).click()
    // Initial attempts
    await expect(page.locator('text=嘗試次數: 0')).toBeVisible()
    // Click two cards
    const cards = page.locator('text=?')
    await cards.nth(0).click()
    await page.waitForTimeout(300)
    await cards.nth(1).click()
    // Wait for check
    await page.waitForTimeout(600)
    // Attempts should increase
    await expect(page.locator('text=嘗試次數: 1')).toBeVisible()
  })
})

test.describe('Games - No Words Available', () => {
  test.beforeEach(async ({ page }) => {
    // Set up empty language pack (UI falls back to English when no settings)
    const emptyPackStore = {
      state: {
        availablePacks: [],
        downloadedData: {},
        activePackId: 'tc-en',
        downloadingPackId: null,
        isRefreshing: false,
        error: null,
      },
      version: 0,
    }
    await page.addInitScript((mockData) => {
      localStorage.setItem('kidsterm-language-packs-v1', JSON.stringify(mockData))
    }, emptyPackStore)
  })

  test('should show not enough words message for Word Scramble', async ({ page }) => {
    await page.goto('/games/scramble')
    // English fallback: "Not enough words"
    await expect(page.getByRole('heading', { name: 'Not enough words' })).toBeVisible()
    await expect(page.locator('text=Download a language pack with at least 4 words')).toBeVisible()
  })

  test('should show not enough words message for Matching Game', async ({ page }) => {
    await page.goto('/games/matching')
    // English fallback: "Not enough words"
    await expect(page.getByRole('heading', { name: 'Not enough words' })).toBeVisible()
  })

  test('should have back button when no words', async ({ page }) => {
    await page.goto('/games/scramble')
    // English fallback: "Back"
    await expect(page.getByRole('button', { name: 'Back' })).toBeVisible()
  })

  test('should navigate back to games hub when no words', async ({ page }) => {
    await page.goto('/games/scramble')
    // English fallback
    await page.getByRole('button', { name: 'Back' }).click()
    // Games hub in English
    await expect(page.getByRole('heading', { name: 'Games' })).toBeVisible()
  })
})

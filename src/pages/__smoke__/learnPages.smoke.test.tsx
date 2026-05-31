import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { ReactElement } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { MemoryRouter } from 'react-router-dom'
import theme from '../../theme'
import { useLanguagePackStore } from '../../store/useLanguagePackStore'
import { useSrsStore } from '../../store/useSrsStore'
import { useFavoritesStore } from '../../store/useFavoritesStore'
import { getTranslations } from '../../i18n'
import { createMockLanguagePack } from '../../test/factories'

import LearnHubPage from '../LearnHubPage'
import WordLearningPage from '../WordLearningPage'
import SrsLearningPage from '../SrsLearningPage'
import TypingLearningPage from '../TypingLearningPage'
import ContextLearningPage from '../ContextLearningPage'

/**
 * Smoke tests: every learn page must mount without throwing and show its
 * heading/key text. Data and speech are stubbed so the tests are deterministic.
 */

const PACK_ID = 'smoke-pack'
const t = getTranslations('en') // pack sourceLanguage 'en' -> English UI

const words = ['apple', 'banana', 'cherry', 'date', 'fig', 'grape'].map((term, i) => ({
  id: `w-${i}`,
  term,
  definition: `the meaning of ${term}`,
  pronunciation: `/${term}/`,
  examples: [`I really like ${term} a lot`],
  category: 'food',
  difficulty: 'beginner' as const,
}))

function renderWithProviders(ui: ReactElement) {
  return render(
    <ChakraProvider theme={theme}>
      <MemoryRouter>{ui}</MemoryRouter>
    </ChakraProvider>
  )
}

beforeAll(() => {
  // jsdom lacks matchMedia, which Chakra's color-mode provider needs.
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  )

  // Minimal speechSynthesis stub so useSpeech is a no-op in jsdom.
  vi.stubGlobal('speechSynthesis', {
    speak: vi.fn(),
    cancel: vi.fn(),
    getVoices: vi.fn(() => []),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })
  vi.stubGlobal(
    'SpeechSynthesisUtterance',
    class {
      constructor(public text: string) {}
    }
  )
})

beforeEach(() => {
  useFavoritesStore.setState({ favoritesByPack: {} })
  useSrsStore.setState({ cardsByPack: {} })
  useLanguagePackStore.setState({
    activePackId: PACK_ID,
    availablePacks: [
      createMockLanguagePack({ id: PACK_ID, sourceLanguage: 'en', targetLanguage: 'es', name: 'Spanish' }),
    ],
    downloadedData: { [PACK_ID]: { id: PACK_ID, words } },
  })
})

describe('learn pages smoke tests', () => {
  it('renders the Learn hub with all method cards', () => {
    renderWithProviders(<LearnHubPage />)
    expect(screen.getByRole('heading', { name: t.learnHub.title })).toBeInTheDocument()
    expect(screen.getByText(t.learnHub.flashcards)).toBeInTheDocument()
    expect(screen.getByText(t.learnHub.srs)).toBeInTheDocument()
    expect(screen.getByText(t.learnHub.typing)).toBeInTheDocument()
    expect(screen.getByText(t.learnHub.context)).toBeInTheDocument()
  })

  it('renders the flashcards page', () => {
    renderWithProviders(<WordLearningPage />)
    expect(screen.getByText(t.learn.tapToFlip)).toBeInTheDocument()
  })

  it('renders the Smart Review (SRS) page', () => {
    renderWithProviders(<SrsLearningPage />)
    expect(screen.getByRole('heading', { name: t.srs.title })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: t.srs.showAnswer })).toBeInTheDocument()
  })

  it('renders the typing page', () => {
    renderWithProviders(<TypingLearningPage />)
    expect(screen.getByRole('heading', { name: t.typing.title })).toBeInTheDocument()
    expect(screen.getByText(t.typing.prompt)).toBeInTheDocument()
  })

  it('renders the context (cloze) page', () => {
    renderWithProviders(<ContextLearningPage />)
    expect(screen.getByRole('heading', { name: t.context.title })).toBeInTheDocument()
    expect(screen.getByText(t.context.prompt)).toBeInTheDocument()
  })
})

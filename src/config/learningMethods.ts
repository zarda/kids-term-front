import { FiLayers, FiRefreshCw, FiEdit3, FiAlignLeft } from 'react-icons/fi'
import type { IconType } from 'react-icons'
import type { Translations } from '../i18n/types'

/**
 * Registry of "learn new words" methods shown on the Learn hub (`/learn`).
 *
 * This is the single source of truth: to add a future method, append an entry
 * here, add a matching `learnHub` translation key pair, add a route in
 * `src/routes/index.tsx`, and create the page. The hub renders itself from this list.
 */

export type LearningMethodId = 'flashcards' | 'srs' | 'typing' | 'context'

export interface LearningMethod {
  id: LearningMethodId
  /** Route path the hub navigates to. */
  path: string
  /** Emoji shown on the hub card. */
  emoji: string
  /** Icon (currently unused by the hub but handy for nav/menus). */
  icon: IconType
  /** Key into `t.learnHub` for the card title. */
  titleKey: keyof Translations['learnHub']
  /** Key into `t.learnHub` for the card description. */
  descKey: keyof Translations['learnHub']
  /** Minimum available words before the method is enabled. */
  minWords: number
}

export const learningMethods: LearningMethod[] = [
  {
    id: 'flashcards',
    path: '/learn/flashcards',
    emoji: '🃏',
    icon: FiLayers,
    titleKey: 'flashcards',
    descKey: 'flashcardsDesc',
    minWords: 1,
  },
  {
    id: 'srs',
    path: '/learn/srs',
    emoji: '🔁',
    icon: FiRefreshCw,
    titleKey: 'srs',
    descKey: 'srsDesc',
    minWords: 1,
  },
  {
    id: 'typing',
    path: '/learn/typing',
    emoji: '⌨️',
    icon: FiEdit3,
    titleKey: 'typing',
    descKey: 'typingDesc',
    minWords: 1,
  },
  {
    id: 'context',
    path: '/learn/context',
    emoji: '📖',
    icon: FiAlignLeft,
    titleKey: 'context',
    descKey: 'contextDesc',
    minWords: 4,
  },
]

/** Look up a method by id. */
export function getLearningMethod(id: LearningMethodId): LearningMethod | undefined {
  return learningMethods.find((method) => method.id === id)
}

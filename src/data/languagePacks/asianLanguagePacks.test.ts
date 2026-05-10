import { describe, it, expect } from 'vitest'
import { availableLanguagePacks, downloadLanguagePack } from './index'

import { beginnerWords as enThBeginner } from './en-th/beginner'
import { intermediateWords as enThIntermediate } from './en-th/intermediate'
import { advancedWords as enThAdvanced } from './en-th/advanced'
import { beginnerWords as enViBeginner } from './en-vi/beginner'
import { intermediateWords as enViIntermediate } from './en-vi/intermediate'
import { advancedWords as enViAdvanced } from './en-vi/advanced'
import { beginnerWords as enIdBeginner } from './en-id/beginner'
import { intermediateWords as enIdIntermediate } from './en-id/intermediate'
import { advancedWords as enIdAdvanced } from './en-id/advanced'
import { beginnerWords as tcThBeginner } from './tc-th/beginner'
import { intermediateWords as tcThIntermediate } from './tc-th/intermediate'
import { advancedWords as tcThAdvanced } from './tc-th/advanced'
import { beginnerWords as tcViBeginner } from './tc-vi/beginner'
import { intermediateWords as tcViIntermediate } from './tc-vi/intermediate'
import { advancedWords as tcViAdvanced } from './tc-vi/advanced'
import { beginnerWords as tcIdBeginner } from './tc-id/beginner'
import { intermediateWords as tcIdIntermediate } from './tc-id/intermediate'
import { advancedWords as tcIdAdvanced } from './tc-id/advanced'
import { beginnerWords as jaThBeginner } from './ja-th/beginner'
import { intermediateWords as jaThIntermediate } from './ja-th/intermediate'
import { advancedWords as jaThAdvanced } from './ja-th/advanced'
import { beginnerWords as jaViBeginner } from './ja-vi/beginner'
import { intermediateWords as jaViIntermediate } from './ja-vi/intermediate'
import { advancedWords as jaViAdvanced } from './ja-vi/advanced'
import { beginnerWords as jaIdBeginner } from './ja-id/beginner'
import { intermediateWords as jaIdIntermediate } from './ja-id/intermediate'
import { advancedWords as jaIdAdvanced } from './ja-id/advanced'

import { beginnerWords as enKoBeginner } from './en-ko/beginner'
import { intermediateWords as enKoIntermediate } from './en-ko/intermediate'
import { advancedWords as enKoAdvanced } from './en-ko/advanced'
import { beginnerWords as tcEnBeginner } from './tc-en/beginner'
import { intermediateWords as tcEnIntermediate } from './tc-en/intermediate'
import { advancedWords as tcEnAdvanced } from './tc-en/advanced'
import { beginnerWords as jaEnBeginner } from './ja-en/beginner'
import { intermediateWords as jaEnIntermediate } from './ja-en/intermediate'
import { advancedWords as jaEnAdvanced } from './ja-en/advanced'

type Difficulty = 'beginner' | 'intermediate' | 'advanced'

const NEW_PACKS = [
  { id: 'en-th', source: 'en-ko', beginner: enThBeginner, intermediate: enThIntermediate, advanced: enThAdvanced },
  { id: 'en-vi', source: 'en-ko', beginner: enViBeginner, intermediate: enViIntermediate, advanced: enViAdvanced },
  { id: 'en-id', source: 'en-ko', beginner: enIdBeginner, intermediate: enIdIntermediate, advanced: enIdAdvanced },
  { id: 'tc-th', source: 'tc-en', beginner: tcThBeginner, intermediate: tcThIntermediate, advanced: tcThAdvanced },
  { id: 'tc-vi', source: 'tc-en', beginner: tcViBeginner, intermediate: tcViIntermediate, advanced: tcViAdvanced },
  { id: 'tc-id', source: 'tc-en', beginner: tcIdBeginner, intermediate: tcIdIntermediate, advanced: tcIdAdvanced },
  { id: 'ja-th', source: 'ja-en', beginner: jaThBeginner, intermediate: jaThIntermediate, advanced: jaThAdvanced },
  { id: 'ja-vi', source: 'ja-en', beginner: jaViBeginner, intermediate: jaViIntermediate, advanced: jaViAdvanced },
  { id: 'ja-id', source: 'ja-en', beginner: jaIdBeginner, intermediate: jaIdIntermediate, advanced: jaIdAdvanced },
]

const SOURCE_PACKS: Record<string, { beginner: typeof enKoBeginner; intermediate: typeof enKoBeginner; advanced: typeof enKoBeginner }> = {
  'en-ko': { beginner: enKoBeginner, intermediate: enKoIntermediate, advanced: enKoAdvanced },
  'tc-en': { beginner: tcEnBeginner, intermediate: tcEnIntermediate, advanced: tcEnAdvanced },
  'ja-en': { beginner: jaEnBeginner, intermediate: jaEnIntermediate, advanced: jaEnAdvanced },
}

const DIFFICULTY_LETTER: Record<Difficulty, string> = { beginner: 'b', intermediate: 'i', advanced: 'a' }

describe('Asian language packs (Thai/Vietnamese/Indonesian)', () => {
  describe.each(NEW_PACKS)('$id', (pack) => {
    const difficulties: Difficulty[] = ['beginner', 'intermediate', 'advanced']

    it.each(difficulties)('%s has 1000 entries', (d) => {
      expect(pack[d]).toHaveLength(1000)
    })

    it.each(difficulties)('%s ids are unique and contiguous (1..1000)', (d) => {
      const letter = DIFFICULTY_LETTER[d]
      const ids = pack[d].map((w) => w.id)
      expect(new Set(ids).size).toBe(ids.length)
      const expected = Array.from({ length: 1000 }, (_, i) => `${pack.id}-${letter}-${i + 1}`)
      expect(ids).toEqual(expected)
    })

    it.each(difficulties)('%s difficulty field matches', (d) => {
      pack[d].forEach((w) => expect(w.difficulty).toBe(d))
    })

    it.each(difficulties)('%s required fields are non-empty', (d) => {
      pack[d].forEach((w) => {
        expect(w.term).toBeTruthy()
        expect(w.definition).toBeTruthy()
        expect(w.pronunciation).toBeTruthy()
        expect(w.examples).toBeInstanceOf(Array)
        expect(w.examples.length).toBeGreaterThan(0)
        expect(w.examples[0]).toBeTruthy()
        expect(w.category).toBeTruthy()
      })
    })

    it.each(difficulties)('%s definitions exactly mirror source pack %s', (d) => {
      const source = SOURCE_PACKS[pack.source][d]
      expect(pack[d]).toHaveLength(source.length)
      for (let i = 0; i < source.length; i++) {
        expect(pack[d][i].definition).toBe(source[i].definition)
      }
    })

    it.each(difficulties)('%s categories exactly mirror source pack %s', (d) => {
      const source = SOURCE_PACKS[pack.source][d]
      for (let i = 0; i < source.length; i++) {
        expect(pack[d][i].category).toBe(source[i].category)
      }
    })

    it('combined word count is 3000', () => {
      expect(pack.beginner.length + pack.intermediate.length + pack.advanced.length).toBe(3000)
    })

    it('metadata wordCount matches actual entry count', () => {
      const meta = availableLanguagePacks.find((p) => p.id === pack.id)
      expect(meta).toBeDefined()
      expect(meta?.wordCount).toBe(3000)
    })
  })

  describe('downloadLanguagePack returns combined word list', () => {
    it.each(NEW_PACKS.map((p) => p.id))('%s loads 3000 words', async (id) => {
      const data = await downloadLanguagePack(id)
      expect(data.id).toBe(id)
      expect(data.words).toHaveLength(3000)
    })
  })
})

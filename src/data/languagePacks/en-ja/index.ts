import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const enJaPack: LanguagePackData = {
  id: 'en-ja',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default enJaPack

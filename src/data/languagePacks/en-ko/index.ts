import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const enKoPack: LanguagePackData = {
  id: 'en-ko',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default enKoPack

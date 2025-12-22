import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const enDePackData: LanguagePackData = {
  id: 'en-de',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default enDePackData

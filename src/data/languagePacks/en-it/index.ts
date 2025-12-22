import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const enItPack: LanguagePackData = {
  id: 'en-it',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default enItPack

import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const enEnPack: LanguagePackData = {
  id: 'en-en',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default enEnPack

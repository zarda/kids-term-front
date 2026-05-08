import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const enIdPack: LanguagePackData = {
  id: 'en-id',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default enIdPack

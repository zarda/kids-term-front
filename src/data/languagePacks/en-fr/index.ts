import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const enFrPack: LanguagePackData = {
  id: 'en-fr',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default enFrPack

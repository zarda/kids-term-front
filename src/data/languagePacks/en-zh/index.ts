import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const enZhPack: LanguagePackData = {
  id: 'en-zh',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default enZhPack

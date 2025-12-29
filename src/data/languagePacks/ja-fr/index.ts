import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const jaFrPack: LanguagePackData = {
  id: 'ja-fr',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default jaFrPack

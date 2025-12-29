import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const jaEsPack: LanguagePackData = {
  id: 'ja-es',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default jaEsPack

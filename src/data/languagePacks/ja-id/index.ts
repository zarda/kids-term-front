import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const jaIdPack: LanguagePackData = {
  id: 'ja-id',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default jaIdPack

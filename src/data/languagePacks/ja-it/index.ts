import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const jaItPack: LanguagePackData = {
  id: 'ja-it',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default jaItPack

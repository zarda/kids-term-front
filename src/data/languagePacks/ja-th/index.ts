import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const jaThPack: LanguagePackData = {
  id: 'ja-th',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default jaThPack

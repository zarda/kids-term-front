import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const tcJaPack: LanguagePackData = {
  id: 'tc-ja',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default tcJaPack

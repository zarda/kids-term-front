import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const tcFrPack: LanguagePackData = {
  id: 'tc-fr',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default tcFrPack

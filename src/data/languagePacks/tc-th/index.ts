import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const tcThPack: LanguagePackData = {
  id: 'tc-th',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default tcThPack

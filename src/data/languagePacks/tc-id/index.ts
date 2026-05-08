import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const tcIdPack: LanguagePackData = {
  id: 'tc-id',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default tcIdPack

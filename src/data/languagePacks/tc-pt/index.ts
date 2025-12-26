import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const tcPtPack: LanguagePackData = {
  id: 'tc-pt',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default tcPtPack

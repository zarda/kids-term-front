import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const tcDePack: LanguagePackData = {
  id: 'tc-de',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default tcDePack

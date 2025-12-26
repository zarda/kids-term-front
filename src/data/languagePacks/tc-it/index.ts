import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const tcItPack: LanguagePackData = {
  id: 'tc-it',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default tcItPack

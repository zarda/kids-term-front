import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const jaDePack: LanguagePackData = {
  id: 'ja-de',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default jaDePack

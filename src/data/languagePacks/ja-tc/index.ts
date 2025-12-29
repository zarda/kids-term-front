import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const jaTcPack: LanguagePackData = {
  id: 'ja-tc',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default jaTcPack

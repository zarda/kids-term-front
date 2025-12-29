import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const jaPtPack: LanguagePackData = {
  id: 'ja-pt',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default jaPtPack

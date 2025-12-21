import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const zhJaPack: LanguagePackData = {
  id: 'zh-ja',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default zhJaPack

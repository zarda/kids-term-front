import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const zhEnPack: LanguagePackData = {
  id: 'zh-en',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default zhEnPack

import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const jaKoPack: LanguagePackData = {
  id: 'ja-ko',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default jaKoPack

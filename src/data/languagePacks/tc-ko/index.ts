import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const tcKoPack: LanguagePackData = {
  id: 'tc-ko',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default tcKoPack

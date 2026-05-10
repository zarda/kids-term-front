import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const tcViPack: LanguagePackData = {
  id: 'tc-vi',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default tcViPack

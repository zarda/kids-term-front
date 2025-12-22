import type { LanguagePackData } from '../../../types/language.types'
import { beginnerWords } from './beginner'
import { intermediateWords } from './intermediate'
import { advancedWords } from './advanced'

const enPtPackData: LanguagePackData = {
  id: 'en-pt',
  words: [...beginnerWords, ...intermediateWords, ...advancedWords],
}

export default enPtPackData

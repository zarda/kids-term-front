import type { ExerciseType } from '../types/exercise.types'
import type { LanguageWord } from '../types/language.types'

export interface Exercise {
  id: string
  type: ExerciseType
  wordId: string
  question: string
  options: string[]
  correctAnswer: string
  timeLimit: number
}

export function generateExercise(words: LanguageWord[], type: ExerciseType): Exercise | null {
  if (words.length < 4) return null

  const targetWord = words[Math.floor(Math.random() * words.length)]
  const otherWords = words.filter((w) => w.id !== targetWord.id)
  const shuffled = otherWords.sort(() => Math.random() - 0.5).slice(0, 3)
  const options = [...shuffled.map((w) => w.definition), targetWord.definition].sort(
    () => Math.random() - 0.5
  )

  return {
    id: `ex-${Date.now()}`,
    type,
    wordId: targetWord.id,
    question: `"${targetWord.term}"`,
    options,
    correctAnswer: targetWord.definition,
    timeLimit: 30,
  }
}

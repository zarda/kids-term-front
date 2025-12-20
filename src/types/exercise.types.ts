export type ExerciseType = 'multiple-choice' | 'fill-blank' | 'listening'

export interface Exercise {
  id: string
  type: ExerciseType
  wordId: string
  question: string
  options?: string[]
  correctAnswer: string
  timeLimit: number // seconds
}

export interface ExerciseResult {
  exerciseId: string
  wordId: string
  isCorrect: boolean
  timeSpent: number // seconds
  answeredAt: string
}

export interface PracticeSession {
  id: string
  exercises: Exercise[]
  results: ExerciseResult[]
  startedAt: string
  completedAt?: string
  score: number
  totalQuestions: number
}

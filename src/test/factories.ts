import type { LanguageWord, LanguagePack } from '../types/language.types'
import type { Exercise } from '../types/exercise.types'
import type { Achievement, DailyProgress } from '../types/progress.types'

let wordIdCounter = 0
let exerciseIdCounter = 0

export function createMockWord(overrides: Partial<LanguageWord> = {}): LanguageWord {
  const id = `word-${++wordIdCounter}`
  return {
    id,
    term: `term-${id}`,
    definition: `definition-${id}`,
    pronunciation: `pronunciation-${id}`,
    examples: [`Example sentence for ${id}`],
    category: 'general',
    difficulty: 'beginner',
    ...overrides,
  }
}

export function createMockWords(count: number, overrides: Partial<LanguageWord> = {}): LanguageWord[] {
  return Array.from({ length: count }, () => createMockWord(overrides))
}

export function createMockLanguagePack(overrides: Partial<LanguagePack> = {}): LanguagePack {
  return {
    id: 'en-es',
    sourceLanguage: 'en',
    targetLanguage: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    wordCount: 100,
    isDownloaded: true,
    version: '1.0.0',
    ...overrides,
  }
}

export function createMockExercise(overrides: Partial<Exercise> = {}): Exercise {
  const id = `exercise-${++exerciseIdCounter}`
  return {
    id,
    type: 'multiple-choice',
    wordId: 'word-1',
    question: '"test term"',
    options: ['correct answer', 'wrong 1', 'wrong 2', 'wrong 3'],
    correctAnswer: 'correct answer',
    timeLimit: 30,
    ...overrides,
  }
}

export function createMockAchievement(overrides: Partial<Achievement> = {}): Achievement {
  return {
    id: 'streak-7',
    icon: '⚡',
    requirement: 7,
    type: 'streak',
    ...overrides,
  }
}

export function createMockDailyProgress(overrides: Partial<DailyProgress> = {}): DailyProgress {
  return {
    date: new Date().toISOString().split('T')[0],
    wordsLearned: 5,
    wordsReviewed: 10,
    exercisesCompleted: 8,
    correctAnswers: 6,
    timeSpent: 15,
    ...overrides,
  }
}

export function resetFactoryCounters(): void {
  wordIdCounter = 0
  exerciseIdCounter = 0
}

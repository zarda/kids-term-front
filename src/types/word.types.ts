export interface Word {
  id: string
  term: string
  definition: string
  pronunciation: string
  audioUrl?: string
  examples: string[]
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  isFavorite: boolean
  masteryLevel: number // 0-100
  lastReviewed?: string
  nextReview?: string
}

export interface Phrase {
  id: string
  phrase: string
  translation: string
  pronunciation: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  isFavorite: boolean
  masteryLevel: number
}

export type WordCategory =
  | 'greetings'
  | 'food'
  | 'travel'
  | 'business'
  | 'daily'
  | 'numbers'
  | 'colors'
  | 'family'
  | 'weather'
  | 'time'

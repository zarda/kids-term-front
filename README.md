# KidsTerm

A mobile-first language learning application designed to help kids learn vocabulary and phrases interactively through gamified flashcards and exercises.

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **UI Library:** Chakra UI + Emotion
- **State Management:** Zustand + Immer
- **Routing:** React Router DOM
- **Animations:** React Spring + Framer Motion + @use-gesture
- **Charts:** Recharts
- **Audio:** Web Speech API
- **Testing:** Vitest (Unit) + Playwright (E2E)

## Supported Language Packs

| Source | Target Languages |
|--------|-----------------|
| English | English, French, German, Italian, Japanese, Korean, Portuguese, Spanish, Traditional Chinese |
| Japanese (日本語) | English, French, German, Italian, Japanese, Korean, Portuguese, Spanish, Traditional Chinese |
| Traditional Chinese (繁體中文) | English, French, German, Italian, Japanese, Korean, Portuguese, Spanish, Traditional Chinese |

Each language pack includes **beginner**, **intermediate**, and **advanced** difficulty levels.

## Features

### Word Learning
- Animated 3D flip flashcards with term, pronunciation, definition, and examples
- Swipe gestures (right = known, left = skip)
- Text-to-speech pronunciation with multi-language voice support
- Favorite/bookmark words
- Progress tracking and resume functionality
- Jump to specific card number

### Practice Exercises
- Multiple choice questions
- Fill-in-the-blank exercises
- Listening exercises with audio playback
- Timed exercises (configurable 10-60 seconds)
- Score tracking and session summaries

### Games
- **Word Scramble**: Unscramble letters to form words with hints and audio support
- **Matching Game**: Memory card matching with terms and definitions (6 pairs)
- Progress tracking and perfect game detection
- Star ratings based on performance

### Progress & Analytics
- Daily streak tracking (current and longest)
- Weekly progress charts
- 57 achievement badges across categories:
  - Streak milestones (1-365 days)
  - Words learned (1-1000 words)
  - Exercises completed (1-1000 exercises)
  - Perfect accuracy (3-100 consecutive correct)
  - Time spent (5-3000 minutes)
  - Games played (1-100 games)
  - Perfect games (3-25 games)
- Detailed statistics (accuracy, time spent, words mastered)

### Settings
- Multiple language pack combinations
- Audio settings (auto-play, speech rate, volume)
- Learning goals (daily word target)
- Difficulty filter (beginner, intermediate, advanced)
- Dark/Light mode
- Notification reminders

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/          # AppShell, TopNav, BottomTabBar, SideNav
│   ├── words/           # FlipCard, WordStack
│   ├── practice/        # Exercise components
│   └── progress/        # Stats and achievement components
├── pages/               # Route pages
│   ├── HomePage/        # Dashboard with daily stats
│   ├── WordLearningPage/# Flashcard learning
│   ├── PracticePage/    # Exercise practice
│   ├── GamesPage/       # Word Scramble & Matching games
│   ├── ProgressPage/    # Statistics and achievements
│   └── SettingsPage/    # User preferences
├── store/               # Zustand stores (with persistence)
├── hooks/               # Custom hooks (useSpeech, useTimer, useSwipeGesture, etc.)
├── i18n/                # Internationalization (EN, JA, TC)
├── data/                # Language packs (28+ combinations)
├── types/               # TypeScript interfaces
└── theme/               # Chakra UI theme customization
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run unit tests
npm test

# Run E2E tests
npx playwright test

# Lint code
npm run lint
```

## License

GPL-3.0

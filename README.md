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
| English | Chinese, French, German, Italian, Japanese, Korean, Portuguese, Spanish |
| Chinese (中文) | English, French, German, Italian, Japanese, Korean, Portuguese, Spanish |

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

### Progress & Analytics
- Daily streak tracking (current and longest)
- Weekly progress charts
- 50+ achievement badges across categories:
  - Streak milestones (1-365 days)
  - Words learned (1-1000 words)
  - Exercises completed (1-1000 exercises)
  - Perfect accuracy (3-100 consecutive correct)
  - Time spent (5-3000 minutes)
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
│   ├── ProgressPage/    # Statistics and achievements
│   └── SettingsPage/    # User preferences
├── store/               # Zustand stores (with persistence)
├── hooks/               # Custom hooks (useSpeech, useTimer, useSwipeGesture, etc.)
├── i18n/                # Internationalization (EN, TC)
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

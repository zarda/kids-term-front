# KidsTerm

A mobile-first language learning application to help kids learn words and phrases interactively.

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **UI Library:** Chakra UI + Emotion
- **State Management:** Zustand + Immer
- **Routing:** React Router DOM
- **Animations:** React Spring + @use-gesture
- **Charts:** Recharts
- **Audio:** Web Speech API
- **Testing:** Playwright (E2E)

## Features

### Word Learning
- Animated 3D flip flashcards with term, pronunciation, definition, and examples
- Swipe gestures (right = known, left = skip)
- Text-to-speech pronunciation
- Favorite/bookmark words
- Progress tracking per card

### Practice Exercises
- Multiple choice questions
- Listening exercises with audio playback
- Timed exercises (configurable 10-60 seconds)
- Score tracking and session summaries

### Progress & Analytics
- Daily streak tracking
- Weekly progress chart
- Achievement system
- Detailed statistics (accuracy, time spent, words mastered)

### Settings
- 15+ language pack combinations
- Audio settings (auto-play, speech rate, volume)
- Learning goals (daily word target)
- Dark/Light mode
- Notification reminders

## Supported Language Packs

| Source | Target Languages |
|--------|-----------------|
| Chinese (中文) | English, Spanish, French, German, Italian, Portuguese, Japanese, Korean |
| English | Spanish, French, German, Italian, Portuguese, Japanese, Korean |
| And more... | 15+ language pairs total |

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
├── hooks/               # Custom hooks (useSpeech, useTimer, useSwipeGesture)
├── i18n/                # Internationalization (EN, ZH)
├── data/                # Language packs and mock data
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

# Run E2E tests
npx playwright test
```

## License

MIT

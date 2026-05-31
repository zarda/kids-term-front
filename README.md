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
| English | English, French, German, Italian, Japanese, Korean, Portuguese, Spanish, Traditional Chinese, Thai, Vietnamese, Indonesian |
| Japanese (日本語) | English, French, German, Italian, Japanese, Korean, Portuguese, Spanish, Traditional Chinese, Thai, Vietnamese, Indonesian |
| Traditional Chinese (繁體中文) | English, French, German, Italian, Japanese, Korean, Portuguese, Spanish, Traditional Chinese, Thai, Vietnamese, Indonesian |

Each language pack includes **beginner**, **intermediate**, and **advanced** difficulty levels with **3,000 entries per pack** (1,000 per level).

### Pack data layout

Each pack lives in `src/data/languagePacks/<source>-<target>/` and is split across three files:

- `beginner.ts` — exports `beginnerWords: LanguageWord[]` (ids `<pack>-b-1` … `<pack>-b-1000`)
- `intermediate.ts` — exports `intermediateWords: LanguageWord[]` (ids `<pack>-i-1` … `<pack>-i-1000`)
- `advanced.ts` — exports `advancedWords: LanguageWord[]` (ids `<pack>-a-1` … `<pack>-a-1000`)
- `index.ts` — combines all three into a single `LanguagePackData` whose `words` array is loaded lazily via `downloadLanguagePack(packId)` in `src/data/languagePacks/index.ts`

Each `LanguageWord` has `{ id, term, definition, pronunciation, examples, category, difficulty }`. The `definition` field always carries the source-language word verbatim (so a `tc-th` entry's definition is the original Traditional Chinese word and its `term` is the Thai translation). Categories and id ordering are inherited from the source-language pack — i.e., `en-th` mirrors `en-ko`'s wordlist; `tc-*` packs mirror `tc-en`; `ja-*` packs mirror `ja-en` (definitions in `'kanji (hiragana)'` form). Pack metadata in `availableLanguagePacks` (id, native name, flag, `wordCount: 3000`) drives the in-app pack picker.

Data integrity (counts, contiguous ids, definition parity with the source pack, metadata `wordCount`, and `downloadLanguagePack` lazy-loading) is enforced by `src/data/languagePacks/asianLanguagePacks.test.ts` (189 assertions across the nine new packs).

## Features

### Learning Methods
Choose how to learn new words from the **Learn hub** (`/learn`). Every method works on the active language pack, can be restricted to your favorites, and feeds the same streak/goal/achievement tracking. New methods are registered in one place (`src/config/learningMethods.ts`). See [docs/learning-methods.md](docs/learning-methods.md) for the full logic and flow diagrams.

- **🃏 Flashcards** — animated 3D flip cards (term, pronunciation, definition, examples) with swipe gestures (right = known, left = skip), text-to-speech, favorites, resume, and jump-to-card
- **🔁 Smart Review (SRS)** — spaced repetition (simplified SM-2); rate each card *Again / Good / Easy* and it reschedules so you review words right before you forget them
- **⌨️ Spelling** — read a word's meaning (and hear it), then type the word, with forgiving answer checking
- **📖 In Context** — fill in the missing word in an example sentence (cloze)

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
│   ├── LearnHubPage/    # Learn hub — learning-method picker
│   ├── WordLearningPage/   # Flashcards method
│   ├── SrsLearningPage/    # Smart Review (SRS) method
│   ├── TypingLearningPage/ # Spelling method
│   ├── ContextLearningPage/# In-context (cloze) method
│   ├── PracticePage/    # Exercise practice
│   ├── GamesPage/       # Word Scramble & Matching games
│   ├── ProgressPage/    # Statistics and achievements
│   └── SettingsPage/    # User preferences
├── config/              # App config (navigation, learningMethods registry)
├── store/               # Zustand stores (with persistence)
├── hooks/               # Custom hooks (useSpeech, useTimer, useSwipeGesture, etc.)
├── utils/               # Pure logic (srs, answerCheck, clozeGenerator, etc.)
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

# Run unit tests (watch mode)
npm test

# Run unit + smoke tests once, with the coverage gate
npm run test:coverage

# Run E2E tests
npx playwright test

# Lint code
npm run lint
```

## Continuous Integration

GitHub Actions (`.github/workflows/ci.yml`) runs on every pull request and on push to `main`:

- **lint** — `npm run lint`
- **build** — `npm run build`
- **test** — `npm run test:coverage` (unit + component render smoke tests, with a 100% function-coverage gate on the learning-method logic, configured in `vite.config.ts`)
- **e2e-smoke** — Playwright smoke verifying the Learn hub and each learning-method route render

## License

GPL-3.0

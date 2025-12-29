import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Center, Spinner } from '@chakra-ui/react'
import AppShell from '../components/common/AppShell'

// Lazy load pages
const HomePage = lazy(() => import('../pages/HomePage'))
const WordLearningPage = lazy(() => import('../pages/WordLearningPage'))
const PracticePage = lazy(() => import('../pages/PracticePage'))
const ProgressPage = lazy(() => import('../pages/ProgressPage'))
const SettingsPage = lazy(() => import('../pages/SettingsPage'))
const GamesPage = lazy(() => import('../pages/GamesPage'))
const WordScramblePage = lazy(() => import('../pages/GamesPage/WordScramble'))
const MatchingGamePage = lazy(() => import('../pages/GamesPage/MatchingGame'))

const LoadingFallback = () => (
  <Center h="100vh">
    <Spinner size="xl" color="brand.500" thickness="4px" />
  </Center>
)

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="learn" element={<WordLearningPage />} />
          <Route path="games" element={<GamesPage />} />
          <Route path="games/scramble" element={<WordScramblePage />} />
          <Route path="games/matching" element={<MatchingGamePage />} />
          <Route path="practice" element={<PracticePage />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

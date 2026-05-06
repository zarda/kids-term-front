import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import theme from './theme'
import AppRoutes from './routes'
import { useNotificationScheduler } from './hooks/useNotificationScheduler'
import { useAchievementNotification } from './hooks/useAchievementNotification'
import { useDailyReset } from './hooks/useDailyReset'

function NotificationScheduler() {
  useNotificationScheduler()
  return null
}

function AchievementNotifier() {
  useAchievementNotification()
  return null
}

function DailyReset() {
  useDailyReset()
  return null
}

function App() {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <DailyReset />
          <NotificationScheduler />
          <AchievementNotifier />
          <AppRoutes />
        </BrowserRouter>
      </ChakraProvider>
    </>
  )
}

export default App

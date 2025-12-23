import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import theme from './theme'
import AppRoutes from './routes'
import { useNotificationScheduler } from './hooks/useNotificationScheduler'

function NotificationScheduler() {
  useNotificationScheduler()
  return null
}

function App() {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <NotificationScheduler />
          <AppRoutes />
        </BrowserRouter>
      </ChakraProvider>
    </>
  )
}

export default App

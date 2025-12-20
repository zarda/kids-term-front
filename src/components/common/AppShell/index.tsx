import { Box, Flex, useBreakpointValue } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import TopNav from './TopNav'
import BottomTabBar from './BottomTabBar'
import SideNav from './SideNav'

export default function AppShell() {
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <Flex direction="column" minH="100vh">
      <TopNav />
      <Flex flex={1}>
        {!isMobile && <SideNav />}
        <Box
          as="main"
          flex={1}
          pb={isMobile ? '80px' : 0}
          pt={4}
          px={{ base: 4, md: 6 }}
          maxW={{ base: '100%', lg: '1200px' }}
          mx="auto"
          w="100%"
        >
          <Outlet />
        </Box>
      </Flex>
      {isMobile && <BottomTabBar />}
    </Flex>
  )
}

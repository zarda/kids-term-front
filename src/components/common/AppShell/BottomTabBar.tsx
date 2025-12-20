import { Box, Flex, IconButton, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FiHome, FiBook, FiBarChart2, FiSettings } from 'react-icons/fi'
import { useTranslation } from '../../../hooks/useTranslation'
import type { IconType } from 'react-icons'

interface TabItem {
  path: string
  labelKey: 'home' | 'practice' | 'progress' | 'settings'
  icon: IconType
}

const tabs: TabItem[] = [
  { path: '/', labelKey: 'home', icon: FiHome },
  { path: '/practice', labelKey: 'practice', icon: FiBook },
  { path: '/progress', labelKey: 'progress', icon: FiBarChart2 },
  { path: '/settings', labelKey: 'settings', icon: FiSettings },
]

export default function BottomTabBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      as="nav"
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg={bg}
      borderTop="1px"
      borderColor={borderColor}
      zIndex={10}
      pb="env(safe-area-inset-bottom)"
    >
      <Flex justify="space-around" align="center" py={2}>
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path
          const color = isActive ? 'brand.500' : 'gray.500'
          const label = t.nav[tab.labelKey]

          return (
            <VStack
              key={tab.path}
              spacing={0.5}
              cursor="pointer"
              onClick={() => navigate(tab.path)}
              role="button"
              aria-label={label}
            >
              <IconButton
                aria-label={label}
                icon={<tab.icon size={22} />}
                variant="ghost"
                color={color}
                size="sm"
                minW="44px"
                minH="44px"
                _hover={{ bg: 'transparent' }}
                _active={{ transform: 'scale(0.95)' }}
              />
              <Text fontSize="xs" color={color} fontWeight={isActive ? 'semibold' : 'normal'}>
                {label}
              </Text>
            </VStack>
          )
        })}
      </Flex>
    </Box>
  )
}

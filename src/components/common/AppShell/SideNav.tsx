import { Box, VStack, Button, useColorModeValue } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from '../../../hooks/useTranslation'
import { navItems } from '../../../config/navigation'

export default function SideNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      as="aside"
      w="220px"
      minH="calc(100vh - 60px)"
      bg={bg}
      borderRight="1px"
      borderColor={borderColor}
      py={4}
      px={3}
      display={{ base: 'none', md: 'block' }}
    >
      <VStack spacing={2} align="stretch">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const label = t.nav[item.labelKey]
          return (
            <Button
              key={item.path}
              leftIcon={<item.icon size={18} />}
              justifyContent="flex-start"
              variant={isActive ? 'solid' : 'ghost'}
              colorScheme={isActive ? 'blue' : 'gray'}
              onClick={() => navigate(item.path)}
              size="sm"
              w="100%"
              fontSize="sm"
              px={3}
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {label}
            </Button>
          )
        })}
      </VStack>
    </Box>
  )
}

import { Box, Flex, IconButton, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from '../../../hooks/useTranslation'
import { navItems } from '../../../config/navigation'

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
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const color = isActive ? 'brand.500' : 'gray.500'
          const label = t.nav[item.labelKey]

          return (
            <VStack
              key={item.path}
              spacing={0.5}
              cursor="pointer"
              onClick={() => navigate(item.path)}
              role="button"
              aria-label={label}
              flex={1}
              maxW="80px"
            >
              <IconButton
                aria-label={label}
                icon={<item.icon size={20} />}
                variant="ghost"
                color={color}
                size="sm"
                minW="40px"
                minH="40px"
                _hover={{ bg: 'transparent' }}
                _active={{ transform: 'scale(0.95)' }}
              />
              <Text
                fontSize="2xs"
                color={color}
                fontWeight={isActive ? 'semibold' : 'normal'}
                textAlign="center"
                noOfLines={1}
                maxW="100%"
              >
                {label}
              </Text>
            </VStack>
          )
        })}
      </Flex>
    </Box>
  )
}

import {
  Box,
  Flex,
  Heading,
  IconButton,
  Progress,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useProgressStore } from '../../../store/useProgressStore'

export default function TopNav() {
  const { colorMode, toggleColorMode } = useColorMode()
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const dailyGoal = useProgressStore((s) => s.dailyGoal)
  const todayWordsLearned = useProgressStore((s) => s.todayWordsLearned)
  const progressPercent = Math.min((todayWordsLearned / dailyGoal) * 100, 100)

  return (
    <Box
      as="header"
      bg={bg}
      borderBottom="1px"
      borderColor={borderColor}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex
        align="center"
        justify="space-between"
        px={{ base: 4, md: 6 }}
        py={3}
        maxW="1400px"
        mx="auto"
      >
        <Heading
          size="md"
          bgGradient="linear(to-r, brand.500, accent.500)"
          bgClip="text"
          fontWeight="bold"
        >
          KitsTerm
        </Heading>

        <Flex align="center" gap={4}>
          <Box w={{ base: '100px', md: '200px' }}>
            <Progress
              value={progressPercent}
              size="sm"
              borderRadius="full"
              colorScheme="green"
              bg={useColorModeValue('gray.100', 'gray.700')}
            />
          </Box>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
            onClick={toggleColorMode}
            variant="ghost"
            size="md"
          />
        </Flex>
      </Flex>
    </Box>
  )
}

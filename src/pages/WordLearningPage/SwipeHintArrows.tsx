import { Box, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import { animated, useSpring } from 'react-spring'
import { FiChevronLeft, FiChevronRight, FiCheck } from 'react-icons/fi'
import { useTranslation } from '../../hooks/useTranslation'

interface SwipeHintArrowsProps {
  visible: boolean
}

export function SwipeHintArrows({ visible }: SwipeHintArrowsProps) {
  const { t } = useTranslation()
  const hintBg = useColorModeValue('gray.50', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  // Main visibility animation
  const containerStyles = useSpring({
    opacity: visible ? 1 : 0,
    config: { tension: 200, friction: 25 },
  })

  // Left arrow pulsing (moving left)
  const leftPulse = useSpring({
    loop: visible,
    from: { x: 0 },
    to: visible ? { x: -5 } : { x: 0 },
    config: { duration: 600 },
    reverse: true,
  })

  // Right arrow pulsing (moving right)
  const rightPulse = useSpring({
    loop: visible,
    from: { x: 0 },
    to: visible ? { x: 5 } : { x: 0 },
    config: { duration: 600 },
    reverse: true,
  })

  if (!visible) return null

  return (
    <animated.div style={containerStyles}>
      <HStack justify="center" spacing={6}>
        {/* Left - Skip */}
        <animated.div style={{ x: leftPulse.x }}>
          <Flex
            align="center"
            bg={hintBg}
            px={3}
            py={1.5}
            borderRadius="full"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <Box color="gray.500" mr={1}>
              <FiChevronLeft size={18} />
            </Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.500">
              {t.learn.swipeHintSkip}
            </Text>
          </Flex>
        </animated.div>

        {/* Separator */}
        <Text color="gray.400" fontSize="xs">
          •
        </Text>

        {/* Right - Learned */}
        <animated.div style={{ x: rightPulse.x }}>
          <Flex
            align="center"
            bg={hintBg}
            px={3}
            py={1.5}
            borderRadius="full"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <Text fontSize="sm" fontWeight="medium" color="green.500">
              {t.learn.swipeHintLearned}
            </Text>
            <Box color="green.500" ml={1}>
              <FiCheck size={14} />
            </Box>
            <Box color="green.500">
              <FiChevronRight size={18} />
            </Box>
          </Flex>
        </animated.div>
      </HStack>
    </animated.div>
  )
}

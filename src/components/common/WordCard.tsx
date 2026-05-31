import { Card, CardBody, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { animated, useSpring } from 'react-spring'

export interface WordCardProps {
  term: string
  pronunciation: string
  definition: string
  example?: string
  /** Whether the back (definition) side is showing. */
  isFlipped: boolean
  /** Called when the card is tapped/clicked. */
  onFlip: () => void
  /** Hint text shown on the front face ("Tap to flip"). */
  tapHint: string
}

/**
 * Presentational flip card showing a word's term/pronunciation on the front and
 * its definition/example on the back. Tapping flips it. Used by the Smart Review
 * (SRS) page; the swipe-based flashcard page keeps its own gesture-enabled card.
 */
export default function WordCard({
  term,
  pronunciation,
  definition,
  example,
  isFlipped,
  onFlip,
  tapHint,
}: WordCardProps) {
  const cardBg = useColorModeValue('white', 'gray.800')

  const { transform } = useSpring({
    transform: `perspective(1000px) rotateY(${isFlipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })

  const isLongContent = term.length > 30 || definition.length > 20

  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
      <animated.div
        onClick={onFlip}
        style={{
          transform,
          transformStyle: 'preserve-3d',
          position: 'relative',
          width: '100%',
          height: isLongContent ? '380px' : '300px',
          cursor: 'pointer',
        }}
      >
        {/* Front */}
        <Card
          position="absolute"
          w="100%"
          h="100%"
          bg={cardBg}
          shadow="lg"
          borderRadius="2xl"
          sx={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <CardBody h="100%" display="flex" alignItems="center" justifyContent="center">
            <Flex direction="column" align="center" justify="center" py={4} px={4} maxW="100%">
              <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={2} wordBreak="break-word" lineHeight="1.4">
                {term}
              </Text>
              <Text fontSize="sm" color="gray.500" mb={3} textAlign="center" wordBreak="break-word">
                {pronunciation}
              </Text>
              <Text fontSize="xs" color="gray.400">
                {tapHint}
              </Text>
            </Flex>
          </CardBody>
        </Card>

        {/* Back */}
        <Card
          position="absolute"
          w="100%"
          h="100%"
          bg={cardBg}
          shadow="lg"
          borderRadius="2xl"
          sx={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <CardBody h="100%" display="flex" alignItems="center" justifyContent="center">
            <Flex direction="column" align="center" justify="center" py={4} px={4} maxW="100%">
              <Text fontSize="lg" fontWeight="bold" textAlign="center" color="brand.500" mb={3} wordBreak="break-word" lineHeight="1.4">
                {definition}
              </Text>
              {example && (
                <Text fontSize="xs" color="gray.500" textAlign="center" fontStyle="italic" wordBreak="break-word" lineHeight="1.3">
                  "{example}"
                </Text>
              )}
            </Flex>
          </CardBody>
        </Card>
      </animated.div>
    </div>
  )
}

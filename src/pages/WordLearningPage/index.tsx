import { useState } from 'react'
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  IconButton,
  Progress,
  Text,
  useColorModeValue,
  VStack,
  Badge,
} from '@chakra-ui/react'
import { animated, useSpring } from 'react-spring'
import { useDrag } from '@use-gesture/react'
import { FiChevronLeft, FiChevronRight, FiHeart, FiVolume2 } from 'react-icons/fi'
import { useProgressStore } from '../../store/useProgressStore'
import { useSpeech } from '../../hooks/useSpeech'
import { useTranslation } from '../../hooks/useTranslation'
import { useActiveLanguagePack } from '../../hooks/useActiveLanguagePack'

const AnimatedCard = animated(Card)

export default function WordLearningPage() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const { t } = useTranslation()
  const cardBg = useColorModeValue('white', 'gray.800')
  const { speak, isSpeaking } = useSpeech()

  // Get words from active language pack
  const { words, activePack } = useActiveLanguagePack()

  const incrementWordsLearned = useProgressStore((s) => s.incrementWordsLearned)

  const currentWord = words[currentIndex]
  const progress = words.length > 0 ? ((currentIndex + 1) / words.length) * 100 : 0

  // Card flip animation
  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(1000px) rotateY(${isFlipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })

  // Swipe gesture
  const [{ x, rotate }, api] = useSpring(() => ({
    x: 0,
    rotate: 0,
  }))

  const bind = useDrag(
    ({ active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
      const trigger = vx > 0.2 || Math.abs(mx) > 100

      if (!active && trigger && currentWord) {
        const dir = xDir < 0 ? -1 : 1
        api.start({
          x: dir * window.innerWidth,
          rotate: dir * 30,
          config: { friction: 50, tension: 200 },
          onRest: () => {
            if (dir === 1) {
              // Swiped right - mark as known
              incrementWordsLearned()
            }
            nextWord()
            setIsFlipped(false)
            api.start({ x: 0, rotate: 0, immediate: true })
          },
        })
      } else {
        api.start({
          x: active ? mx : 0,
          rotate: active ? mx / 20 : 0,
        })
      }
    },
    { filterTaps: true }
  )

  const handleFlip = () => setIsFlipped(!isFlipped)

  const handleSpeak = () => {
    if (!currentWord || !activePack) return
    // Speak the term in target language
    speak(currentWord.term, activePack.targetLanguage)
  }

  const nextWord = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    }
  }

  const previousWord = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }

  const toggleFavorite = () => {
    if (!currentWord) return
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(currentWord.id)) {
        next.delete(currentWord.id)
      } else {
        next.add(currentWord.id)
      }
      return next
    })
  }

  if (!currentWord || words.length === 0) {
    return (
      <VStack py={10} spacing={4}>
        <Heading size="md">{t.learn.noWords}</Heading>
        <Text color="gray.500">{t.learn.downloadPack}</Text>
      </VStack>
    )
  }

  const isFavorite = favorites.has(currentWord.id)

  return (
    <Box pb={8}>
      <VStack spacing={6}>
        {/* Header with language info */}
        {activePack && (
          <HStack w="100%" justify="center">
            <Badge colorScheme="blue" fontSize="md" px={3} py={1}>
              {activePack.flag} {t.common.learning} {activePack.name}
            </Badge>
          </HStack>
        )}

        {/* Progress */}
        <Box w="100%">
          <HStack justify="space-between" mb={2}>
            <Text fontSize="sm" color="gray.500">
              {currentIndex + 1} {t.learn.cardOf} {words.length}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {Math.round(progress)}%
            </Text>
          </HStack>
          <Progress value={progress} size="sm" borderRadius="full" colorScheme="blue" />
        </Box>

        {/* Flashcard */}
        <Box position="relative" w="100%" maxW="400px" h="300px" mx="auto" sx={{ perspective: '1000px' }}>
          <AnimatedCard
            {...bind()}
            style={{
              x,
              rotateZ: rotate,
              touchAction: 'none',
            }}
            position="absolute"
            w="100%"
            h="100%"
            bg={cardBg}
            shadow="lg"
            borderRadius="2xl"
            cursor="pointer"
            onClick={handleFlip}
          >
            {/* Front of card */}
            <animated.div
              style={{
                opacity: opacity.to((o) => 1 - o),
                transform,
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
              }}
            >
              <CardBody h="100%">
                <Flex direction="column" align="center" justify="center" h="100%">
                  <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb={2}>
                    {currentWord.term}
                  </Text>
                  <Text fontSize="lg" color="gray.500" mb={4}>
                    {currentWord.pronunciation}
                  </Text>
                  <Text fontSize="sm" color="gray.400">
                    {t.learn.tapToFlip}
                  </Text>
                </Flex>
              </CardBody>
            </animated.div>

            {/* Back of card */}
            <animated.div
              style={{
                opacity,
                transform: transform.to((t) => `${t} rotateY(180deg)`),
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
              }}
            >
              <CardBody h="100%">
                <Flex direction="column" align="center" justify="center" h="100%">
                  <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="brand.500" mb={4}>
                    {currentWord.definition}
                  </Text>
                  {currentWord.examples[0] && (
                    <Text fontSize="sm" color="gray.500" textAlign="center" fontStyle="italic">
                      "{currentWord.examples[0]}"
                    </Text>
                  )}
                </Flex>
              </CardBody>
            </animated.div>
          </AnimatedCard>
        </Box>

        {/* Swipe instructions */}
        <Text color="gray.500" fontSize="sm">
          {t.learn.swipeHint}
        </Text>

        {/* Controls */}
        <HStack spacing={4}>
          <IconButton
            aria-label={t.common.back}
            icon={<FiChevronLeft size={24} />}
            variant="ghost"
            size="lg"
            onClick={previousWord}
            isDisabled={currentIndex === 0}
          />

          <IconButton
            aria-label={t.learn.pronunciation}
            icon={<FiVolume2 size={24} />}
            colorScheme="blue"
            variant="outline"
            size="lg"
            onClick={handleSpeak}
            isLoading={isSpeaking}
          />

          <IconButton
            aria-label="Toggle favorite"
            icon={<FiHeart size={24} />}
            colorScheme={isFavorite ? 'red' : 'gray'}
            variant={isFavorite ? 'solid' : 'outline'}
            size="lg"
            onClick={toggleFavorite}
          />

          <IconButton
            aria-label={t.common.next}
            icon={<FiChevronRight size={24} />}
            variant="ghost"
            size="lg"
            onClick={nextWord}
            isDisabled={currentIndex === words.length - 1}
          />
        </HStack>

        {/* Category & Difficulty */}
        <HStack spacing={2}>
          <Badge colorScheme="gray" textTransform="capitalize">
            {currentWord.category}
          </Badge>
          <Badge
            colorScheme={
              currentWord.difficulty === 'beginner'
                ? 'green'
                : currentWord.difficulty === 'intermediate'
                ? 'yellow'
                : 'red'
            }
          >
            {currentWord.difficulty}
          </Badge>
        </HStack>
      </VStack>
    </Box>
  )
}

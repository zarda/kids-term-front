import { useState, useEffect, useCallback } from 'react'
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
  Button,
  Input,
  InputGroup,
  Collapse,
  Tooltip,
} from '@chakra-ui/react'
import { animated, useSpring } from 'react-spring'
import { useDrag } from '@use-gesture/react'
import { FiChevronLeft, FiChevronRight, FiHeart, FiVolume2, FiNavigation } from 'react-icons/fi'
import { useProgressStore } from '../../store/useProgressStore'
import { useSettingsStore } from '../../store/useSettingsStore'
import { useSpeech } from '../../hooks/useSpeech'
import { useTranslation } from '../../hooks/useTranslation'
import { useActiveLanguagePack } from '../../hooks/useActiveLanguagePack'

export default function WordLearningPage() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [showJumpInput, setShowJumpInput] = useState(false)
  const [jumpValue, setJumpValue] = useState('')
  const [hasInitialized, setHasInitialized] = useState(false)
  const { t } = useTranslation()
  const cardBg = useColorModeValue('white', 'gray.800')
  const { speak, isSpeaking } = useSpeech()
  const autoPlayAudio = useSettingsStore((s) => s.autoPlayAudio)

  // Get words from active language pack
  const { words, activePack, activePackId } = useActiveLanguagePack()

  const incrementWordsLearned = useProgressStore((s) => s.incrementWordsLearned)
  const setLastWordIndex = useProgressStore((s) => s.setLastWordIndex)
  const getLastWordIndex = useProgressStore((s) => s.getLastWordIndex)

  // Get saved position for current pack
  const savedIndex = activePackId ? getLastWordIndex(activePackId) : 0
  const hasSavedProgress = savedIndex > 0 && savedIndex < words.length

  // Save current position when index changes
  useEffect(() => {
    if (activePackId && hasInitialized) {
      setLastWordIndex(activePackId, currentIndex)
    }
  }, [currentIndex, activePackId, setLastWordIndex, hasInitialized])

  // Initialize - don't auto-jump, let user choose
  useEffect(() => {
    if (words.length > 0 && !hasInitialized) {
      setHasInitialized(true)
    }
  }, [words.length, hasInitialized])

  // Auto-play pronunciation when word changes
  useEffect(() => {
    if (autoPlayAudio && currentWord && activePack && hasInitialized) {
      speak(currentWord.term, activePack.targetLanguage)
    }
  }, [currentIndex, autoPlayAudio, hasInitialized])

  // Jump to saved position
  const handleResume = useCallback(() => {
    if (savedIndex > 0 && savedIndex < words.length) {
      setCurrentIndex(savedIndex)
      setIsFlipped(false)
    }
  }, [savedIndex, words.length])

  // Jump to specific card number
  const handleJumpToCard = useCallback(() => {
    const targetIndex = parseInt(jumpValue, 10) - 1 // Convert to 0-based
    if (!isNaN(targetIndex) && targetIndex >= 0 && targetIndex < words.length) {
      setCurrentIndex(targetIndex)
      setIsFlipped(false)
      setJumpValue('')
      setShowJumpInput(false)
    }
  }, [jumpValue, words.length])

  const currentWord = words[currentIndex]
  const progress = words.length > 0 ? ((currentIndex + 1) / words.length) * 100 : 0

  // Card flip animation
  const { transform } = useSpring({
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

  // Determine if content is long
  const isLongContent = currentWord.term.length > 30 || currentWord.definition.length > 20

  return (
    <Box pb={8}>
      <VStack spacing={6}>
        {/* Header with language info */}
        {activePack && (
          <HStack w="100%" justify="center">
            <Badge
              colorScheme="blue"
              fontSize={{ base: 'xs', md: 'sm' }}
              px={{ base: 2, md: 3 }}
              py={1}
              maxW={{ base: '200px', md: '300px' }}
            >
              {activePack.flag} {activePack.name}
            </Badge>
          </HStack>
        )}

        {/* Progress */}
        <Box w="100%">
          <HStack justify="space-between" mb={2}>
            <HStack spacing={2}>
              <Button
                size="xs"
                variant="ghost"
                color="gray.500"
                fontWeight="normal"
                onClick={() => setShowJumpInput(!showJumpInput)}
                rightIcon={<FiNavigation size={12} />}
                _hover={{ color: 'blue.500' }}
              >
                {currentIndex + 1} {t.learn.cardOf} {words.length}
              </Button>
            </HStack>
            <HStack spacing={2}>
              {hasSavedProgress && currentIndex === 0 && (
                <Button
                  size="xs"
                  colorScheme="green"
                  variant="outline"
                  onClick={handleResume}
                >
                  {t.learn.resumeFromLast} ({savedIndex + 1})
                </Button>
              )}
              <Text fontSize="sm" color="gray.500">
                {Math.round(progress)}%
              </Text>
            </HStack>
          </HStack>
          <Progress value={progress} size="sm" borderRadius="full" colorScheme="blue" />

          {/* Jump to card input */}
          <Collapse in={showJumpInput} animateOpacity>
            <Box mt={3} p={3} bg={cardBg} borderRadius="md" shadow="sm">
              <Text fontSize="sm" mb={2} fontWeight="medium">
                {t.learn.jumpToCard}
              </Text>
              <HStack spacing={2}>
                <InputGroup size="sm" flex={1}>
                  <Input
                    type="number"
                    min={1}
                    max={words.length}
                    placeholder={`1 - ${words.length}`}
                    value={jumpValue}
                    onChange={(e) => setJumpValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleJumpToCard()}
                    autoFocus
                  />
                </InputGroup>
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={handleJumpToCard}
                  isDisabled={!jumpValue}
                >
                  {t.learn.goToCard}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowJumpInput(false)}
                >
                  {t.common.cancel}
                </Button>
              </HStack>
            </Box>
          </Collapse>
        </Box>

        {/* Flashcard */}
        <Box w="100%" maxW="400px" h={isLongContent ? '380px' : '300px'} mx="auto" sx={{ perspective: '1000px' }}>
          <animated.div
            {...bind()}
            style={{
              x,
              rotateZ: rotate,
              transform,
              touchAction: 'none',
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
              cursor: 'pointer',
            }}
            onClick={handleFlip}
          >
            {/* Front of card */}
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
              }}
            >
              <CardBody h="100%" display="flex" alignItems="center" justifyContent="center">
                <Flex direction="column" align="center" justify="center" py={4} px={4} maxW="100%">
                  <Text
                    fontSize={currentWord.term.length > 40 ? 'sm' : currentWord.term.length > 25 ? 'md' : currentWord.term.length > 15 ? 'lg' : '2xl'}
                    fontWeight="bold"
                    textAlign="center"
                    mb={2}
                    wordBreak="break-word"
                    lineHeight="1.4"
                  >
                    {currentWord.term}
                  </Text>
                  <Text
                    fontSize={currentWord.pronunciation.length > 50 ? 'xs' : 'sm'}
                    color="gray.500"
                    mb={3}
                    textAlign="center"
                    wordBreak="break-word"
                  >
                    {currentWord.pronunciation}
                  </Text>
                  <Text fontSize="xs" color="gray.400">
                    {t.learn.tapToFlip}
                  </Text>
                </Flex>
              </CardBody>
            </Card>

            {/* Back of card */}
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
                  <Text
                    fontSize={currentWord.definition.length > 30 ? 'sm' : currentWord.definition.length > 15 ? 'md' : 'lg'}
                    fontWeight="bold"
                    textAlign="center"
                    color="brand.500"
                    mb={3}
                    wordBreak="break-word"
                    lineHeight="1.4"
                  >
                    {currentWord.definition}
                  </Text>
                  {currentWord.examples[0] && (
                    <Text
                      fontSize="xs"
                      color="gray.500"
                      textAlign="center"
                      fontStyle="italic"
                      wordBreak="break-word"
                      lineHeight="1.3"
                    >
                      "{currentWord.examples[0]}"
                    </Text>
                  )}
                </Flex>
              </CardBody>
            </Card>
          </animated.div>
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

          <Tooltip
            label={t.learn.pronunciationWarning}
            fontSize="xs"
            hasArrow
            placement="top"
            bg="orange.500"
            closeDelay={2000}
            closeOnClick
          >
            <IconButton
              aria-label={t.learn.pronunciation}
              icon={<FiVolume2 size={24} />}
              colorScheme="blue"
              variant="outline"
              size="lg"
              onClick={handleSpeak}
              isLoading={isSpeaking}
            />
          </Tooltip>

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

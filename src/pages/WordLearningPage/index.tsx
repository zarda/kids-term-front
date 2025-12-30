import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react'
import { animated, useSpring } from 'react-spring'
import { useDrag } from '@use-gesture/react'
import { FiChevronLeft, FiChevronRight, FiHeart, FiVolume2, FiNavigation, FiX, FiClock } from 'react-icons/fi'
import { useSearchParams } from 'react-router-dom'
import { useProgressStore } from '../../store/useProgressStore'
import { useSettingsStore } from '../../store/useSettingsStore'
import { useFavoritesStore } from '../../store/useFavoritesStore'
import { useSpeech } from '../../hooks/useSpeech'
import { useTranslation } from '../../hooks/useTranslation'
import { useActiveLanguagePack } from '../../hooks/useActiveLanguagePack'
import { useSwipeOnboarding } from '../../hooks/useSwipeOnboarding'
import { SwipeHintArrows } from './SwipeHintArrows'

export default function WordLearningPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const favoritesMode = searchParams.get('favorites') === 'true'

  // Get words from active language pack (needed early for indexKey)
  const { words, activePack, activePackId } = useActiveLanguagePack()

  // Create a unique key for storing index - different for favorites vs regular mode
  const indexKey = activePackId ? (favoritesMode ? `${activePackId}:favorites` : activePackId) : null

  const [isFlipped, setIsFlipped] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showJumpInput, setShowJumpInput] = useState(false)
  const [jumpValue, setJumpValue] = useState('')
  const [hasInitialized, setHasInitialized] = useState(false)
  const { t } = useTranslation()
  const cardBg = useColorModeValue('white', 'gray.800')
  const { speak, isSpeaking } = useSpeech()
  const autoPlayAudio = useSettingsStore((s) => s.autoPlayAudio)

  // Favorites store
  const toggleFavoriteInStore = useFavoritesStore((s) => s.toggleFavorite)
  const favoritesByPack = useFavoritesStore((s) => s.favoritesByPack)
  const getFavorites = useFavoritesStore((s) => s.getFavorites)

  // Filter words based on favorites mode
  const displayWords = useMemo(() => {
    if (!favoritesMode || !activePackId) return words
    const favoriteIds = getFavorites(activePackId)
    return words.filter((word) => favoriteIds.includes(word.id))
  }, [favoritesMode, activePackId, words, getFavorites])

  // Swipe hint arrows (daily reset)
  const { showHints, recordSwipe } = useSwipeOnboarding()

  const incrementWordsLearned = useProgressStore((s) => s.incrementWordsLearned)
  const setLastWordIndex = useProgressStore((s) => s.setLastWordIndex)
  const getLastWordIndex = useProgressStore((s) => s.getLastWordIndex)
  const addTimeSpent = useProgressStore((s) => s.addTimeSpent)
  const addToWordIndexHistory = useProgressStore((s) => s.addToWordIndexHistory)
  const wordIndexHistory = useProgressStore((s) => s.wordIndexHistory)

  // Get history for current key
  const history = indexKey ? (wordIndexHistory[indexKey] ?? []) : []

  // Track time spent on this page
  const pageStartTime = useRef<Date>(new Date())

  // Get saved position for current pack (uses separate keys for favorites vs regular mode)
  const savedIndex = indexKey ? getLastWordIndex(indexKey) : 0
  const hasSavedProgress = savedIndex > 0 && savedIndex < displayWords.length

  // Record time spent when leaving the page
  useEffect(() => {
    pageStartTime.current = new Date()

    return () => {
      const secondsSpent = Math.floor(
        (new Date().getTime() - pageStartTime.current.getTime()) / 10000
      )
      if (secondsSpent >= 2) {
        const minutesSpent = Math.ceil(secondsSpent / 6)
        addTimeSpent(minutesSpent)
      }
    }
  }, [addTimeSpent])

  // Track previous index to detect actual navigation
  const prevIndexRef = useRef<number | null>(null)

  // Save current position when index changes (for resume functionality)
  // Only save when user actually navigates, not on initial mount
  useEffect(() => {
    if (indexKey && hasInitialized) {
      // Only save if this is an actual navigation (not first render after init)
      if (prevIndexRef.current !== null && prevIndexRef.current !== currentIndex) {
        setLastWordIndex(indexKey, currentIndex)
      }
      prevIndexRef.current = currentIndex
    }
  }, [currentIndex, indexKey, setLastWordIndex, hasInitialized])

  // Use refs to access current values in cleanup functions
  const currentIndexRef = useRef(currentIndex)
  const indexKeyRef = useRef(indexKey)
  const hasInitializedRef = useRef(hasInitialized)
  useEffect(() => {
    currentIndexRef.current = currentIndex
    indexKeyRef.current = indexKey
    hasInitializedRef.current = hasInitialized
  }, [currentIndex, indexKey, hasInitialized])

  // Save to history when leaving page (only on unmount)
  useEffect(() => {
    return () => {
      if (indexKeyRef.current && hasInitializedRef.current && currentIndexRef.current > 0) {
        addToWordIndexHistory(indexKeyRef.current, currentIndexRef.current)
      }
    }
  }, [addToWordIndexHistory])

  // Save to history when switching modes (before mode changes)
  useEffect(() => {
    return () => {
      if (indexKeyRef.current && hasInitializedRef.current && currentIndexRef.current > 0) {
        addToWordIndexHistory(indexKeyRef.current, currentIndexRef.current)
      }
    }
  }, [favoritesMode, addToWordIndexHistory])

  // Initialize - don't auto-jump, let user choose
  useEffect(() => {
    if (displayWords.length > 0 && !hasInitialized) {
      setHasInitialized(true)
    }
  }, [displayWords.length, hasInitialized])

  // Reset index when switching modes or when displayWords changes
  useEffect(() => {
    setCurrentIndex(0)
    setIsFlipped(false)
    prevIndexRef.current = null // Reset tracking so we don't save on mode switch
  }, [favoritesMode])

  // Auto-play pronunciation when word changes
  // Don't auto-play when user has saved progress and is at index 0 (waiting to decide to resume)
  useEffect(() => {
    const waitingToResume = hasSavedProgress && currentIndex === 0
    if (autoPlayAudio && currentWord && activePack && hasInitialized && !waitingToResume) {
      speak(currentWord.term, activePack.targetLanguage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, autoPlayAudio, hasInitialized, hasSavedProgress])

  // Jump to saved position
  const handleResume = useCallback(() => {
    if (savedIndex > 0 && savedIndex < displayWords.length) {
      setCurrentIndex(savedIndex)
      setIsFlipped(false)
    }
  }, [savedIndex, displayWords.length])

  // Jump to specific card number
  const handleJumpToCard = useCallback(() => {
    const targetIndex = parseInt(jumpValue, 10) - 1 // Convert to 0-based
    if (!isNaN(targetIndex) && targetIndex >= 0 && targetIndex < displayWords.length) {
      setCurrentIndex(targetIndex)
      setIsFlipped(false)
      setJumpValue('')
      setShowJumpInput(false)
    }
  }, [jumpValue, displayWords.length])

  const currentWord = displayWords[currentIndex]
  const progress = displayWords.length > 0 ? ((currentIndex + 1) / displayWords.length) * 100 : 0

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
            recordSwipe()
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
    if (currentIndex < displayWords.length - 1) {
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
    if (!currentWord || !activePackId) return
    toggleFavoriteInStore(activePackId, currentWord.id)
  }

  // Exit favorites mode
  const exitFavoritesMode = () => {
    setSearchParams({})
  }

  if (!currentWord || displayWords.length === 0) {
    return (
      <VStack py={10} spacing={4}>
        <Heading size="md">{favoritesMode ? t.favorites.noFavorites : t.learn.noWords}</Heading>
        <Text color="gray.500">{favoritesMode ? '' : t.learn.downloadPack}</Text>
        {favoritesMode && (
          <Button colorScheme="blue" onClick={exitFavoritesMode}>
            {t.favorites.allWords}
          </Button>
        )}
      </VStack>
    )
  }

  const isFavorite = activePackId && currentWord
    ? (favoritesByPack[activePackId] ?? []).includes(currentWord.id)
    : false

  // Determine if content is long
  const isLongContent = currentWord.term.length > 30 || currentWord.definition.length > 20

  return (
    <Box pb={8}>
      <VStack spacing={6}>
        {/* Header with language info */}
        {activePack && (
          <HStack w="100%" justify="center" spacing={2}>
            <Badge
              colorScheme="blue"
              fontSize={{ base: 'xs', md: 'sm' }}
              px={{ base: 2, md: 3 }}
              py={1}
              maxW={{ base: '200px', md: '300px' }}
            >
              {activePack.flag} {activePack.name}
            </Badge>
            {favoritesMode && (
              <Badge
                colorScheme="red"
                fontSize={{ base: 'xs', md: 'sm' }}
                px={{ base: 2, md: 3 }}
                py={1}
                cursor="pointer"
                onClick={exitFavoritesMode}
              >
                <HStack spacing={1}>
                  <FiHeart size={12} />
                  <Text>{t.favorites.myFavorites}</Text>
                  <FiX size={12} />
                </HStack>
              </Badge>
            )}
          </HStack>
        )}

        {/* Progress */}
        <Box w="100%">
          <HStack justify="space-between" mb={2}>
            <HStack spacing={1}>
              <Button
                size="xs"
                variant="ghost"
                color="gray.500"
                fontWeight="normal"
                onClick={() => setShowJumpInput(!showJumpInput)}
                rightIcon={<FiNavigation size={12} />}
                _hover={{ color: 'blue.500' }}
              >
                {currentIndex + 1} {t.learn.cardOf} {displayWords.length}
              </Button>
              {history.length > 1 && (
                <Menu>
                  <Tooltip label={t.learn.recentPositions} placement="top" hasArrow>
                    <MenuButton
                      as={IconButton}
                      aria-label={t.learn.recentPositions}
                      icon={<FiClock size={14} />}
                      size="xs"
                      variant="ghost"
                      color="gray.500"
                      _hover={{ color: 'blue.500' }}
                    />
                  </Tooltip>
                  <MenuList minW="150px">
                    <Text px={3} py={1} fontSize="xs" fontWeight="bold" color="gray.500">
                      {t.learn.recentPositions}
                    </Text>
                    <MenuDivider />
                    {history.map((item, idx) => {
                      const word = displayWords[item.index]
                      if (!word) return null
                      return (
                        <MenuItem
                          key={idx}
                          onClick={() => {
                            setCurrentIndex(item.index)
                            setIsFlipped(false)
                          }}
                          fontSize="sm"
                          bg={item.index === currentIndex ? 'blue.50' : undefined}
                          _dark={{ bg: item.index === currentIndex ? 'blue.900' : undefined }}
                        >
                          {item.index + 1}. {word.term.length > 15 ? word.term.slice(0, 15) + '...' : word.term}
                        </MenuItem>
                      )
                    })}
                  </MenuList>
                </Menu>
              )}
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
                    max={displayWords.length}
                    placeholder={`1 - ${displayWords.length}`}
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

        {/* Swipe hints - show only at start of each day */}
        <SwipeHintArrows visible={showHints} />

        {/* Controls */}
        <HStack spacing={4}>
          <Tooltip label={t.common.back} placement="top" hasArrow>
            <IconButton
              aria-label={t.common.back}
              icon={<FiChevronLeft size={24} />}
              variant="ghost"
              size="lg"
              onClick={previousWord}
              isDisabled={currentIndex === 0}
            />
          </Tooltip>

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

          <Tooltip label={t.favorites.toggleFavorite} placement="top" hasArrow>
            <IconButton
              aria-label={t.favorites.toggleFavorite}
              icon={<FiHeart size={24} />}
              colorScheme={isFavorite ? 'red' : 'gray'}
              variant={isFavorite ? 'solid' : 'outline'}
              size="lg"
              onClick={toggleFavorite}
            />
          </Tooltip>

          <Tooltip label={t.common.next} placement="top" hasArrow>
            <IconButton
              aria-label={t.common.next}
              icon={<FiChevronRight size={24} />}
              variant="ghost"
              size="lg"
              onClick={nextWord}
              isDisabled={currentIndex === displayWords.length - 1}
            />
          </Tooltip>
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

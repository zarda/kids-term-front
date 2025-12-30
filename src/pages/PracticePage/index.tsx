import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  Tooltip,
  useColorModeValue,
  VStack,
  Badge,
} from '@chakra-ui/react'
import { FiCheck, FiX, FiVolume2, FiHeart } from 'react-icons/fi'
import { useProgressStore } from '../../store/useProgressStore'
import { useSettingsStore } from '../../store/useSettingsStore'
import { useFavoritesStore } from '../../store/useFavoritesStore'
import { useTimer } from '../../hooks/useTimer'
import { useSpeech } from '../../hooks/useSpeech'
import { useTranslation } from '../../hooks/useTranslation'
import { useActiveLanguagePack } from '../../hooks/useActiveLanguagePack'
import { generateExercise, type Exercise } from '../../utils/exerciseGenerator'
import type { ExerciseType } from '../../types/exercise.types'

export default function PracticePage() {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [exerciseType, setExerciseType] = useState<ExerciseType>('multiple-choice')
  const [useFavoritesOnly, setUseFavoritesOnly] = useState(false)

  const { t } = useTranslation()
  const cardBg = useColorModeValue('white', 'gray.800')
  const correctBg = useColorModeValue('green.50', 'green.900')
  const incorrectBg = useColorModeValue('red.50', 'red.900')

  // Get words from active language pack
  const { words, activePack, activePackId } = useActiveLanguagePack()

  // Favorites
  const getFavorites = useFavoritesStore((s) => s.getFavorites)
  const favoriteIds = useMemo(
    () => (activePackId ? getFavorites(activePackId) : []),
    [activePackId, getFavorites]
  )
  const favoritesCount = favoriteIds.length

  // Filter words based on favorites mode
  const practiceWords = useMemo(() => {
    if (!useFavoritesOnly) return words
    return words.filter((word) => favoriteIds.includes(word.id))
  }, [useFavoritesOnly, words, favoriteIds])

  const incrementExercisesCompleted = useProgressStore((s) => s.incrementExercisesCompleted)
  const recordCorrectAnswer = useProgressStore((s) => s.recordCorrectAnswer)
  const recordIncorrectAnswer = useProgressStore((s) => s.recordIncorrectAnswer)
  const addTimeSpent = useProgressStore((s) => s.addTimeSpent)
  const exerciseTimeLimit = useSettingsStore((s) => s.exerciseTimeLimit)

  // Track session start time for time achievements
  const sessionStartTime = useRef<Date | null>(null)
  const { speak, isSpeaking } = useSpeech()

  const { timeLeft, isRunning, start, reset, formatTime } = useTimer(exerciseTimeLimit)

  const getWordById = useCallback(
    (id: string) => practiceWords.find((w) => w.id === id),
    [practiceWords]
  )

  const loadNextExercise = useCallback(() => {
    const exercise = generateExercise(practiceWords, exerciseType)
    setCurrentExercise(exercise)
    setSelectedAnswer(null)
    setShowResult(false)
    reset(exerciseTimeLimit)
    start()
  }, [practiceWords, exerciseType, exerciseTimeLimit, reset, start])

  const handleAnswer = useCallback(
    (answer: string) => {
      if (showResult || !currentExercise) return

      setSelectedAnswer(answer)
      setShowResult(true)

      const isCorrect = answer === currentExercise.correctAnswer
      setScore((prev) => ({
        correct: prev.correct + (isCorrect ? 1 : 0),
        total: prev.total + 1,
      }))

      incrementExercisesCompleted()

      if (isCorrect) {
        recordCorrectAnswer()
      } else {
        recordIncorrectAnswer()
      }
    },
    [showResult, currentExercise, incrementExercisesCompleted, recordCorrectAnswer, recordIncorrectAnswer]
  )

  // Auto-submit on timeout
  useEffect(() => {
    if (timeLeft === 0 && isRunning && !showResult && currentExercise) {
      handleAnswer('')
    }
  }, [timeLeft, isRunning, showResult, currentExercise, handleAnswer])

  const handlePlayAudio = () => {
    if (currentExercise && activePack) {
      const word = getWordById(currentExercise.wordId)
      if (word) {
        speak(word.term, activePack.targetLanguage)
      }
    }
  }

  const startSession = (type: ExerciseType) => {
    setExerciseType(type)
    setSessionStarted(true)
    setScore({ correct: 0, total: 0 })
    sessionStartTime.current = new Date()
    const exercise = generateExercise(practiceWords, type)
    setCurrentExercise(exercise)
    reset(exerciseTimeLimit)
    start()
  }

  const endSession = () => {
    // Calculate and record time spent
    if (sessionStartTime.current) {
      const secondsSpent = Math.floor(
        (new Date().getTime() - sessionStartTime.current.getTime()) / 10000
      )
      if (secondsSpent >= 2) {
        const minutesSpent = Math.ceil(secondsSpent / 6)
        addTimeSpent(minutesSpent)
      }
      sessionStartTime.current = null
    }

    setSessionStarted(false)
    setCurrentExercise(null)
    reset()
  }

  // Check if we have enough words
  const hasEnoughWords = practiceWords.length >= 4
  const hasEnoughFavorites = favoritesCount >= 4

  if (words.length < 4) {
    return (
      <VStack py={10} spacing={4}>
        <Heading size="md">{t.practice.notEnoughWords}</Heading>
        <Text color="gray.500" textAlign="center">
          {t.practice.notEnoughWordsDesc}
        </Text>
      </VStack>
    )
  }

  // Show message when favorites mode is on but not enough favorites
  if (useFavoritesOnly && !hasEnoughWords) {
    return (
      <VStack py={10} spacing={4}>
        <Heading size="md">{t.favorites.notEnoughFavorites}</Heading>
        <Text color="gray.500" textAlign="center">
          {t.favorites.favoritesCount.replace('{count}', String(favoritesCount))}
        </Text>
        <Button colorScheme="blue" onClick={() => setUseFavoritesOnly(false)}>
          {t.favorites.allWords}
        </Button>
      </VStack>
    )
  }

  // Session start screen
  if (!sessionStarted) {
    return (
      <Box pb={8}>
        <VStack spacing={6}>
          <Heading size="lg">{t.practice.title}</Heading>

          {activePack && (
            <Badge
              colorScheme="blue"
              fontSize={{ base: 'xs', md: 'sm' }}
              px={{ base: 2, md: 3 }}
              py={1}
              maxW={{ base: '250px', md: '350px' }}
            >
              {activePack.flag} {activePack.name}
            </Badge>
          )}

          <Text color="gray.500" textAlign="center">
            {t.practice.subtitle}
          </Text>

          {/* Favorites Toggle */}
          {favoritesCount > 0 && (
            <ButtonGroup size="sm" isAttached variant="outline">
              <Button
                colorScheme={!useFavoritesOnly ? 'blue' : 'gray'}
                variant={!useFavoritesOnly ? 'solid' : 'outline'}
                onClick={() => setUseFavoritesOnly(false)}
              >
                {t.favorites.allWords}
              </Button>
              <Tooltip
                label={!hasEnoughFavorites ? t.favorites.notEnoughFavorites : ''}
                isDisabled={hasEnoughFavorites}
              >
                <Button
                  colorScheme={useFavoritesOnly ? 'red' : 'gray'}
                  variant={useFavoritesOnly ? 'solid' : 'outline'}
                  onClick={() => hasEnoughFavorites && setUseFavoritesOnly(true)}
                  leftIcon={<FiHeart />}
                  opacity={hasEnoughFavorites ? 1 : 0.5}
                  cursor={hasEnoughFavorites ? 'pointer' : 'not-allowed'}
                >
                  {t.favorites.myFavorites} ({favoritesCount})
                </Button>
              </Tooltip>
            </ButtonGroup>
          )}

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%" maxW="600px">
            <Card
              bg={cardBg}
              shadow="card"
              cursor="pointer"
              _hover={{ shadow: 'cardHover', transform: 'translateY(-2px)' }}
              transition="all 0.2s"
              onClick={() => startSession('multiple-choice')}
            >
              <CardBody>
                <VStack spacing={3}>
                  <Text fontSize="2xl">📝</Text>
                  <Text fontWeight="bold">{t.practice.multipleChoice}</Text>
                  <Text fontSize="sm" color="gray.500" textAlign="center">
                    {t.practice.multipleChoiceDesc}
                  </Text>
                </VStack>
              </CardBody>
            </Card>

            <Card
              bg={cardBg}
              shadow="card"
              cursor="pointer"
              _hover={{ shadow: 'cardHover', transform: 'translateY(-2px)' }}
              transition="all 0.2s"
              onClick={() => startSession('listening')}
            >
              <CardBody>
                <VStack spacing={3}>
                  <Text fontSize="2xl">🎧</Text>
                  <Text fontWeight="bold">{t.practice.listening}</Text>
                  <Text fontSize="sm" color="gray.500" textAlign="center">
                    {t.practice.listeningDesc}
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>

          {score.total > 0 && (
            <Card bg={cardBg} w="100%" maxW="400px">
              <CardBody>
                <VStack>
                  <Text fontWeight="medium">{t.practice.lastSession}</Text>
                  <Text fontSize="2xl" fontWeight="bold" color="brand.500">
                    {score.correct} / {score.total}
                  </Text>
                  <Text color="gray.500">
                    {Math.round((score.correct / score.total) * 100)}% {t.practice.accuracy}
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          )}
        </VStack>
      </Box>
    )
  }

  // Exercise screen
  if (!currentExercise) {
    return (
      <VStack py={10}>
        <Text>{t.practice.loadingExercise}</Text>
      </VStack>
    )
  }

  const word = getWordById(currentExercise.wordId)

  return (
    <Box pb={8}>
      <VStack spacing={6}>
        {/* Header */}
        <HStack w="100%" justify="space-between">
          <Button variant="ghost" onClick={endSession}>
            {t.practice.endSession}
          </Button>
          <HStack>
            <Text fontWeight="bold" color="brand.500">
              {score.correct}
            </Text>
            <Text color="gray.500">/ {score.total}</Text>
          </HStack>
          <CircularProgress
            value={(timeLeft / exerciseTimeLimit) * 100}
            color={timeLeft <= 10 ? 'red.400' : 'brand.500'}
            size="50px"
          >
            <CircularProgressLabel>{formatTime(timeLeft)}</CircularProgressLabel>
          </CircularProgress>
        </HStack>

        {/* Question */}
        <Card bg={cardBg} w="100%" shadow="card">
          <CardBody>
            <VStack spacing={4}>
              {exerciseType === 'listening' && (
                <Button
                  leftIcon={<FiVolume2 />}
                  colorScheme="blue"
                  size="lg"
                  onClick={handlePlayAudio}
                  isLoading={isSpeaking}
                >
                  {t.practice.playAudio}
                </Button>
              )}
              <Text fontSize="xl" fontWeight="medium" textAlign="center">
                {exerciseType === 'listening'
                  ? t.practice.listenAndSelect
                  : t.practice.whatDoesMean.replace('{term}', currentExercise.question)}
              </Text>
              {exerciseType !== 'listening' && word && (
                <Text color="gray.500">{word.pronunciation}</Text>
              )}
            </VStack>
          </CardBody>
        </Card>

        {/* Options */}
        <VStack w="100%" spacing={3}>
          {currentExercise.options.map((option, idx) => {
            const isSelected = selectedAnswer === option
            const isCorrect = option === currentExercise.correctAnswer
            let bg = cardBg
            let borderColor = 'transparent'

            if (showResult) {
              if (isCorrect) {
                bg = correctBg
                borderColor = 'green.500'
              } else if (isSelected && !isCorrect) {
                bg = incorrectBg
                borderColor = 'red.500'
              }
            } else if (isSelected) {
              borderColor = 'brand.500'
            }

            return (
              <Card
                key={idx}
                w="100%"
                bg={bg}
                border="2px"
                borderColor={borderColor}
                cursor={showResult ? 'default' : 'pointer'}
                onClick={() => !showResult && handleAnswer(option)}
                _hover={!showResult ? { borderColor: 'brand.300' } : {}}
                transition="all 0.2s"
              >
                <CardBody py={4}>
                  <HStack justify="space-between">
                    <Text>{option}</Text>
                    {showResult && isCorrect && <Icon as={FiCheck} color="green.500" boxSize={5} />}
                    {showResult && isSelected && !isCorrect && (
                      <Icon as={FiX} color="red.500" boxSize={5} />
                    )}
                  </HStack>
                </CardBody>
              </Card>
            )
          })}
        </VStack>

        {/* Next button */}
        {showResult && (
          <Button colorScheme="blue" size="lg" onClick={loadNextExercise} w="100%" maxW="400px">
            {t.practice.nextQuestion}
          </Button>
        )}
      </VStack>
    </Box>
  )
}

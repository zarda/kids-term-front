import { useState, useEffect, useCallback } from 'react'
import {
  Box,
  Button,
  Card,
  CardBody,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
  Badge,
} from '@chakra-ui/react'
import { FiCheck, FiX, FiVolume2 } from 'react-icons/fi'
import { useProgressStore } from '../../store/useProgressStore'
import { useSettingsStore } from '../../store/useSettingsStore'
import { useTimer } from '../../hooks/useTimer'
import { useSpeech } from '../../hooks/useSpeech'
import { useTranslation } from '../../hooks/useTranslation'
import { useActiveLanguagePack } from '../../hooks/useActiveLanguagePack'
import type { ExerciseType } from '../../types/exercise.types'
import type { LanguageWord } from '../../types/language.types'

interface Exercise {
  id: string
  type: ExerciseType
  wordId: string
  question: string
  options: string[]
  correctAnswer: string
  timeLimit: number
}

function generateExercise(words: LanguageWord[], type: ExerciseType): Exercise | null {
  if (words.length < 4) return null

  const targetWord = words[Math.floor(Math.random() * words.length)]
  const otherWords = words.filter((w) => w.id !== targetWord.id)
  const shuffled = otherWords.sort(() => Math.random() - 0.5).slice(0, 3)
  const options = [...shuffled.map((w) => w.definition), targetWord.definition].sort(
    () => Math.random() - 0.5
  )

  return {
    id: `ex-${Date.now()}`,
    type,
    wordId: targetWord.id,
    question: `"${targetWord.term}"`,
    options,
    correctAnswer: targetWord.definition,
    timeLimit: 30,
  }
}

export default function PracticePage() {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [exerciseType, setExerciseType] = useState<ExerciseType>('multiple-choice')

  const { t } = useTranslation()
  const cardBg = useColorModeValue('white', 'gray.800')
  const correctBg = useColorModeValue('green.50', 'green.900')
  const incorrectBg = useColorModeValue('red.50', 'red.900')

  // Get words from active language pack
  const { words, activePack } = useActiveLanguagePack()

  const incrementExercisesCompleted = useProgressStore((s) => s.incrementExercisesCompleted)
  const recordCorrectAnswer = useProgressStore((s) => s.recordCorrectAnswer)
  const exerciseTimeLimit = useSettingsStore((s) => s.exerciseTimeLimit)
  const { speak, isSpeaking } = useSpeech()

  const { timeLeft, isRunning, start, reset, formatTime } = useTimer(exerciseTimeLimit)

  const getWordById = useCallback(
    (id: string) => words.find((w) => w.id === id),
    [words]
  )

  const loadNextExercise = useCallback(() => {
    const exercise = generateExercise(words, exerciseType)
    setCurrentExercise(exercise)
    setSelectedAnswer(null)
    setShowResult(false)
    reset(exerciseTimeLimit)
    start()
  }, [words, exerciseType, exerciseTimeLimit, reset, start])

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
      }
    },
    [showResult, currentExercise, incrementExercisesCompleted, recordCorrectAnswer]
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
    const exercise = generateExercise(words, type)
    setCurrentExercise(exercise)
    reset(exerciseTimeLimit)
    start()
  }

  const endSession = () => {
    setSessionStarted(false)
    setCurrentExercise(null)
    reset()
  }

  // Check if we have enough words
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

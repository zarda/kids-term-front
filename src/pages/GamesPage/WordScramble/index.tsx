import { useState, useCallback } from 'react'
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
  useColorModeValue,
  Badge,
  Wrap,
  WrapItem,
  Progress,
} from '@chakra-ui/react'
import { FiVolume2, FiArrowLeft, FiRefreshCw, FiHelpCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../../hooks/useTranslation'
import { useActiveLanguagePack } from '../../../hooks/useActiveLanguagePack'
import { useSpeech } from '../../../hooks/useSpeech'
import { useProgressStore } from '../../../store/useProgressStore'
import type { LanguageWord } from '../../../types/language.types'

/** Number of words per game session */
const TOTAL_WORDS = 10

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function scrambleWord(word: string): string[] {
  const letters = word.split('')
  let scrambled = shuffleArray(letters)
  // Make sure the scrambled word is different from the original
  while (scrambled.join('') === word && word.length > 1) {
    scrambled = shuffleArray(letters)
  }
  return scrambled
}

interface LetterTileProps {
  letter: string
  onClick: () => void
  isSelected: boolean
  isPlaced: boolean
}

function LetterTile({ letter, onClick, isSelected, isPlaced }: LetterTileProps) {
  const tileBg = useColorModeValue('blue.100', 'blue.700')
  const selectedBg = useColorModeValue('blue.300', 'blue.500')
  const placedBg = useColorModeValue('gray.200', 'gray.600')

  return (
    <Button
      size="lg"
      minW="50px"
      h="50px"
      fontSize="xl"
      fontWeight="bold"
      bg={isPlaced ? placedBg : isSelected ? selectedBg : tileBg}
      opacity={isPlaced ? 0.3 : 1}
      _hover={!isPlaced ? { transform: 'scale(1.05)' } : {}}
      transition="all 0.2s"
      onClick={onClick}
      disabled={isPlaced}
      textTransform="uppercase"
    >
      {letter}
    </Button>
  )
}

interface SlotProps {
  letter: string | null
  onClick: () => void
  isCorrect: boolean | null
}

function Slot({ letter, onClick, isCorrect }: SlotProps) {
  const emptyBg = useColorModeValue('gray.100', 'gray.700')
  const filledBg = useColorModeValue('white', 'gray.600')
  const correctBg = useColorModeValue('green.100', 'green.700')
  const incorrectBg = useColorModeValue('red.100', 'red.700')

  let bg = letter ? filledBg : emptyBg
  if (isCorrect === true) bg = correctBg
  if (isCorrect === false) bg = incorrectBg

  return (
    <Button
      size="lg"
      minW="50px"
      h="50px"
      fontSize="xl"
      fontWeight="bold"
      bg={bg}
      border="2px dashed"
      borderColor={letter ? 'blue.400' : 'gray.300'}
      _hover={letter ? { transform: 'scale(1.05)' } : {}}
      transition="all 0.2s"
      onClick={onClick}
      textTransform="uppercase"
    >
      {letter || ''}
    </Button>
  )
}

export default function WordScramblePage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { words, activePack } = useActiveLanguagePack()
  const { speak, isSpeaking } = useSpeech()

  const incrementExercisesCompleted = useProgressStore((s) => s.incrementExercisesCompleted)
  const recordCorrectAnswer = useProgressStore((s) => s.recordCorrectAnswer)
  const incrementGamesPlayed = useProgressStore((s) => s.incrementGamesPlayed)
  const incrementPerfectGames = useProgressStore((s) => s.incrementPerfectGames)

  const cardBg = useColorModeValue('white', 'gray.800')

  const [gameWords, setGameWords] = useState<LanguageWord[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [scrambledLetters, setScrambledLetters] = useState<string[]>([])
  const [placedLetters, setPlacedLetters] = useState<(string | null)[]>([])
  const [placedIndices, setPlacedIndices] = useState<number[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)

  const currentWord = gameWords[currentWordIndex]

  const initializeGame = useCallback(() => {
    const shuffledWords = shuffleArray(words).slice(0, TOTAL_WORDS)
    setGameWords(shuffledWords)
    setCurrentWordIndex(0)
    setScore(0)
    setHintsUsed(0)
    setGameStarted(true)
    setGameComplete(false)

    if (shuffledWords.length > 0) {
      const word = shuffledWords[0].term
      setScrambledLetters(scrambleWord(word))
      setPlacedLetters(new Array(word.length).fill(null))
      setPlacedIndices([])
      setIsCorrect(null)
    }
  }, [words])

  const setupWord = useCallback((word: LanguageWord) => {
    setScrambledLetters(scrambleWord(word.term))
    setPlacedLetters(new Array(word.term.length).fill(null))
    setPlacedIndices([])
    setIsCorrect(null)
  }, [])

  const handleLetterClick = (index: number) => {
    if (isCorrect !== null) return
    if (placedIndices.includes(index)) return

    const letter = scrambledLetters[index]
    const nextEmptySlot = placedLetters.findIndex((l) => l === null)

    if (nextEmptySlot !== -1) {
      const newPlaced = [...placedLetters]
      newPlaced[nextEmptySlot] = letter
      setPlacedLetters(newPlaced)
      setPlacedIndices([...placedIndices, index])

      // Check if word is complete
      if (newPlaced.every((l) => l !== null)) {
        const answer = newPlaced.join('')
        const correct = answer.toLowerCase() === currentWord.term.toLowerCase()
        setIsCorrect(correct)

        if (correct) {
          setScore((prev) => prev + 1)
          recordCorrectAnswer()
          incrementExercisesCompleted()
        }
      }
    }
  }

  const handleSlotClick = (index: number) => {
    if (isCorrect !== null) return
    if (placedLetters[index] === null) return

    // Find which scrambled letter index was placed here
    const letterToRemove = placedLetters[index]
    const scrambledIndex = placedIndices.find(
      (idx, i) => scrambledLetters[idx] === letterToRemove &&
        placedIndices.slice(0, i).filter(pi => scrambledLetters[pi] === letterToRemove).length ===
        placedLetters.slice(0, index).filter(l => l === letterToRemove).length
    )

    const newPlaced = [...placedLetters]
    newPlaced[index] = null
    setPlacedLetters(newPlaced)

    if (scrambledIndex !== undefined) {
      setPlacedIndices(placedIndices.filter((idx) => idx !== scrambledIndex))
    }
  }

  const handleNextWord = () => {
    if (currentWordIndex < gameWords.length - 1) {
      const nextIndex = currentWordIndex + 1
      setCurrentWordIndex(nextIndex)
      setupWord(gameWords[nextIndex])
    } else {
      // Game complete
      setGameComplete(true)
      incrementGamesPlayed()
      if (score === TOTAL_WORDS && hintsUsed === 0) {
        incrementPerfectGames()
      }
    }
  }

  const handlePlayAudio = () => {
    if (currentWord && activePack) {
      speak(currentWord.term, activePack.targetLanguage)
    }
  }

  const handleHint = () => {
    if (!currentWord || isCorrect !== null) return

    // Find first empty slot
    const firstEmptyIndex = placedLetters.findIndex((l) => l === null)
    if (firstEmptyIndex === -1) return

    // Get the correct letter for this position
    const correctLetter = currentWord.term[firstEmptyIndex]

    // Find an unplaced scrambled letter that matches
    const availableIndex = scrambledLetters.findIndex(
      (letter, idx) => letter.toLowerCase() === correctLetter.toLowerCase() && !placedIndices.includes(idx)
    )

    if (availableIndex !== -1) {
      setHintsUsed((prev) => prev + 1)
      handleLetterClick(availableIndex)
    }
  }

  const handleReset = () => {
    if (currentWord) {
      setupWord(currentWord)
    }
  }

  // Check if enough words
  if (words.length < 4) {
    return (
      <VStack py={10} spacing={4}>
        <Heading size="md">{t.practice.notEnoughWords}</Heading>
        <Text color="gray.500" textAlign="center">
          {t.practice.notEnoughWordsDesc}
        </Text>
        <Button onClick={() => navigate('/games')} leftIcon={<FiArrowLeft />}>
          {t.common.back}
        </Button>
      </VStack>
    )
  }

  // Start screen
  if (!gameStarted) {
    return (
      <Box pb={8}>
        <VStack spacing={6}>
          <Heading size="lg">{t.games.scramble}</Heading>

          {activePack && (
            <Badge colorScheme="blue" fontSize="sm" px={3} py={1}>
              {activePack.flag} {activePack.name}
            </Badge>
          )}

          <Card bg={cardBg} w="100%" maxW="400px">
            <CardBody>
              <VStack spacing={4}>
                <Text fontSize="4xl">🔀</Text>
                <Text textAlign="center" color="gray.500">
                  {t.games.scrambleDesc}
                </Text>
                <Text fontWeight="bold">{TOTAL_WORDS} {t.games.wordsCompleted.toLowerCase()}</Text>
              </VStack>
            </CardBody>
          </Card>

          <Button colorScheme="blue" size="lg" onClick={initializeGame}>
            {t.games.newGame}
          </Button>

          <Button variant="ghost" onClick={() => navigate('/games')} leftIcon={<FiArrowLeft />}>
            {t.common.back}
          </Button>
        </VStack>
      </Box>
    )
  }

  // Game complete screen
  if (gameComplete) {
    const isPerfect = score === TOTAL_WORDS && hintsUsed === 0

    return (
      <Box pb={8}>
        <VStack spacing={6}>
          <Heading size="lg">{t.games.complete}</Heading>

          <Card bg={cardBg} w="100%" maxW="400px">
            <CardBody>
              <VStack spacing={4}>
                <Text fontSize="5xl">{isPerfect ? '🏆' : score >= TOTAL_WORDS * 0.7 ? '🌟' : '👍'}</Text>
                {isPerfect && (
                  <Badge colorScheme="yellow" fontSize="md" px={3} py={1}>
                    {t.games.perfect}
                  </Badge>
                )}
                <VStack spacing={1}>
                  <Text fontSize="3xl" fontWeight="bold" color="blue.500">
                    {score} / {TOTAL_WORDS}
                  </Text>
                  <Text color="gray.500">{t.games.wordsCompleted}</Text>
                </VStack>
                {hintsUsed > 0 && (
                  <Text fontSize="sm" color="gray.500">
                    {t.games.hint}: {hintsUsed}
                  </Text>
                )}
              </VStack>
            </CardBody>
          </Card>

          <HStack spacing={4}>
            <Button colorScheme="blue" onClick={initializeGame}>
              {t.games.playAgain}
            </Button>
            <Button variant="outline" onClick={() => navigate('/games')}>
              {t.common.back}
            </Button>
          </HStack>
        </VStack>
      </Box>
    )
  }

  return (
    <Box pb={8}>
      <VStack spacing={6}>
        {/* Header */}
        <HStack w="100%" justify="space-between">
          <Button variant="ghost" size="sm" onClick={() => navigate('/games')} leftIcon={<FiArrowLeft />}>
            {t.common.back}
          </Button>
          <Badge colorScheme="blue" fontSize="md" px={3} py={1}>
            {currentWordIndex + 1} / {gameWords.length}
          </Badge>
          <Text fontWeight="bold" color="blue.500">
            {t.games.score}: {score}
          </Text>
        </HStack>

        {/* Progress */}
        <Progress
          value={((currentWordIndex + (isCorrect ? 1 : 0)) / gameWords.length) * 100}
          w="100%"
          colorScheme="blue"
          borderRadius="full"
        />

        {/* Definition hint */}
        <Card bg={cardBg} w="100%" shadow="card">
          <CardBody>
            <VStack spacing={3}>
              <Text fontSize="lg" fontWeight="medium" textAlign="center">
                {currentWord?.definition}
              </Text>
              {currentWord?.pronunciation && (
                <Text fontSize="sm" color="gray.500">
                  {currentWord.pronunciation}
                </Text>
              )}
              <Button
                size="sm"
                variant="ghost"
                leftIcon={<Icon as={FiVolume2} />}
                onClick={handlePlayAudio}
                isLoading={isSpeaking}
              >
                {t.practice.playAudio}
              </Button>
            </VStack>
          </CardBody>
        </Card>

        {/* Answer slots */}
        <Card bg={cardBg} w="100%" shadow="card">
          <CardBody>
            <VStack spacing={4}>
              <Wrap justify="center" spacing={2}>
                {placedLetters.map((letter, idx) => (
                  <WrapItem key={idx}>
                    <Slot
                      letter={letter}
                      onClick={() => handleSlotClick(idx)}
                      isCorrect={isCorrect}
                    />
                  </WrapItem>
                ))}
              </Wrap>

              {isCorrect !== null && (
                <Badge
                  colorScheme={isCorrect ? 'green' : 'red'}
                  fontSize="lg"
                  px={4}
                  py={2}
                >
                  {isCorrect ? t.games.correct : `${t.games.tryAgain}: ${currentWord?.term}`}
                </Badge>
              )}
            </VStack>
          </CardBody>
        </Card>

        {/* Letter tiles */}
        <Wrap justify="center" spacing={2}>
          {scrambledLetters.map((letter, idx) => (
            <WrapItem key={idx}>
              <LetterTile
                letter={letter}
                onClick={() => handleLetterClick(idx)}
                isSelected={false}
                isPlaced={placedIndices.includes(idx)}
              />
            </WrapItem>
          ))}
        </Wrap>

        {/* Action buttons */}
        <HStack spacing={4}>
          {isCorrect === null ? (
            <>
              <Button
                leftIcon={<FiHelpCircle />}
                onClick={handleHint}
                variant="outline"
                isDisabled={placedLetters.every((l) => l !== null)}
              >
                {t.games.hint}
              </Button>
              <Button leftIcon={<FiRefreshCw />} onClick={handleReset} variant="outline">
                {t.common.refresh}
              </Button>
            </>
          ) : (
            <Button colorScheme="blue" size="lg" onClick={handleNextWord}>
              {currentWordIndex < gameWords.length - 1 ? t.games.nextWord : t.games.complete}
            </Button>
          )}
        </HStack>
      </VStack>
    </Box>
  )
}

import { useState, useCallback, useEffect } from 'react'
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react'
import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../../hooks/useTranslation'
import { useActiveLanguagePack } from '../../../hooks/useActiveLanguagePack'
import { useProgressStore } from '../../../store/useProgressStore'

const PAIRS_COUNT = 6

interface MatchingCard {
  id: string
  wordId: string
  type: 'term' | 'definition'
  value: string
  isFlipped: boolean
  isMatched: boolean
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

interface GameCardProps {
  card: MatchingCard
  onClick: () => void
  isSelected: boolean
  isDisabled: boolean
}

function GameCard({ card, onClick, isSelected, isDisabled }: GameCardProps) {
  const cardBackBg = useColorModeValue('blue.500', 'blue.600')
  const termBg = useColorModeValue('purple.100', 'purple.700')
  const definitionBg = useColorModeValue('teal.100', 'teal.700')
  const matchedBg = useColorModeValue('green.100', 'green.700')
  const selectedBorder = useColorModeValue('blue.500', 'blue.300')

  const isRevealed = card.isFlipped || card.isMatched

  return (
    <Box
      as="button"
      w="100%"
      h={{ base: '80px', md: '100px' }}
      sx={{ perspective: '1000px' }}
      onClick={onClick}
      disabled={isDisabled || card.isMatched}
      cursor={isDisabled || card.isMatched ? 'default' : 'pointer'}
      _focus={{ outline: 'none' }}
    >
      <Box
        w="100%"
        h="100%"
        position="relative"
        transition="transform 0.4s"
        sx={{ transformStyle: 'preserve-3d' }}
        transform={isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)'}
      >
        {/* Card back */}
        <Box
          position="absolute"
          w="100%"
          h="100%"
          sx={{ backfaceVisibility: 'hidden' }}
          bg={cardBackBg}
          borderRadius="lg"
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="3px solid"
          borderColor={isSelected ? selectedBorder : 'transparent'}
          boxShadow="md"
          _hover={!isDisabled ? { transform: 'scale(1.02)' } : {}}
          transition="all 0.2s"
        >
          <Text fontSize="2xl" color="white">
            ?
          </Text>
        </Box>

        {/* Card front */}
        <Box
          position="absolute"
          w="100%"
          h="100%"
          sx={{ backfaceVisibility: 'hidden' }}
          transform="rotateY(180deg)"
          bg={card.isMatched ? matchedBg : card.type === 'term' ? termBg : definitionBg}
          borderRadius="lg"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={2}
          border="3px solid"
          borderColor={card.isMatched ? 'green.500' : isSelected ? selectedBorder : 'transparent'}
          boxShadow="md"
        >
          <Text
            fontSize={{ base: 'xs', md: 'sm' }}
            fontWeight={card.type === 'term' ? 'bold' : 'normal'}
            textAlign="center"
            noOfLines={3}
          >
            {card.value}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

function StarRating({ stars }: { stars: number }) {
  return (
    <HStack spacing={1}>
      {[1, 2, 3].map((star) => (
        <Text key={star} fontSize="2xl" opacity={star <= stars ? 1 : 0.3}>
          ⭐
        </Text>
      ))}
    </HStack>
  )
}

export default function MatchingGamePage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { words, activePack } = useActiveLanguagePack()

  const incrementExercisesCompleted = useProgressStore((s) => s.incrementExercisesCompleted)
  const recordCorrectAnswer = useProgressStore((s) => s.recordCorrectAnswer)
  const incrementGamesPlayed = useProgressStore((s) => s.incrementGamesPlayed)
  const incrementPerfectGames = useProgressStore((s) => s.incrementPerfectGames)

  const cardBg = useColorModeValue('white', 'gray.800')
  const termLegendBg = useColorModeValue('purple.100', 'purple.700')
  const defLegendBg = useColorModeValue('teal.100', 'teal.700')

  const [cards, setCards] = useState<MatchingCard[]>([])
  const [selectedCards, setSelectedCards] = useState<string[]>([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [isChecking, setIsChecking] = useState(false)

  const initializeGame = useCallback(() => {
    const shuffledWords = shuffleArray(words).slice(0, PAIRS_COUNT)
    const gameCards: MatchingCard[] = []

    shuffledWords.forEach((word) => {
      gameCards.push({
        id: `term-${word.id}`,
        wordId: word.id,
        type: 'term',
        value: word.term,
        isFlipped: false,
        isMatched: false,
      })
      gameCards.push({
        id: `def-${word.id}`,
        wordId: word.id,
        type: 'definition',
        value: word.definition,
        isFlipped: false,
        isMatched: false,
      })
    })

    setCards(shuffleArray(gameCards))
    setSelectedCards([])
    setMatchedPairs(0)
    setAttempts(0)
    setGameStarted(true)
    setGameComplete(false)
    setIsChecking(false)
  }, [words])

  const handleCardClick = (cardId: string) => {
    if (isChecking) return

    const card = cards.find((c) => c.id === cardId)
    if (!card || card.isMatched || card.isFlipped) return

    // Flip the card
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
    )

    const newSelected = [...selectedCards, cardId]
    setSelectedCards(newSelected)

    // Check for match when 2 cards are selected
    if (newSelected.length === 2) {
      setIsChecking(true)
      setAttempts((prev) => prev + 1)

      const [firstId, secondId] = newSelected
      const firstCard = cards.find((c) => c.id === firstId)!
      const secondCard = cards.find((c) => c.id === secondId)!

      if (firstCard.wordId === secondCard.wordId && firstCard.type !== secondCard.type) {
        // Match found!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isMatched: true }
                : c
            )
          )
          setMatchedPairs((prev) => prev + 1)
          setSelectedCards([])
          setIsChecking(false)
          recordCorrectAnswer()
          incrementExercisesCompleted()
        }, 500)
      } else {
        // No match - flip back
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isFlipped: false }
                : c
            )
          )
          setSelectedCards([])
          setIsChecking(false)
        }, 1000)
      }
    }
  }

  // Check for game completion
  useEffect(() => {
    if (gameStarted && matchedPairs === PAIRS_COUNT) {
      setGameComplete(true)
      incrementGamesPlayed()
      // Perfect game = minimum attempts (PAIRS_COUNT)
      if (attempts <= PAIRS_COUNT + 2) {
        incrementPerfectGames()
      }
    }
  }, [matchedPairs, gameStarted, attempts, incrementGamesPlayed, incrementPerfectGames])

  // Calculate stars based on attempts
  const getStars = () => {
    const minAttempts = PAIRS_COUNT
    if (attempts <= minAttempts + 2) return 3
    if (attempts <= minAttempts + 6) return 2
    return 1
  }

  // Check if enough words
  if (words.length < PAIRS_COUNT) {
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
          <Heading size="lg">{t.games.matching}</Heading>

          {activePack && (
            <Badge colorScheme="blue" fontSize="sm" px={3} py={1}>
              {activePack.flag} {activePack.name}
            </Badge>
          )}

          <Card bg={cardBg} w="100%" maxW="400px">
            <CardBody>
              <VStack spacing={4}>
                <Text fontSize="4xl">🃏</Text>
                <Text textAlign="center" color="gray.500">
                  {t.games.matchingDesc}
                </Text>
                <Text fontWeight="bold">{PAIRS_COUNT} {t.games.pairs}</Text>
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
    const stars = getStars()

    return (
      <Box pb={8}>
        <VStack spacing={6}>
          <Heading size="lg">{t.games.complete}</Heading>

          <Card bg={cardBg} w="100%" maxW="400px">
            <CardBody>
              <VStack spacing={4}>
                <Text fontSize="5xl">🎉</Text>
                <StarRating stars={stars} />
                {stars === 3 && (
                  <Badge colorScheme="yellow" fontSize="md" px={3} py={1}>
                    {t.games.perfect}
                  </Badge>
                )}
                <VStack spacing={1}>
                  <Text fontSize="3xl" fontWeight="bold" color="blue.500">
                    {matchedPairs} / {PAIRS_COUNT}
                  </Text>
                  <Text color="gray.500">{t.games.pairsFound}</Text>
                </VStack>
                <Text fontSize="sm" color="gray.500">
                  {t.games.attempts}: {attempts}
                </Text>
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
          <Badge colorScheme="green" fontSize="md" px={3} py={1}>
            {matchedPairs} / {PAIRS_COUNT} {t.games.pairs}
          </Badge>
          <Text fontWeight="bold" color="blue.500">
            {t.games.attempts}: {attempts}
          </Text>
        </HStack>

        {/* Game grid */}
        <SimpleGrid columns={{ base: 3, md: 4 }} spacing={3} w="100%" maxW="500px">
          {cards.map((card) => (
            <GameCard
              key={card.id}
              card={card}
              onClick={() => handleCardClick(card.id)}
              isSelected={selectedCards.includes(card.id)}
              isDisabled={isChecking}
            />
          ))}
        </SimpleGrid>

        {/* Legend */}
        <HStack spacing={4} fontSize="sm">
          <HStack>
            <Box w={4} h={4} bg={termLegendBg} borderRadius="sm" />
            <Text color="gray.500">Term</Text>
          </HStack>
          <HStack>
            <Box w={4} h={4} bg={defLegendBg} borderRadius="sm" />
            <Text color="gray.500">Definition</Text>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  )
}

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Progress,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'
import { useActiveLanguagePack } from '../../hooks/useActiveLanguagePack'
import { useFavoritesStore } from '../../store/useFavoritesStore'
import { useProgressStore } from '../../store/useProgressStore'
import { useSrsStore } from '../../store/useSrsStore'
import { useTranslation } from '../../hooks/useTranslation'
import { buildSrsQueue } from '../../utils/srs'
import type { SrsRating } from '../../types/srs.types'
import type { LanguageWord } from '../../types/language.types'
import WordCard from '../../components/common/WordCard'

/**
 * Smart Review (spaced repetition) method. Builds a session queue of due cards
 * plus a few new words, shows each as a flip card, and reschedules it based on
 * the learner's self-rating (Again / Good / Easy). Scheduling lives in
 * `src/utils/srs.ts`; persistence in `useSrsStore`.
 */
export default function SrsLearningPage() {
  const [searchParams] = useSearchParams()
  const favoritesMode = searchParams.get('favorites') === 'true'
  const { t } = useTranslation()

  const { words, activePack, activePackId } = useActiveLanguagePack()
  const getFavorites = useFavoritesStore((s) => s.getFavorites)

  const displayWords = useMemo(() => {
    if (!favoritesMode || !activePackId) return words
    const ids = getFavorites(activePackId)
    return words.filter((w) => ids.includes(w.id))
  }, [favoritesMode, activePackId, words, getFavorites])

  const getCards = useSrsStore((s) => s.getCards)
  const rate = useSrsStore((s) => s.rate)
  const incrementWordsLearned = useProgressStore((s) => s.incrementWordsLearned)
  const recordCorrectAnswer = useProgressStore((s) => s.recordCorrectAnswer)
  const recordIncorrectAnswer = useProgressStore((s) => s.recordIncorrectAnswer)
  const addTimeSpent = useProgressStore((s) => s.addTimeSpent)

  const [queue, setQueue] = useState<LanguageWord[]>([])
  const [initialized, setInitialized] = useState(false)
  const [index, setIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [reviewedCount, setReviewedCount] = useState(0)

  const buildQueue = useCallback(() => {
    const cards = activePackId ? getCards(activePackId) : {}
    setQueue(buildSrsQueue(displayWords, cards))
    setIndex(0)
    setIsFlipped(false)
    setReviewedCount(0)
  }, [displayWords, activePackId, getCards])

  // Build the queue once words are available.
  useEffect(() => {
    if (!initialized && displayWords.length > 0) {
      buildQueue()
      setInitialized(true)
    }
  }, [initialized, displayWords.length, buildQueue])

  // Track time spent on this page.
  const pageStartTime = useRef<Date>(new Date())
  useEffect(() => {
    pageStartTime.current = new Date()
    return () => {
      const secondsSpent = Math.floor((Date.now() - pageStartTime.current.getTime()) / 10000)
      if (secondsSpent >= 2) {
        addTimeSpent(Math.ceil(secondsSpent / 6))
      }
    }
  }, [addTimeSpent])

  const currentWord = queue[index]

  const handleRate = (rating: SrsRating) => {
    if (!currentWord || !activePackId) return
    const wasNew = rate(activePackId, currentWord.id, rating)
    if (wasNew) incrementWordsLearned()
    if (rating === 'again') {
      recordIncorrectAnswer()
    } else {
      recordCorrectAnswer()
    }
    setReviewedCount((c) => c + 1)
    setIndex((i) => i + 1)
    setIsFlipped(false)
  }

  // --- Empty / terminal states ---
  if (displayWords.length === 0) {
    return (
      <VStack py={10} spacing={4}>
        <Heading size="md">{favoritesMode ? t.favorites.noFavorites : t.learn.noWords}</Heading>
        {!favoritesMode && <Text color="gray.500">{t.learn.downloadPack}</Text>}
      </VStack>
    )
  }

  if (!initialized) {
    return (
      <VStack py={10}>
        <Text>{t.common.loading}</Text>
      </VStack>
    )
  }

  if (queue.length === 0) {
    return (
      <VStack py={10} spacing={4}>
        <Heading size="md">{t.srs.title}</Heading>
        <Text color="gray.500" textAlign="center">
          {t.srs.noCards}
        </Text>
      </VStack>
    )
  }

  if (index >= queue.length) {
    return (
      <VStack py={10} spacing={4}>
        <Heading size="md">{t.srs.sessionComplete}</Heading>
        <Text fontSize="xl" fontWeight="bold" color="brand.500">
          {t.srs.reviewed.replace('{count}', String(reviewedCount))}
        </Text>
        <Button colorScheme="blue" onClick={buildQueue}>
          {t.games.playAgain}
        </Button>
      </VStack>
    )
  }

  const progress = ((index + 1) / queue.length) * 100

  return (
    <Box pb={8}>
      <VStack spacing={6}>
        <Heading size="lg">{t.srs.title}</Heading>

        <Box w="100%">
          <HStack justify="space-between" mb={2}>
            <Text fontSize="sm" color="gray.500">
              {index + 1} {t.learn.cardOf} {queue.length}
            </Text>
            {activePack && (
              <Badge colorScheme="blue" fontSize="xs">
                {activePack.flag} {activePack.name}
              </Badge>
            )}
          </HStack>
          <Progress value={progress} size="sm" borderRadius="full" colorScheme="blue" />
        </Box>

        <WordCard
          term={currentWord.term}
          pronunciation={currentWord.pronunciation}
          definition={currentWord.definition}
          example={currentWord.examples[0]}
          isFlipped={isFlipped}
          onFlip={() => setIsFlipped((f) => !f)}
          tapHint={t.learn.tapToFlip}
        />

        {!isFlipped ? (
          <Button colorScheme="blue" onClick={() => setIsFlipped(true)} w="100%" maxW="400px">
            {t.srs.showAnswer}
          </Button>
        ) : (
          <HStack spacing={3} w="100%" maxW="400px">
            <Button flex={1} colorScheme="red" variant="outline" onClick={() => handleRate('again')}>
              {t.srs.again}
            </Button>
            <Button flex={1} colorScheme="blue" onClick={() => handleRate('good')}>
              {t.srs.good}
            </Button>
            <Button flex={1} colorScheme="green" onClick={() => handleRate('easy')}>
              {t.srs.easy}
            </Button>
          </HStack>
        )}
      </VStack>
    </Box>
  )
}

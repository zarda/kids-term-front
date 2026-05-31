import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  HStack,
  IconButton,
  Input,
  Progress,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { FiVolume2 } from 'react-icons/fi'
import { useSearchParams } from 'react-router-dom'
import { useActiveLanguagePack } from '../../hooks/useActiveLanguagePack'
import { useFavoritesStore } from '../../store/useFavoritesStore'
import { useProgressStore } from '../../store/useProgressStore'
import { useSpeech } from '../../hooks/useSpeech'
import { useTranslation } from '../../hooks/useTranslation'
import { checkTypingAnswer } from '../../utils/answerCheck'

const SESSION_SIZE = 20

type Status = 'typing' | 'correct' | 'incorrect'

/**
 * Spelling / typing method: the learner reads a word's meaning (and can hear it)
 * then types the word. Answers are checked with the forgiving `checkTypingAnswer`.
 */
export default function TypingLearningPage() {
  const [searchParams] = useSearchParams()
  const favoritesMode = searchParams.get('favorites') === 'true'
  const { t } = useTranslation()
  const cardBg = useColorModeValue('white', 'gray.800')

  const { words, activePack, activePackId } = useActiveLanguagePack()
  const getFavorites = useFavoritesStore((s) => s.getFavorites)

  const displayWords = useMemo(() => {
    if (!favoritesMode || !activePackId) return words
    const ids = getFavorites(activePackId)
    return words.filter((w) => ids.includes(w.id))
  }, [favoritesMode, activePackId, words, getFavorites])

  const recordCorrectAnswer = useProgressStore((s) => s.recordCorrectAnswer)
  const recordIncorrectAnswer = useProgressStore((s) => s.recordIncorrectAnswer)
  const incrementWordsLearned = useProgressStore((s) => s.incrementWordsLearned)
  const addTimeSpent = useProgressStore((s) => s.addTimeSpent)
  const { speak, isSpeaking } = useSpeech()

  // A new session shuffles the queue; bumping sessionId reshuffles.
  const [sessionId, setSessionId] = useState(0)
  const queue = useMemo(
    () => [...displayWords].sort(() => Math.random() - 0.5).slice(0, SESSION_SIZE),
    // sessionId is intentionally included to reshuffle on "play again".
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [displayWords, sessionId]
  )

  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<Status>('typing')
  const [score, setScore] = useState({ correct: 0, total: 0 })

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
  const isDone = index >= queue.length && queue.length > 0

  if (displayWords.length === 0) {
    return (
      <VStack py={10} spacing={4}>
        <Heading size="md">{favoritesMode ? t.favorites.noFavorites : t.learn.noWords}</Heading>
        {!favoritesMode && <Text color="gray.500">{t.learn.downloadPack}</Text>}
      </VStack>
    )
  }

  const restart = () => {
    setSessionId((id) => id + 1)
    setIndex(0)
    setInput('')
    setStatus('typing')
    setScore({ correct: 0, total: 0 })
  }

  if (isDone) {
    return (
      <VStack py={10} spacing={4}>
        <Heading size="md">{t.typing.sessionComplete}</Heading>
        <Text fontSize="2xl" fontWeight="bold" color="brand.500">
          {t.typing.score
            .replace('{correct}', String(score.correct))
            .replace('{total}', String(score.total))}
        </Text>
        <Button colorScheme="blue" onClick={restart}>
          {t.games.playAgain}
        </Button>
      </VStack>
    )
  }

  const check = () => {
    if (status !== 'typing' || !currentWord) return
    const correct = checkTypingAnswer(input, currentWord.term)
    setStatus(correct ? 'correct' : 'incorrect')
    setScore((prev) => ({ correct: prev.correct + (correct ? 1 : 0), total: prev.total + 1 }))
    if (correct) {
      recordCorrectAnswer()
      incrementWordsLearned()
    } else {
      recordIncorrectAnswer()
    }
  }

  const reveal = () => {
    if (status !== 'typing') return
    setStatus('incorrect')
    setScore((prev) => ({ correct: prev.correct, total: prev.total + 1 }))
    recordIncorrectAnswer()
  }

  const next = () => {
    setIndex((i) => i + 1)
    setInput('')
    setStatus('typing')
  }

  const skip = () => next()

  const playAudio = () => {
    if (currentWord && activePack) speak(currentWord.term, activePack.targetLanguage)
  }

  const progress = ((index + 1) / queue.length) * 100
  const answered = status !== 'typing'

  return (
    <Box pb={8}>
      <VStack spacing={6}>
        <Heading size="lg">{t.typing.title}</Heading>

        <Box w="100%">
          <HStack justify="space-between" mb={2}>
            <Text fontSize="sm" color="gray.500">
              {index + 1} {t.learn.cardOf} {queue.length}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {score.correct} / {score.total}
            </Text>
          </HStack>
          <Progress value={progress} size="sm" borderRadius="full" colorScheme="blue" />
        </Box>

        <Card bg={cardBg} w="100%" maxW="480px" shadow="card">
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Text fontSize="md" color="gray.500" textAlign="center">
                {t.typing.prompt}
              </Text>
              <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="brand.500" wordBreak="break-word">
                {currentWord.definition}
              </Text>
              <HStack justify="center">
                <IconButton
                  aria-label={t.practice.playAudio}
                  icon={<FiVolume2 />}
                  variant="outline"
                  colorScheme="blue"
                  onClick={playAudio}
                  isLoading={isSpeaking}
                />
              </HStack>

              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (answered ? next() : check())}
                placeholder={t.typing.placeholder}
                isDisabled={answered}
                size="lg"
                textAlign="center"
                autoFocus
              />

              {status === 'correct' && (
                <Badge colorScheme="green" alignSelf="center" px={3} py={1}>
                  {t.games.correct}
                </Badge>
              )}
              {status === 'incorrect' && (
                <VStack spacing={1}>
                  <Badge colorScheme="red" px={3} py={1}>
                    {t.games.tryAgain}
                  </Badge>
                  <Text fontWeight="bold">
                    {t.typing.answerWas.replace('{term}', currentWord.term)}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {currentWord.pronunciation}
                  </Text>
                </VStack>
              )}
            </VStack>
          </CardBody>
        </Card>

        {!answered ? (
          <HStack spacing={3}>
            <Button variant="ghost" onClick={skip}>
              {t.typing.skip}
            </Button>
            <Button variant="outline" onClick={reveal}>
              {t.typing.reveal}
            </Button>
            <Button colorScheme="blue" onClick={check} isDisabled={input.trim().length === 0}>
              {t.typing.check}
            </Button>
          </HStack>
        ) : (
          <Button colorScheme="blue" size="lg" onClick={next} w="100%" maxW="480px">
            {t.practice.nextQuestion}
          </Button>
        )}
      </VStack>
    </Box>
  )
}

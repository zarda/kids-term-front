import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { FiCheck, FiX } from 'react-icons/fi'
import { useSearchParams } from 'react-router-dom'
import { useActiveLanguagePack } from '../../hooks/useActiveLanguagePack'
import { useFavoritesStore } from '../../store/useFavoritesStore'
import { useProgressStore } from '../../store/useProgressStore'
import { useTranslation } from '../../hooks/useTranslation'
import {
  generateCloze,
  wordsWithUsableExamples,
  MIN_CLOZE_WORDS,
  type ClozeQuestion,
} from '../../utils/clozeGenerator'

/**
 * Sentence / context method: the learner sees an example sentence with one word
 * blanked out and picks the missing word from four options. Reinforces meaning
 * through usage rather than isolated cards.
 */
export default function ContextLearningPage() {
  const [searchParams] = useSearchParams()
  const favoritesMode = searchParams.get('favorites') === 'true'
  const { t } = useTranslation()
  const cardBg = useColorModeValue('white', 'gray.800')
  const correctBg = useColorModeValue('green.50', 'green.900')
  const incorrectBg = useColorModeValue('red.50', 'red.900')

  const { words, activePackId } = useActiveLanguagePack()
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

  const [question, setQuestion] = useState<ClozeQuestion | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const eligibleCount = useMemo(
    () => wordsWithUsableExamples(displayWords).length,
    [displayWords]
  )
  const hasEnough = eligibleCount >= MIN_CLOZE_WORDS

  const loadNext = useCallback(() => {
    setQuestion(generateCloze(displayWords))
    setSelected(null)
  }, [displayWords])

  // Load the first question once enough words are available.
  useEffect(() => {
    if (hasEnough) loadNext()
  }, [hasEnough, loadNext])

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

  if (displayWords.length === 0) {
    return (
      <VStack py={10} spacing={4}>
        <Heading size="md">{favoritesMode ? t.favorites.noFavorites : t.learn.noWords}</Heading>
        {!favoritesMode && <Text color="gray.500">{t.learn.downloadPack}</Text>}
      </VStack>
    )
  }

  if (!hasEnough) {
    return (
      <VStack py={10} spacing={4}>
        <Heading size="md">{t.context.title}</Heading>
        <Text color="gray.500" textAlign="center">
          {t.context.notEnough}
        </Text>
      </VStack>
    )
  }

  if (!question) {
    return (
      <VStack py={10}>
        <Text>{t.common.loading}</Text>
      </VStack>
    )
  }

  const answered = selected !== null

  const handleSelect = (option: string) => {
    if (answered) return
    setSelected(option)
    const correct = option === question.answer
    setScore((prev) => ({ correct: prev.correct + (correct ? 1 : 0), total: prev.total + 1 }))
    if (correct) {
      recordCorrectAnswer()
      incrementWordsLearned()
    } else {
      recordIncorrectAnswer()
    }
  }

  return (
    <Box pb={8}>
      <VStack spacing={6}>
        <Heading size="lg">{t.context.title}</Heading>

        <HStack>
          <Text fontWeight="bold" color="brand.500">
            {score.correct}
          </Text>
          <Text color="gray.500">/ {score.total}</Text>
        </HStack>

        <Text color="gray.500">{t.context.prompt}</Text>

        {/* Sentence with the blank (or the revealed full sentence + definition) */}
        <Card bg={cardBg} w="100%" maxW="540px" shadow="card">
          <CardBody>
            <Text fontSize="xl" textAlign="center" wordBreak="break-word" lineHeight="1.6">
              {answered ? question.fullSentence : question.sentence}
            </Text>
            {answered && (
              <Text mt={3} fontSize="sm" color="gray.500" textAlign="center" fontStyle="italic">
                {question.definition}
              </Text>
            )}
          </CardBody>
        </Card>

        {/* Options */}
        <VStack w="100%" maxW="540px" spacing={3}>
          {question.options.map((option, idx) => {
            const isAnswer = option === question.answer
            const isSelected = option === selected
            let bg = cardBg
            let borderColor = 'transparent'
            if (answered) {
              if (isAnswer) {
                bg = correctBg
                borderColor = 'green.500'
              } else if (isSelected) {
                bg = incorrectBg
                borderColor = 'red.500'
              }
            }
            return (
              <Card
                key={idx}
                w="100%"
                bg={bg}
                border="2px"
                borderColor={borderColor}
                cursor={answered ? 'default' : 'pointer'}
                onClick={() => handleSelect(option)}
                _hover={!answered ? { borderColor: 'brand.300' } : {}}
                transition="all 0.2s"
              >
                <CardBody py={4}>
                  <HStack justify="space-between">
                    <Text>{option}</Text>
                    {answered && isAnswer && <Icon as={FiCheck} color="green.500" boxSize={5} />}
                    {answered && isSelected && !isAnswer && (
                      <Icon as={FiX} color="red.500" boxSize={5} />
                    )}
                  </HStack>
                </CardBody>
              </Card>
            )
          })}
        </VStack>

        {answered && (
          <>
            <Badge colorScheme={selected === question.answer ? 'green' : 'red'} px={3} py={1}>
              {selected === question.answer ? t.games.correct : t.games.tryAgain}
            </Badge>
            <Button colorScheme="blue" size="lg" onClick={loadNext} w="100%" maxW="540px">
              {t.practice.nextQuestion}
            </Button>
          </>
        )}
      </VStack>
    </Box>
  )
}

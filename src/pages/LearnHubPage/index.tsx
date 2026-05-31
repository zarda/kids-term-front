import { useMemo, useState } from 'react'
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Heading,
  SimpleGrid,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { FiHeart } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation'
import { useActiveLanguagePack } from '../../hooks/useActiveLanguagePack'
import { useFavoritesStore } from '../../store/useFavoritesStore'
import { useSrsStore } from '../../store/useSrsStore'
import { getSrsStats } from '../../utils/srs'
import { wordsWithUsableExamples } from '../../utils/clozeGenerator'
import { learningMethods, type LearningMethodId } from '../../config/learningMethods'
import ChoiceCard from '../../components/common/ChoiceCard'

/**
 * The Learn hub at `/learn`: a method picker rendered from the
 * `learningMethods` registry. Lets the learner choose how to learn (and
 * optionally restrict to favorites) before entering a specific method.
 */
export default function LearnHubPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { words, activePack, activePackId } = useActiveLanguagePack()
  const [useFavoritesOnly, setUseFavoritesOnly] = useState(false)

  const getFavorites = useFavoritesStore((s) => s.getFavorites)
  const favoriteIds = useMemo(
    () => (activePackId ? getFavorites(activePackId) : []),
    [activePackId, getFavorites]
  )
  const favoritesCount = favoriteIds.length

  const displayWords = useMemo(
    () => (useFavoritesOnly ? words.filter((w) => favoriteIds.includes(w.id)) : words),
    [useFavoritesOnly, words, favoriteIds]
  )

  // SRS due/new counts for the badge on the Smart Review card.
  const srsCards = useSrsStore((s) => s.cardsByPack)
  const srsStats = useMemo(
    () => getSrsStats(displayWords, activePackId ? srsCards[activePackId] ?? {} : {}),
    [displayWords, srsCards, activePackId]
  )

  const usableExampleCount = useMemo(
    () => wordsWithUsableExamples(displayWords).length,
    [displayWords]
  )

  const navigateToMethod = (path: string) => {
    navigate(useFavoritesOnly ? `${path}?favorites=true` : path)
  }

  // How many words are available for a given method, used for the minWords gate.
  const availableFor = (id: LearningMethodId): number =>
    id === 'context' ? usableExampleCount : displayWords.length

  const srsBadge = (() => {
    if (srsStats.due > 0) {
      return (
        <Badge colorScheme="red" fontSize="xs">
          {t.learnHub.due.replace('{count}', String(srsStats.due))}
        </Badge>
      )
    }
    if (srsStats.fresh > 0) {
      return (
        <Badge colorScheme="green" fontSize="xs">
          {t.learnHub.newCount.replace('{count}', String(srsStats.fresh))}
        </Badge>
      )
    }
    return (
      <Badge colorScheme="gray" fontSize="xs">
        {t.learnHub.allCaughtUp}
      </Badge>
    )
  })()

  return (
    <Box pb={8}>
      <VStack spacing={6}>
        <Heading size="lg">{t.learnHub.title}</Heading>

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
          {t.learnHub.subtitle}
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
            <Button
              colorScheme={useFavoritesOnly ? 'red' : 'gray'}
              variant={useFavoritesOnly ? 'solid' : 'outline'}
              onClick={() => setUseFavoritesOnly(true)}
              leftIcon={<FiHeart />}
            >
              {t.favorites.myFavorites} ({favoritesCount})
            </Button>
          </ButtonGroup>
        )}

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%" maxW="700px">
          {learningMethods.map((method) => {
            const available = availableFor(method.id)
            const isDisabled = available < method.minWords
            return (
              <Tooltip
                key={method.id}
                label={isDisabled && method.id === 'context' ? t.context.notEnough : ''}
                isDisabled={!isDisabled}
              >
                <Box>
                  <ChoiceCard
                    emoji={method.emoji}
                    title={t.learnHub[method.titleKey]}
                    description={t.learnHub[method.descKey]}
                    onClick={() => navigateToMethod(method.path)}
                    isDisabled={isDisabled}
                    disabledLabel={t.learn.noWords}
                    badge={method.id === 'srs' ? srsBadge : undefined}
                  />
                </Box>
              </Tooltip>
            )
          })}
        </SimpleGrid>
      </VStack>
    </Box>
  )
}

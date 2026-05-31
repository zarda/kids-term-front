import { useState } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  SimpleGrid,
  Text,
  Tooltip,
  VStack,
  Badge,
} from '@chakra-ui/react'
import { FiHeart } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation'
import { useActiveLanguagePack } from '../../hooks/useActiveLanguagePack'
import { useFavoritesStore } from '../../store/useFavoritesStore'
import ChoiceCard from '../../components/common/ChoiceCard'

export default function GamesPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { words, activePack, activePackId } = useActiveLanguagePack()
  const [useFavoritesOnly, setUseFavoritesOnly] = useState(false)

  // Favorites
  const getFavorites = useFavoritesStore((s) => s.getFavorites)
  const favoriteIds = activePackId ? getFavorites(activePackId) : []
  const favoritesCount = favoriteIds.length

  // Minimum words for games
  const hasEnoughFavoritesForScramble = favoritesCount >= 4

  // Current word count based on mode
  const currentWords = useFavoritesOnly ? favoritesCount : words.length

  // Navigate with favorites param if enabled
  const navigateToGame = (path: string) => {
    if (useFavoritesOnly) {
      navigate(`${path}?favorites=true`)
    } else {
      navigate(path)
    }
  }

  return (
    <Box pb={8}>
      <VStack spacing={6}>
        <Heading size="lg">{t.games.title}</Heading>

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
          {t.games.subtitle}
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
              label={!hasEnoughFavoritesForScramble ? t.favorites.notEnoughFavorites : ''}
              isDisabled={hasEnoughFavoritesForScramble}
            >
              <Button
                colorScheme={useFavoritesOnly ? 'red' : 'gray'}
                variant={useFavoritesOnly ? 'solid' : 'outline'}
                onClick={() => hasEnoughFavoritesForScramble && setUseFavoritesOnly(true)}
                leftIcon={<FiHeart />}
                opacity={hasEnoughFavoritesForScramble ? 1 : 0.5}
                cursor={hasEnoughFavoritesForScramble ? 'pointer' : 'not-allowed'}
              >
                {t.favorites.myFavorites} ({favoritesCount})
              </Button>
            </Tooltip>
          </ButtonGroup>
        )}

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%" maxW="600px">
          <ChoiceCard
            emoji="🔀"
            title={t.games.scramble}
            description={t.games.scrambleDesc}
            onClick={() => navigateToGame('/games/scramble')}
            isDisabled={currentWords < 4}
            disabledLabel="Need 4+ words"
          />

          <ChoiceCard
            emoji="🃏"
            title={t.games.matching}
            description={t.games.matchingDesc}
            onClick={() => navigateToGame('/games/matching')}
            isDisabled={currentWords < 6}
            disabledLabel="Need 6+ words"
          />
        </SimpleGrid>
      </VStack>
    </Box>
  )
}

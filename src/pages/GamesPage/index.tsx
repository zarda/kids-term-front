import { useState } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Heading,
  SimpleGrid,
  Text,
  Tooltip,
  VStack,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react'
import { FiHeart } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation'
import { useActiveLanguagePack } from '../../hooks/useActiveLanguagePack'
import { useFavoritesStore } from '../../store/useFavoritesStore'

interface GameCardProps {
  emoji: string
  title: string
  description: string
  onClick: () => void
  minWords?: number
  currentWords: number
}

function GameCard({ emoji, title, description, onClick, minWords = 4, currentWords }: GameCardProps) {
  const cardBg = useColorModeValue('white', 'gray.800')
  const isDisabled = currentWords < minWords

  return (
    <Card
      bg={cardBg}
      shadow="card"
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      opacity={isDisabled ? 0.5 : 1}
      _hover={!isDisabled ? { shadow: 'cardHover', transform: 'translateY(-2px)' } : {}}
      transition="all 0.2s"
      onClick={!isDisabled ? onClick : undefined}
    >
      <CardBody>
        <VStack spacing={3}>
          <Text fontSize="3xl">{emoji}</Text>
          <Text fontWeight="bold" fontSize="lg">{title}</Text>
          <Text fontSize="sm" color="gray.500" textAlign="center">
            {description}
          </Text>
          {isDisabled && (
            <Badge colorScheme="orange" fontSize="xs">
              Need {minWords}+ words
            </Badge>
          )}
        </VStack>
      </CardBody>
    </Card>
  )
}

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
              label={
                !hasEnoughFavoritesForScramble
                  ? t.favorites.notEnoughFavorites
                  : ''
              }
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
          <GameCard
            emoji="🔀"
            title={t.games.scramble}
            description={t.games.scrambleDesc}
            onClick={() => navigateToGame('/games/scramble')}
            minWords={4}
            currentWords={currentWords}
          />

          <GameCard
            emoji="🃏"
            title={t.games.matching}
            description={t.games.matchingDesc}
            onClick={() => navigateToGame('/games/matching')}
            minWords={6}
            currentWords={currentWords}
          />
        </SimpleGrid>
      </VStack>
    </Box>
  )
}

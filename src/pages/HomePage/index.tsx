import {
  Box,
  Button,
  Card,
  CardBody,
  Grid,
  Heading,
  HStack,
  Icon,
  Progress,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { FiBook, FiHeart, FiTarget, FiTrendingUp, FiZap } from 'react-icons/fi'
import { useProgressStore } from '../../store/useProgressStore'
import { useFavoritesStore } from '../../store/useFavoritesStore'
import { useActiveLanguagePack } from '../../hooks/useActiveLanguagePack'
import { useTranslation } from '../../hooks/useTranslation'

export default function HomePage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const cardBg = useColorModeValue('white', 'gray.800')

  const currentStreak = useProgressStore((s) => s.currentStreak)
  const totalWordsLearned = useProgressStore((s) => s.totalWordsLearned)
  const dailyGoal = useProgressStore((s) => s.dailyGoal)
  const todayWordsLearned = useProgressStore((s) => s.todayWordsLearned)
  const achievements = useProgressStore((s) => s.achievements)

  const { words, activePackId } = useActiveLanguagePack()
  const getFavoritesCount = useFavoritesStore((s) => s.getFavoritesCount)
  const favoritesCount = activePackId ? getFavoritesCount(activePackId) : 0

  const progressPercent = Math.min((todayWordsLearned / dailyGoal) * 100, 100)
  const wordsToGo = Math.max(dailyGoal - todayWordsLearned, 0)

  return (
    <Box pb={8}>
      {/* Welcome Section */}
      <VStack align="stretch" spacing={6}>
        <Box>
          <Heading size="lg" mb={2}>
            {t.home.welcome}
          </Heading>
          <Text color="gray.500">{t.home.todayProgress}</Text>
        </Box>

        {/* Daily Progress Card */}
        <Card bg={cardBg} shadow="card">
          <CardBody px={{ base: 3, md: 5 }}>
            <VStack align="stretch" spacing={4}>
              <HStack justify="space-between" flexWrap="wrap" gap={1}>
                <Text fontWeight="medium" fontSize={{ base: 'sm', md: 'md' }}>{t.home.dailyGoal}</Text>
                <Text color="brand.500" fontWeight="bold" fontSize={{ base: 'sm', md: 'md' }}>
                  {todayWordsLearned} / {dailyGoal} {t.home.wordsToday}
                </Text>
              </HStack>
              <Progress
                value={progressPercent}
                size="md"
                borderRadius="full"
                colorScheme="green"
              />
              {wordsToGo > 0 ? (
                <Text fontSize="xs" color="gray.500">
                  {wordsToGo} {t.home.wordsToday}
                </Text>
              ) : (
                <Text fontSize="xs" color="green.500" fontWeight="medium">
                  {t.common.done}!
                </Text>
              )}
            </VStack>
          </CardBody>
        </Card>

        {/* Stats Grid */}
        <SimpleGrid columns={{ base: 2, lg: 4 }} spacing={{ base: 2, md: 3, lg: 4 }}>
          <Card bg={cardBg} shadow="card">
            <CardBody px={{ base: 3, md: 4 }} py={{ base: 3, md: 4 }}>
              <Stat>
                <StatLabel>
                  <HStack spacing={1}>
                    <Icon as={FiZap} color="orange.400" boxSize={{ base: 3, lg: 4 }} flexShrink={0} />
                    <Text fontSize={{ base: '2xs', md: 'xs', lg: 'sm' }} noOfLines={1}>{t.home.streak}</Text>
                  </HStack>
                </StatLabel>
                <StatNumber fontSize={{ base: 'lg', md: 'xl' }}>{currentStreak} {t.home.days}</StatNumber>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg} shadow="card">
            <CardBody px={{ base: 3, md: 4 }} py={{ base: 3, md: 4 }}>
              <Stat>
                <StatLabel>
                  <HStack spacing={1}>
                    <Icon as={FiBook} color="brand.500" boxSize={{ base: 3, lg: 4 }} flexShrink={0} />
                    <Text fontSize={{ base: '2xs', md: 'xs', lg: 'sm' }} noOfLines={1}>{t.home.wordsLearned}</Text>
                  </HStack>
                </StatLabel>
                <StatNumber fontSize={{ base: 'lg', md: 'xl' }}>{totalWordsLearned}</StatNumber>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg} shadow="card">
            <CardBody px={{ base: 3, md: 4 }} py={{ base: 3, md: 4 }}>
              <Stat>
                <StatLabel>
                  <HStack spacing={1}>
                    <Icon as={FiTarget} color="green.500" boxSize={{ base: 3, lg: 4 }} flexShrink={0} />
                    <Text fontSize={{ base: '2xs', md: 'xs', lg: 'sm' }} noOfLines={1}>{t.home.packProgress}</Text>
                  </HStack>
                </StatLabel>
                <StatNumber fontSize={{ base: 'lg', md: 'xl' }}>{totalWordsLearned} / {words.length}</StatNumber>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg} shadow="card">
            <CardBody px={{ base: 3, md: 4 }} py={{ base: 3, md: 4 }}>
              <Stat>
                <StatLabel>
                  <HStack spacing={1}>
                    <Icon as={FiTrendingUp} color="purple.500" boxSize={{ base: 3, lg: 4 }} flexShrink={0} />
                    <Text fontSize={{ base: '2xs', md: 'xs', lg: 'sm' }} noOfLines={1}>{t.progress.achievements}</Text>
                  </HStack>
                </StatLabel>
                <StatNumber fontSize={{ base: 'lg', md: 'xl' }}>{achievements.length}</StatNumber>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Quick Actions */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={{ base: 2, md: 4 }}>
          <Button
            size="lg"
            h={{ base: '60px', md: '80px' }}
            colorScheme="blue"
            onClick={() => navigate('/learn')}
            leftIcon={<FiBook size={20} />}
            px={{ base: 4, md: 6 }}
          >
            <Text fontSize={{ base: 'sm', md: 'lg' }} noOfLines={1}>{t.home.continueLeaning}</Text>
          </Button>

          <Button
            size="lg"
            h={{ base: '60px', md: '80px' }}
            variant="accent"
            bg="accent.500"
            color="white"
            _hover={{ bg: 'accent.600' }}
            onClick={() => navigate('/practice')}
            leftIcon={<FiTarget size={20} />}
            px={{ base: 4, md: 6 }}
          >
            <Text fontSize={{ base: 'sm', md: 'lg' }} noOfLines={1}>{t.home.startPractice}</Text>
          </Button>
        </Grid>

        {/* Review Favorites Button */}
        {favoritesCount > 0 && (
          <Button
            size="lg"
            h={{ base: '50px', md: '60px' }}
            variant="outline"
            colorScheme="red"
            onClick={() => navigate('/learn?favorites=true')}
            leftIcon={<FiHeart size={18} />}
            w="100%"
          >
            <Text fontSize={{ base: 'sm', md: 'md' }}>
              {t.favorites.reviewFavorites} ({favoritesCount})
            </Text>
          </Button>
        )}
      </VStack>
    </Box>
  )
}

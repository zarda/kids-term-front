import {
  Box,
  Card,
  CardBody,
  Grid,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { FiBook, FiTarget, FiTrendingUp, FiZap } from 'react-icons/fi'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { format, subDays } from 'date-fns'
import { useProgressStore } from '../../store/useProgressStore'
import { achievements } from '../../data/achievements'
import { useTranslation } from '../../hooks/useTranslation'

export default function ProgressPage() {
  const { t } = useTranslation()
  const cardBg = useColorModeValue('white', 'gray.800')
  const chartColor = useColorModeValue('#1890FF', '#40A9FF')

  const currentStreak = useProgressStore((s) => s.currentStreak)
  const longestStreak = useProgressStore((s) => s.longestStreak)
  const totalWordsLearned = useProgressStore((s) => s.totalWordsLearned)
  const totalExercisesCompleted = useProgressStore((s) => s.totalExercisesCompleted)
  const dailyProgress = useProgressStore((s) => s.dailyProgress)
  const unlockedAchievements = useProgressStore((s) => s.achievements)

  // Generate chart data for the last 7 days
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const date = format(subDays(new Date(), 6 - i), 'yyyy-MM-dd')
    const dayProgress = dailyProgress.find((d) => d.date === date)
    return {
      date: format(subDays(new Date(), 6 - i), 'EEE'),
      words: dayProgress?.wordsLearned || 0,
      exercises: dayProgress?.exercisesCompleted || 0,
    }
  })

  // Calculate accuracy
  const totalCorrect = dailyProgress.reduce((sum, d) => sum + d.correctAnswers, 0)
  const totalExercises = dailyProgress.reduce((sum, d) => sum + d.exercisesCompleted, 0)
  const accuracy = totalExercises > 0 ? Math.round((totalCorrect / totalExercises) * 100) : 0

  return (
    <Box pb={8}>
      <VStack align="stretch" spacing={6}>
        <Heading size="lg">{t.progress.title}</Heading>

        {/* Stats Grid */}
        <SimpleGrid columns={{ base: 2, lg: 4 }} spacing={{ base: 2, md: 3, lg: 4 }}>
          <Card bg={cardBg} shadow="card">
            <CardBody px={{ base: 2, md: 4 }} py={{ base: 2, md: 4 }}>
              <Stat>
                <StatLabel>
                  <HStack spacing={1}>
                    <Icon as={FiZap} color="orange.400" boxSize={{ base: 3, lg: 4 }} flexShrink={0} />
                    <Text fontSize={{ base: '2xs', md: 'xs', lg: 'sm' }} noOfLines={1}>{t.progress.currentStreak}</Text>
                  </HStack>
                </StatLabel>
                <StatNumber fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}>{currentStreak} {t.home.days}</StatNumber>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg} shadow="card">
            <CardBody px={{ base: 2, md: 4 }} py={{ base: 2, md: 4 }}>
              <Stat>
                <StatLabel>
                  <HStack spacing={1}>
                    <Icon as={FiTrendingUp} color="purple.500" boxSize={{ base: 3, lg: 4 }} flexShrink={0} />
                    <Text fontSize={{ base: '2xs', md: 'xs', lg: 'sm' }} noOfLines={1}>{t.home.streak}</Text>
                  </HStack>
                </StatLabel>
                <StatNumber fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}>{longestStreak} {t.home.days}</StatNumber>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg} shadow="card">
            <CardBody px={{ base: 2, md: 4 }} py={{ base: 2, md: 4 }}>
              <Stat>
                <StatLabel>
                  <HStack spacing={1}>
                    <Icon as={FiBook} color="brand.500" boxSize={{ base: 3, lg: 4 }} flexShrink={0} />
                    <Text fontSize={{ base: '2xs', md: 'xs', lg: 'sm' }} noOfLines={1}>{t.progress.wordsLearned}</Text>
                  </HStack>
                </StatLabel>
                <StatNumber fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}>{totalWordsLearned}</StatNumber>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg} shadow="card">
            <CardBody px={{ base: 2, md: 4 }} py={{ base: 2, md: 4 }}>
              <Stat>
                <StatLabel>
                  <HStack spacing={1}>
                    <Icon as={FiTarget} color="green.500" boxSize={{ base: 3, lg: 4 }} flexShrink={0} />
                    <Text fontSize={{ base: '2xs', md: 'xs', lg: 'sm' }} noOfLines={1}>{t.practice.accuracy}</Text>
                  </HStack>
                </StatLabel>
                <StatNumber fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}>{accuracy}%</StatNumber>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Weekly Chart */}
        <Card bg={cardBg} shadow="card">
          <CardBody>
            <Heading size="md" mb={4}>
              {t.progress.weeklyProgress}
            </Heading>
            <Box h="200px">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="date" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="words"
                    stroke={chartColor}
                    fill={chartColor}
                    fillOpacity={0.3}
                    name={t.progress.wordsLearned}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </CardBody>
        </Card>

        {/* Achievements */}
        <Box>
          <HStack justify="space-between" mb={4} flexWrap="wrap" gap={2}>
            <Heading size="md">{t.progress.achievements}</Heading>
            <Text color="gray.500" fontSize={{ base: 'xs', md: 'sm' }}>
              {unlockedAchievements.length} / {achievements.length}
            </Text>
          </HStack>

          <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={{ base: 2, md: 3 }}>
            {achievements.map((achievement) => {
              const isUnlocked = unlockedAchievements.includes(achievement.id)
              const achievementTranslation = t.achievements[achievement.id as keyof typeof t.achievements]
              return (
                <Card
                  key={achievement.id}
                  bg={cardBg}
                  shadow="card"
                  opacity={isUnlocked ? 1 : 0.5}
                  filter={isUnlocked ? 'none' : 'grayscale(100%)'}
                >
                  <CardBody py={{ base: 2, md: 3 }} px={{ base: 2, md: 4 }}>
                    <VStack spacing={1}>
                      <Text fontSize={{ base: 'xl', md: '2xl' }}>{achievement.icon}</Text>
                      <Text fontSize={{ base: '2xs', md: 'xs', lg: 'sm' }} fontWeight="medium" textAlign="center" noOfLines={1}>
                        {achievementTranslation?.title}
                      </Text>
                      <Text fontSize={{ base: '2xs', md: 'xs' }} color="gray.500" textAlign="center" noOfLines={2}>
                        {achievementTranslation?.description}
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
              )
            })}
          </SimpleGrid>
        </Box>

        {/* Summary Stats */}
        <Card bg={cardBg} shadow="card">
          <CardBody px={{ base: 3, md: 5 }}>
            <Heading size="sm" mb={4}>
              {t.progress.exercisesCompleted}
            </Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={{ base: 3, md: 4 }}>
              <Box>
                <Text color="gray.500" fontSize={{ base: '2xs', md: 'xs', lg: 'sm' }} noOfLines={1}>
                  {t.progress.exercisesCompleted}
                </Text>
                <Text fontSize={{ base: 'md', lg: 'xl' }} fontWeight="bold">
                  {totalExercisesCompleted}
                </Text>
              </Box>
              <Box>
                <Text color="gray.500" fontSize={{ base: '2xs', md: 'xs', lg: 'sm' }} noOfLines={1}>
                  {t.progress.totalTimeSpent}
                </Text>
                <Text fontSize={{ base: 'md', lg: 'xl' }} fontWeight="bold">
                  {Math.round(dailyProgress.reduce((sum, d) => sum + d.timeSpent, 0))} {t.progress.minutes}
                </Text>
              </Box>
              <Box>
                <Text color="gray.500" fontSize={{ base: '2xs', md: 'xs', lg: 'sm' }} noOfLines={1}>
                  {t.progress.correctAnswers}
                </Text>
                <Text fontSize={{ base: 'md', lg: 'xl' }} fontWeight="bold">
                  {totalCorrect}
                </Text>
              </Box>
              <Box>
                <Text color="gray.500" fontSize={{ base: '2xs', md: 'xs', lg: 'sm' }} noOfLines={1}>
                  {t.home.days}
                </Text>
                <Text fontSize={{ base: 'md', lg: 'xl' }} fontWeight="bold">
                  {dailyProgress.length}
                </Text>
              </Box>
            </Grid>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  )
}

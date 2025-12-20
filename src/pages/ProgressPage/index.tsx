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
  Wrap,
  WrapItem,
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
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          <Card bg={cardBg} shadow="card">
            <CardBody>
              <Stat>
                <StatLabel>
                  <HStack>
                    <Icon as={FiZap} color="orange.400" />
                    <Text>{t.progress.currentStreak}</Text>
                  </HStack>
                </StatLabel>
                <StatNumber>{currentStreak} {t.home.days}</StatNumber>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg} shadow="card">
            <CardBody>
              <Stat>
                <StatLabel>
                  <HStack>
                    <Icon as={FiTrendingUp} color="purple.500" />
                    <Text>{t.home.streak}</Text>
                  </HStack>
                </StatLabel>
                <StatNumber>{longestStreak} {t.home.days}</StatNumber>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg} shadow="card">
            <CardBody>
              <Stat>
                <StatLabel>
                  <HStack>
                    <Icon as={FiBook} color="brand.500" />
                    <Text>{t.progress.wordsLearned}</Text>
                  </HStack>
                </StatLabel>
                <StatNumber>{totalWordsLearned}</StatNumber>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg} shadow="card">
            <CardBody>
              <Stat>
                <StatLabel>
                  <HStack>
                    <Icon as={FiTarget} color="green.500" />
                    <Text>{t.practice.accuracy}</Text>
                  </HStack>
                </StatLabel>
                <StatNumber>{accuracy}%</StatNumber>
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
          <HStack justify="space-between" mb={4}>
            <Heading size="md">{t.progress.achievements}</Heading>
            <Text color="gray.500">
              {unlockedAchievements.length} / {achievements.length}
            </Text>
          </HStack>

          <Wrap spacing={3}>
            {achievements.map((achievement) => {
              const isUnlocked = unlockedAchievements.includes(achievement.id)
              return (
                <WrapItem key={achievement.id}>
                  <Card
                    bg={cardBg}
                    shadow="card"
                    opacity={isUnlocked ? 1 : 0.5}
                    filter={isUnlocked ? 'none' : 'grayscale(100%)'}
                    minW="140px"
                  >
                    <CardBody py={3} px={4}>
                      <VStack spacing={1}>
                        <Text fontSize="2xl">{achievement.icon}</Text>
                        <Text fontSize="sm" fontWeight="medium" textAlign="center">
                          {achievement.title}
                        </Text>
                        <Text fontSize="xs" color="gray.500" textAlign="center">
                          {achievement.description}
                        </Text>
                      </VStack>
                    </CardBody>
                  </Card>
                </WrapItem>
              )
            })}
          </Wrap>
        </Box>

        {/* Summary Stats */}
        <Card bg={cardBg} shadow="card">
          <CardBody>
            <Heading size="md" mb={4}>
              {t.progress.exercisesCompleted}
            </Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <Box>
                <Text color="gray.500" fontSize="sm">
                  {t.progress.exercisesCompleted}
                </Text>
                <Text fontSize="xl" fontWeight="bold">
                  {totalExercisesCompleted}
                </Text>
              </Box>
              <Box>
                <Text color="gray.500" fontSize="sm">
                  {t.progress.totalTimeSpent}
                </Text>
                <Text fontSize="xl" fontWeight="bold">
                  {Math.round(dailyProgress.reduce((sum, d) => sum + d.timeSpent, 0))} {t.progress.minutes}
                </Text>
              </Box>
              <Box>
                <Text color="gray.500" fontSize="sm">
                  {t.progress.correctAnswers}
                </Text>
                <Text fontSize="xl" fontWeight="bold">
                  {totalCorrect}
                </Text>
              </Box>
              <Box>
                <Text color="gray.500" fontSize="sm">
                  {t.home.days}
                </Text>
                <Text fontSize="xl" fontWeight="bold">
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

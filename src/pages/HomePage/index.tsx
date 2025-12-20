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
import { FiBook, FiTarget, FiTrendingUp, FiZap } from 'react-icons/fi'
import { useProgressStore } from '../../store/useProgressStore'
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

  const { words } = useActiveLanguagePack()

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
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <HStack justify="space-between">
                <Text fontWeight="medium">{t.home.dailyGoal}</Text>
                <Text color="brand.500" fontWeight="bold">
                  {todayWordsLearned} / {dailyGoal} {t.home.wordsToday}
                </Text>
              </HStack>
              <Progress
                value={progressPercent}
                size="lg"
                borderRadius="full"
                colorScheme="green"
              />
              {wordsToGo > 0 ? (
                <Text fontSize="sm" color="gray.500">
                  {wordsToGo} {t.home.wordsToday}
                </Text>
              ) : (
                <Text fontSize="sm" color="green.500" fontWeight="medium">
                  {t.common.done}!
                </Text>
              )}
            </VStack>
          </CardBody>
        </Card>

        {/* Stats Grid */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          <Card bg={cardBg} shadow="card">
            <CardBody>
              <Stat>
                <StatLabel>
                  <HStack>
                    <Icon as={FiZap} color="orange.400" />
                    <Text>{t.home.streak}</Text>
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
                    <Icon as={FiBook} color="brand.500" />
                    <Text>{t.home.wordsLearned}</Text>
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
                    <Text>{t.nav.learn}</Text>
                  </HStack>
                </StatLabel>
                <StatNumber>{words.length}</StatNumber>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg} shadow="card">
            <CardBody>
              <Stat>
                <StatLabel>
                  <HStack>
                    <Icon as={FiTrendingUp} color="purple.500" />
                    <Text>{t.progress.achievements}</Text>
                  </HStack>
                </StatLabel>
                <StatNumber>{achievements.length}</StatNumber>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Quick Actions */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
          <Button
            size="lg"
            h="80px"
            colorScheme="blue"
            onClick={() => navigate('/learn')}
            leftIcon={<FiBook size={24} />}
          >
            <VStack spacing={0} align="start">
              <Text>{t.home.continueLeaning}</Text>
            </VStack>
          </Button>

          <Button
            size="lg"
            h="80px"
            variant="accent"
            bg="accent.500"
            color="white"
            _hover={{ bg: 'accent.600' }}
            onClick={() => navigate('/practice')}
            leftIcon={<FiTarget size={24} />}
          >
            <VStack spacing={0} align="start">
              <Text>{t.home.startPractice}</Text>
            </VStack>
          </Button>
        </Grid>
      </VStack>
    </Box>
  )
}

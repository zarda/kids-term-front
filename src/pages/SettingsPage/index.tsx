import {
  Box,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Progress,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spinner,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
  Badge,
} from '@chakra-ui/react'
import { FiDownload, FiCheck, FiTrash2, FiRefreshCw } from 'react-icons/fi'
import { useSettingsStore } from '../../store/useSettingsStore'
import { useProgressStore } from '../../store/useProgressStore'
import { useLanguagePackStore } from '../../store/useLanguagePackStore'
import { useTranslation } from '../../hooks/useTranslation'

export default function SettingsPage() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { t } = useTranslation()
  const cardBg = useColorModeValue('white', 'gray.800')
  const activePackBg = useColorModeValue('blue.50', 'blue.900')

  const speechRate = useSettingsStore((s) => s.speechRate)
  const speechVolume = useSettingsStore((s) => s.speechVolume)
  const autoPlayAudio = useSettingsStore((s) => s.autoPlayAudio)
  const exerciseTimeLimit = useSettingsStore((s) => s.exerciseTimeLimit)
  const notificationsEnabled = useSettingsStore((s) => s.notificationsEnabled)

  const setSpeechRate = useSettingsStore((s) => s.setSpeechRate)
  const setSpeechVolume = useSettingsStore((s) => s.setSpeechVolume)
  const setAutoPlayAudio = useSettingsStore((s) => s.setAutoPlayAudio)
  const setExerciseTimeLimit = useSettingsStore((s) => s.setExerciseTimeLimit)
  const setNotificationsEnabled = useSettingsStore((s) => s.setNotificationsEnabled)

  const dailyGoal = useProgressStore((s) => s.dailyGoal)
  const setDailyGoal = useProgressStore((s) => s.setDailyGoal)

  // Language pack store
  const availablePacks = useLanguagePackStore((s) => s.availablePacks)
  const activePackId = useLanguagePackStore((s) => s.activePackId)
  const downloadingPackId = useLanguagePackStore((s) => s.downloadingPackId)
  const isRefreshing = useLanguagePackStore((s) => s.isRefreshing)
  const downloadPack = useLanguagePackStore((s) => s.downloadPack)
  const deletePack = useLanguagePackStore((s) => s.deletePack)
  const setActivePack = useLanguagePackStore((s) => s.setActivePack)
  const refreshPacks = useLanguagePackStore((s) => s.refreshPacks)

  const activePack = availablePacks.find((p) => p.id === activePackId)

  return (
    <Box pb={8}>
      <VStack align="stretch" spacing={6}>
        <Heading size="lg">{t.settings.title}</Heading>

        {/* Language Packs */}
        <Card bg={cardBg} shadow="card">
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <HStack justify="space-between">
                <HStack spacing={2}>
                  <Heading size="md">{t.settings.languagePacks}</Heading>
                  <IconButton
                    aria-label={t.common.refresh}
                    icon={<FiRefreshCw />}
                    size="sm"
                    variant="ghost"
                    isLoading={isRefreshing}
                    onClick={refreshPacks}
                  />
                </HStack>
                {activePack && (
                  <Badge colorScheme="blue" fontSize="sm">
                    {t.common.learning}: {activePack.flag} {activePack.name}
                  </Badge>
                )}
              </HStack>

              <Text fontSize="sm" color="gray.500">
                {t.settings.languagePacksHint}
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                {availablePacks.map((pack) => {
                  const isActive = pack.id === activePackId
                  const isDownloading = pack.id === downloadingPackId

                  return (
                    <Card
                      key={pack.id}
                      variant="outline"
                      borderColor={isActive ? 'brand.500' : 'gray.200'}
                      borderWidth={isActive ? 2 : 1}
                      bg={isActive ? activePackBg : 'transparent'}
                      cursor={pack.isDownloaded ? 'pointer' : 'default'}
                      onClick={() => pack.isDownloaded && setActivePack(pack.id)}
                      _hover={pack.isDownloaded ? { borderColor: 'brand.400' } : {}}
                      transition="all 0.2s"
                    >
                      <CardBody py={3} px={4}>
                        <HStack justify="space-between">
                          <HStack spacing={3}>
                            <Text fontSize="2xl">{pack.flag}</Text>
                            <VStack align="start" spacing={0}>
                              <HStack>
                                <Text fontWeight="medium">{pack.name}</Text>
                                {isActive && (
                                  <Badge colorScheme="green" size="sm">
                                    {t.common.active}
                                  </Badge>
                                )}
                              </HStack>
                              <Text fontSize="xs" color="gray.500">
                                {pack.nativeName} • {pack.wordCount} {t.settings.words}
                              </Text>
                            </VStack>
                          </HStack>

                          <HStack>
                            {pack.isDownloaded ? (
                              <>
                                <IconButton
                                  aria-label="Selected"
                                  icon={<FiCheck />}
                                  size="sm"
                                  colorScheme="green"
                                  variant="ghost"
                                  isDisabled
                                />
                                {pack.id !== 'zh-en' && !isActive && (
                                  <IconButton
                                    aria-label={t.common.delete}
                                    icon={<FiTrash2 />}
                                    size="sm"
                                    colorScheme="red"
                                    variant="ghost"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      deletePack(pack.id)
                                    }}
                                  />
                                )}
                              </>
                            ) : isDownloading ? (
                              <Spinner size="sm" color="brand.500" />
                            ) : (
                              <IconButton
                                aria-label={t.common.download}
                                icon={<FiDownload />}
                                size="sm"
                                colorScheme="blue"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  downloadPack(pack.id)
                                }}
                              />
                            )}
                          </HStack>
                        </HStack>

                        {isDownloading && (
                          <Progress
                            size="xs"
                            isIndeterminate
                            colorScheme="blue"
                            mt={2}
                            borderRadius="full"
                          />
                        )}
                      </CardBody>
                    </Card>
                  )
                })}
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>

        {/* Audio Settings */}
        <Card bg={cardBg} shadow="card">
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <Heading size="md">{t.settings.audio}</Heading>

              <FormControl display="flex" alignItems="center" justifyContent="space-between">
                <FormLabel mb={0}>{t.settings.autoPlayPronunciation}</FormLabel>
                <Switch
                  isChecked={autoPlayAudio}
                  onChange={(e) => setAutoPlayAudio(e.target.checked)}
                  colorScheme="blue"
                />
              </FormControl>

              <FormControl>
                <HStack justify="space-between" mb={2}>
                  <FormLabel mb={0}>{t.settings.speechRate}</FormLabel>
                  <Text color="gray.500">{speechRate.toFixed(1)}x</Text>
                </HStack>
                <Slider
                  value={speechRate}
                  min={0.5}
                  max={2}
                  step={0.1}
                  onChange={setSpeechRate}
                  colorScheme="blue"
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb boxSize={5} />
                </Slider>
              </FormControl>

              <FormControl>
                <HStack justify="space-between" mb={2}>
                  <FormLabel mb={0}>{t.settings.volume}</FormLabel>
                  <Text color="gray.500">{Math.round(speechVolume * 100)}%</Text>
                </HStack>
                <Slider
                  value={speechVolume}
                  min={0}
                  max={1}
                  step={0.1}
                  onChange={setSpeechVolume}
                  colorScheme="blue"
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb boxSize={5} />
                </Slider>
              </FormControl>
            </VStack>
          </CardBody>
        </Card>

        {/* Learning Settings */}
        <Card bg={cardBg} shadow="card">
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <Heading size="md">{t.settings.learning}</Heading>

              <FormControl>
                <HStack justify="space-between" mb={2}>
                  <FormLabel mb={0}>{t.settings.dailyGoal}</FormLabel>
                  <Text color="gray.500">{dailyGoal} {t.settings.words}</Text>
                </HStack>
                <Slider
                  value={dailyGoal}
                  min={5}
                  max={50}
                  step={5}
                  onChange={setDailyGoal}
                  colorScheme="blue"
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb boxSize={5} />
                </Slider>
              </FormControl>

              <FormControl>
                <HStack justify="space-between" mb={2}>
                  <FormLabel mb={0}>{t.settings.exerciseTimeLimit}</FormLabel>
                  <Text color="gray.500">{exerciseTimeLimit}s</Text>
                </HStack>
                <Slider
                  value={exerciseTimeLimit}
                  min={10}
                  max={60}
                  step={5}
                  onChange={setExerciseTimeLimit}
                  colorScheme="blue"
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb boxSize={5} />
                </Slider>
              </FormControl>
            </VStack>
          </CardBody>
        </Card>

        {/* Appearance */}
        <Card bg={cardBg} shadow="card">
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <Heading size="md">{t.settings.appearance}</Heading>

              <FormControl display="flex" alignItems="center" justifyContent="space-between">
                <FormLabel mb={0}>{t.settings.darkMode}</FormLabel>
                <Switch
                  isChecked={colorMode === 'dark'}
                  onChange={toggleColorMode}
                  colorScheme="blue"
                />
              </FormControl>
            </VStack>
          </CardBody>
        </Card>

        {/* Notifications */}
        <Card bg={cardBg} shadow="card">
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <Heading size="md">{t.settings.notifications}</Heading>

              <FormControl display="flex" alignItems="center" justifyContent="space-between">
                <FormLabel mb={0}>{t.settings.dailyReminders}</FormLabel>
                <Switch
                  isChecked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  colorScheme="blue"
                />
              </FormControl>
            </VStack>
          </CardBody>
        </Card>

        {/* App Info */}
        <Card bg={cardBg} shadow="card">
          <CardBody>
            <VStack align="stretch" spacing={2}>
              <Heading size="md">{t.settings.about}</Heading>
              <Text color="gray.500">{t.settings.version} v0.0.1</Text>
              <Text fontSize="sm" color="gray.500">
                {t.settings.appDescription}
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  )
}

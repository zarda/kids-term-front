import { useRef } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
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
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { FiDownload, FiCheck, FiTrash2, FiRefreshCw, FiAlertTriangle } from 'react-icons/fi'
import { useSettingsStore } from '../../store/useSettingsStore'
import { useProgressStore } from '../../store/useProgressStore'
import { useLanguagePackStore } from '../../store/useLanguagePackStore'
import { useTranslation } from '../../hooks/useTranslation'

export default function SettingsPage() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { t } = useTranslation()
  const cardBg = useColorModeValue('white', 'gray.800')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)

  const speechRate = useSettingsStore((s) => s.speechRate)
  const speechVolume = useSettingsStore((s) => s.speechVolume)
  const autoPlayAudio = useSettingsStore((s) => s.autoPlayAudio)
  const exerciseTimeLimit = useSettingsStore((s) => s.exerciseTimeLimit)
  const notificationsEnabled = useSettingsStore((s) => s.notificationsEnabled)
  const selectedDifficulty = useSettingsStore((s) => s.selectedDifficulty)

  const setSpeechRate = useSettingsStore((s) => s.setSpeechRate)
  const setSpeechVolume = useSettingsStore((s) => s.setSpeechVolume)
  const setAutoPlayAudio = useSettingsStore((s) => s.setAutoPlayAudio)
  const setExerciseTimeLimit = useSettingsStore((s) => s.setExerciseTimeLimit)
  const setNotificationsEnabled = useSettingsStore((s) => s.setNotificationsEnabled)
  const setSelectedDifficulty = useSettingsStore((s) => s.setSelectedDifficulty)

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

  return (
    <Box pb={8}>
      <VStack align="stretch" spacing={6}>
        <Heading size="lg">{t.settings.title}</Heading>

        {/* Language Packs */}
        <Card bg={cardBg} shadow="card">
          <CardBody>
            <VStack align="stretch" spacing={4}>
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
                      borderColor={isActive ? 'green.400' : 'gray.200'}
                      borderWidth={isActive ? 2 : 1}
                      bg={isActive ? 'green.50' : 'transparent'}
                      cursor={pack.isDownloaded ? 'pointer' : 'default'}
                      onClick={() => pack.isDownloaded && setActivePack(pack.id)}
                      _hover={pack.isDownloaded ? { borderColor: isActive ? 'green.500' : 'brand.400' } : {}}
                      _dark={isActive ? { bg: 'green.900', borderColor: 'green.500' } : {}}
                      transition="all 0.2s"
                    >
                      <CardBody py={3} px={4}>
                        <HStack justify="space-between">
                          <HStack spacing={3}>
                            <Text fontSize="2xl">{pack.flag}</Text>
                            <VStack align="start" spacing={0}>
                              <Text fontWeight={isActive ? 'bold' : 'medium'} color={isActive ? 'green.700' : undefined} _dark={isActive ? { color: 'green.200' } : {}}>
                                {pack.name}
                              </Text>
                              <Text fontSize="xs" color={isActive ? 'green.600' : 'gray.500'} _dark={isActive ? { color: 'green.300' } : {}}>
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

              <FormControl>
                <FormLabel mb={2}>{t.settings.difficultyLevel}</FormLabel>
                <SimpleGrid columns={2} spacing={2}>
                  {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((level) => (
                    <Button
                      key={level}
                      size="sm"
                      variant={selectedDifficulty === level ? 'solid' : 'outline'}
                      colorScheme={selectedDifficulty === level ? 'blue' : 'gray'}
                      onClick={() => setSelectedDifficulty(level)}
                    >
                      {t.settings.difficulty[level]}
                    </Button>
                  ))}
                </SimpleGrid>
                <Text fontSize="xs" color="gray.500" mt={2}>
                  {t.settings.difficultyHint}
                </Text>
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
              <Text color="gray.500">{t.settings.version} v0.1.3</Text>
              <Text fontSize="sm" color="gray.500">
                {t.settings.appDescription}
              </Text>
            </VStack>
          </CardBody>
        </Card>

        {/* Danger Zone */}
        <Card bg={cardBg} shadow="card" borderColor="red.300" borderWidth={1}>
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <HStack>
                <FiAlertTriangle color="red" />
                <Heading size="md" color="red.500">
                  {t.settings.dangerZone}
                </Heading>
              </HStack>

              <Text fontSize="sm" color="gray.500">
                {t.settings.clearAllDataDesc}
              </Text>

              <Button
                colorScheme="red"
                variant="outline"
                leftIcon={<FiTrash2 />}
                onClick={onOpen}
              >
                {t.settings.clearAllData}
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </VStack>

      {/* Clear Data Confirmation Dialog */}
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {t.settings.clearAllData}
            </AlertDialogHeader>

            <AlertDialogBody>{t.settings.clearAllDataConfirm}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {t.common.cancel}
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  // Clear all localStorage keys for KidsTerm
                  localStorage.removeItem('kidsterm-settings-v1')
                  localStorage.removeItem('kidsterm-language-packs-v1')
                  localStorage.removeItem('kidsterm-progress-v1')
                  // Reload the page to reset all stores
                  window.location.reload()
                }}
                ml={3}
              >
                {t.common.delete}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}

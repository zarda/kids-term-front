import type { ReactNode } from 'react'
import { Badge, Card, CardBody, Text, VStack, useColorModeValue } from '@chakra-ui/react'

export interface ChoiceCardProps {
  /** Large emoji shown at the top of the card. */
  emoji: string
  title: string
  description: string
  onClick: () => void
  /** When true the card is dimmed and non-interactive. */
  isDisabled?: boolean
  /** Small badge text shown when disabled (e.g. "Need 4+ words"). */
  disabledLabel?: string
  /** Optional badge shown when enabled (e.g. "5 to review"). */
  badge?: ReactNode
}

/**
 * A selectable option card used by the Learn hub and the Games hub. Extracted
 * from the original `GamesPage` card so both hubs share one implementation.
 */
export default function ChoiceCard({
  emoji,
  title,
  description,
  onClick,
  isDisabled = false,
  disabledLabel,
  badge,
}: ChoiceCardProps) {
  const cardBg = useColorModeValue('white', 'gray.800')

  return (
    <Card
      bg={cardBg}
      shadow="card"
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      opacity={isDisabled ? 0.5 : 1}
      _hover={!isDisabled ? { shadow: 'cardHover', transform: 'translateY(-2px)' } : {}}
      transition="all 0.2s"
      onClick={!isDisabled ? onClick : undefined}
      role="button"
      aria-disabled={isDisabled}
    >
      <CardBody>
        <VStack spacing={3}>
          <Text fontSize="3xl">{emoji}</Text>
          <Text fontWeight="bold" fontSize="lg" textAlign="center">
            {title}
          </Text>
          <Text fontSize="sm" color="gray.500" textAlign="center">
            {description}
          </Text>
          {!isDisabled && badge}
          {isDisabled && disabledLabel && (
            <Badge colorScheme="orange" fontSize="xs">
              {disabledLabel}
            </Badge>
          )}
        </VStack>
      </CardBody>
    </Card>
  )
}

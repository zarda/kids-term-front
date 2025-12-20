import { useCallback } from 'react'
import { useDrag } from '@use-gesture/react'
import { useSpring, config } from 'react-spring'

interface UseSwipeGestureOptions {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  threshold?: number
  enabled?: boolean
}

interface SwipeStyle {
  x: number
  y: number
  rotateZ: number
  scale: number
}

interface UseSwipeGestureReturn {
  bind: ReturnType<typeof useDrag>
  style: SwipeStyle
}

export function useSwipeGesture({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 100,
  enabled = true,
}: UseSwipeGestureOptions = {}): UseSwipeGestureReturn {
  const [{ x, y, rotateZ, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotateZ: 0,
    scale: 1,
    config: config.stiff,
  }))

  const handleSwipe = useCallback(
    (direction: 'left' | 'right' | 'up' | 'down') => {
      switch (direction) {
        case 'left':
          onSwipeLeft?.()
          break
        case 'right':
          onSwipeRight?.()
          break
        case 'up':
          onSwipeUp?.()
          break
        case 'down':
          onSwipeDown?.()
          break
      }
    },
    [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]
  )

  const bind = useDrag(
    ({ active, movement: [mx, my], direction: [xDir, yDir] }) => {
      if (!enabled) return

      const absX = Math.abs(mx)
      const absY = Math.abs(my)

      if (active) {
        // While dragging
        api.start({
          x: mx,
          y: my,
          rotateZ: mx / 20,
          scale: 1.02,
        })
      } else {
        // On release
        const isHorizontalSwipe = absX > absY
        const isVerticalSwipe = absY > absX

        if (isHorizontalSwipe && absX > threshold) {
          // Horizontal swipe detected
          const direction = xDir > 0 ? 'right' : 'left'
          const flyOut = xDir > 0 ? window.innerWidth : -window.innerWidth

          api.start({
            x: flyOut,
            rotateZ: flyOut / 10,
            config: { friction: 50, tension: 200 },
            onRest: () => {
              handleSwipe(direction)
              api.start({ x: 0, y: 0, rotateZ: 0, scale: 1, immediate: true })
            },
          })
        } else if (isVerticalSwipe && absY > threshold) {
          // Vertical swipe detected
          const direction = yDir > 0 ? 'down' : 'up'
          const flyOut = yDir > 0 ? window.innerHeight : -window.innerHeight

          api.start({
            y: flyOut,
            config: { friction: 50, tension: 200 },
            onRest: () => {
              handleSwipe(direction)
              api.start({ x: 0, y: 0, rotateZ: 0, scale: 1, immediate: true })
            },
          })
        } else {
          // Return to center
          api.start({ x: 0, y: 0, rotateZ: 0, scale: 1 })
        }
      }
    },
    { filterTaps: true }
  )

  return {
    bind,
    style: {
      x: x.get(),
      y: y.get(),
      rotateZ: rotateZ.get(),
      scale: scale.get(),
    },
  }
}

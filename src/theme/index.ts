import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { colors } from './colors'
import { breakpoints } from './breakpoints'

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
}

const theme = extendTheme({
  config,
  colors: {
    brand: colors.blue,
    accent: colors.green,
    blue: colors.blue,
    green: colors.green,
    gray: colors.gray,
  },
  breakpoints,
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        _dark: {
          bg: 'gray.900',
        },
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'lg',
      },
      sizes: {
        md: {
          minH: '44px',
          minW: '44px',
          px: 4,
          fontSize: 'md',
        },
        lg: {
          minH: '52px',
          minW: '52px',
          px: 6,
          fontSize: 'lg',
        },
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
            _disabled: {
              bg: 'brand.500',
            },
          },
          _active: {
            bg: 'brand.700',
            transform: 'scale(0.98)',
          },
        },
        accent: {
          bg: 'accent.500',
          color: 'white',
          _hover: {
            bg: 'accent.600',
          },
          _active: {
            bg: 'accent.700',
            transform: 'scale(0.98)',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
          _dark: {
            _hover: {
              bg: 'whiteAlpha.100',
            },
          },
        },
        ghost: {
          _hover: {
            bg: 'gray.100',
          },
          _active: {
            transform: 'scale(0.98)',
          },
          _dark: {
            _hover: {
              bg: 'whiteAlpha.100',
            },
          },
        },
      },
      defaultProps: {
        size: 'md',
        variant: 'solid',
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          boxShadow: 'md',
          bg: 'white',
          _dark: {
            bg: 'gray.800',
          },
        },
      },
    },
    Input: {
      sizes: {
        md: {
          field: {
            minH: '44px',
            borderRadius: 'lg',
          },
        },
      },
      defaultProps: {
        focusBorderColor: 'brand.500',
      },
    },
    IconButton: {
      sizes: {
        md: {
          minH: '44px',
          minW: '44px',
        },
      },
    },
    Tabs: {
      variants: {
        'soft-rounded': {
          tab: {
            minH: '44px',
            borderRadius: 'lg',
            fontWeight: 'medium',
            _selected: {
              bg: 'brand.500',
              color: 'white',
            },
          },
        },
      },
    },
  },
  shadows: {
    card: '0 2px 8px rgba(0, 0, 0, 0.08)',
    cardHover: '0 4px 16px rgba(0, 0, 0, 0.12)',
  },
  radii: {
    card: '16px',
  },
})

export default theme

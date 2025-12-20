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
    brand: colors.purple,
    accent: colors.pink,
    purple: colors.purple,
    pink: colors.pink,
    teal: colors.teal,
    orange: colors.orange,
    yellow: colors.yellow,
    blue: colors.blue,
    green: colors.green,
    gray: colors.gray,
  },
  breakpoints,
  fonts: {
    heading: `'Nunito', 'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`,
    body: `'Nunito', 'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`,
  },
  fontSizes: {
    xs: '0.875rem',
    sm: '1rem',
    md: '1.125rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '1.875rem',
    '3xl': '2.25rem',
    '4xl': '3rem',
    '5xl': '3.75rem',
    '6xl': '4.5rem',
  },
  styles: {
    global: {
      body: {
        bg: 'purple.50',
        fontSize: 'md',
        _dark: {
          bg: 'gray.900',
        },
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: '2xl',
        letterSpacing: '0.02em',
      },
      sizes: {
        sm: {
          minH: '44px',
          minW: '44px',
          px: 4,
          fontSize: 'md',
        },
        md: {
          minH: '52px',
          minW: '52px',
          px: 6,
          fontSize: 'lg',
        },
        lg: {
          minH: '60px',
          minW: '60px',
          px: 8,
          fontSize: 'xl',
        },
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          boxShadow: 'lg',
          _hover: {
            bg: 'brand.600',
            transform: 'translateY(-2px)',
            boxShadow: 'xl',
            _disabled: {
              bg: 'brand.500',
              transform: 'none',
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
          boxShadow: 'lg',
          _hover: {
            bg: 'accent.600',
            transform: 'translateY(-2px)',
            boxShadow: 'xl',
          },
          _active: {
            bg: 'accent.700',
            transform: 'scale(0.98)',
          },
        },
        fun: {
          bg: 'orange.400',
          color: 'white',
          boxShadow: 'lg',
          _hover: {
            bg: 'orange.500',
            transform: 'translateY(-2px)',
            boxShadow: 'xl',
          },
          _active: {
            bg: 'orange.600',
            transform: 'scale(0.98)',
          },
        },
        outline: {
          borderWidth: '3px',
          borderColor: 'brand.500',
          color: 'brand.600',
          _hover: {
            bg: 'brand.50',
            transform: 'translateY(-2px)',
          },
          _dark: {
            _hover: {
              bg: 'whiteAlpha.100',
            },
          },
        },
        ghost: {
          _hover: {
            bg: 'purple.100',
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
          borderRadius: '2xl',
          boxShadow: 'lg',
          bg: 'white',
          border: '2px solid',
          borderColor: 'purple.100',
          _dark: {
            bg: 'gray.800',
            borderColor: 'gray.700',
          },
        },
      },
    },
    Input: {
      sizes: {
        md: {
          field: {
            minH: '52px',
            borderRadius: 'xl',
            fontSize: 'lg',
            px: 4,
          },
        },
        lg: {
          field: {
            minH: '60px',
            borderRadius: 'xl',
            fontSize: 'xl',
            px: 5,
          },
        },
      },
      variants: {
        outline: {
          field: {
            borderWidth: '2px',
            borderColor: 'purple.200',
            _hover: {
              borderColor: 'purple.300',
            },
            _focus: {
              borderColor: 'brand.500',
              boxShadow: '0 0 0 3px rgba(168, 85, 247, 0.2)',
            },
          },
        },
      },
      defaultProps: {
        focusBorderColor: 'brand.500',
        size: 'md',
      },
    },
    IconButton: {
      sizes: {
        md: {
          minH: '52px',
          minW: '52px',
        },
        lg: {
          minH: '60px',
          minW: '60px',
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'extrabold',
        letterSpacing: '-0.02em',
      },
    },
    Text: {
      baseStyle: {
        lineHeight: '1.6',
      },
    },
    Tabs: {
      variants: {
        'soft-rounded': {
          tab: {
            minH: '52px',
            borderRadius: 'xl',
            fontWeight: 'bold',
            fontSize: 'lg',
            _selected: {
              bg: 'brand.500',
              color: 'white',
              boxShadow: 'md',
            },
          },
        },
      },
    },
    Badge: {
      baseStyle: {
        borderRadius: 'full',
        px: 3,
        py: 1,
        fontWeight: 'bold',
        fontSize: 'sm',
      },
    },
    Alert: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          fontSize: 'md',
        },
      },
    },
  },
  shadows: {
    card: '0 4px 12px rgba(124, 58, 237, 0.1)',
    cardHover: '0 8px 24px rgba(124, 58, 237, 0.15)',
    lg: '0 4px 12px rgba(124, 58, 237, 0.15)',
    xl: '0 8px 24px rgba(124, 58, 237, 0.2)',
  },
  radii: {
    card: '20px',
    lg: '12px',
    xl: '16px',
    '2xl': '20px',
    '3xl': '24px',
  },
})

export default theme

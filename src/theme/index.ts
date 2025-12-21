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
  // Responsive font sizes - smaller on mobile, larger on desktop
  // Base sizes are for mobile-first, components use responsive props for larger screens
  fontSizes: {
    '2xs': '0.625rem', // 10px - extra small for mobile nav labels
    xs: '0.75rem',    // 12px - was 14px
    sm: '0.875rem',   // 14px - was 16px
    md: '1rem',       // 16px - was 18px
    lg: '1.125rem',   // 18px - was 20px
    xl: '1.25rem',    // 20px - was 24px
    '2xl': '1.5rem',  // 24px - was 30px
    '3xl': '1.875rem', // 30px - was 36px
    '4xl': '2.25rem', // 36px - was 48px
    '5xl': '3rem',    // 48px - was 60px
    '6xl': '3.75rem', // 60px - was 72px
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
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      sizes: {
        sm: {
          minH: { base: '40px', md: '44px' },
          minW: { base: '40px', md: '44px' },
          px: { base: 3, md: 4 },
          fontSize: { base: 'sm', md: 'md' },
        },
        md: {
          minH: { base: '44px', md: '52px' },
          minW: { base: '44px', md: '52px' },
          px: { base: 4, md: 6 },
          fontSize: { base: 'sm', md: 'lg' },
        },
        lg: {
          minH: { base: '52px', md: '60px' },
          minW: { base: '52px', md: '60px' },
          px: { base: 6, md: 8 },
          fontSize: { base: 'md', md: 'xl' },
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
            minH: { base: '44px', md: '52px' },
            borderRadius: 'xl',
            fontSize: { base: 'sm', md: 'lg' },
            px: { base: 3, md: 4 },
          },
        },
        lg: {
          field: {
            minH: { base: '52px', md: '60px' },
            borderRadius: 'xl',
            fontSize: { base: 'md', md: 'xl' },
            px: { base: 4, md: 5 },
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
          minH: { base: '44px', md: '52px' },
          minW: { base: '44px', md: '52px' },
        },
        lg: {
          minH: { base: '52px', md: '60px' },
          minW: { base: '52px', md: '60px' },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'extrabold',
        letterSpacing: '-0.02em',
      },
      sizes: {
        xs: { fontSize: { base: 'sm', md: 'md' } },
        sm: { fontSize: { base: 'md', md: 'lg' } },
        md: { fontSize: { base: 'lg', md: 'xl' } },
        lg: { fontSize: { base: 'xl', md: '2xl' } },
        xl: { fontSize: { base: '2xl', md: '3xl' } },
        '2xl': { fontSize: { base: '3xl', md: '4xl' } },
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
            minH: { base: '44px', md: '52px' },
            borderRadius: 'xl',
            fontWeight: 'bold',
            fontSize: { base: 'sm', md: 'lg' },
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
        px: { base: 2, md: 3 },
        py: 1,
        fontWeight: 'bold',
        fontSize: { base: 'xs', md: 'sm' },
        maxW: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        display: 'inline-block',
      },
    },
    Alert: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          fontSize: { base: 'sm', md: 'md' },
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

import React, { ReactElement } from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom'
import theme from '../theme'

interface WrapperOptions {
  initialRouterEntries?: MemoryRouterProps['initialEntries']
}

function createWrapper(options: WrapperOptions = {}) {
  const { initialRouterEntries = ['/'] } = options

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ChakraProvider theme={theme}>
        <MemoryRouter initialEntries={initialRouterEntries}>
          {children}
        </MemoryRouter>
      </ChakraProvider>
    )
  }
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialRouterEntries?: MemoryRouterProps['initialEntries']
}

export function renderWithProviders(
  ui: ReactElement,
  options: CustomRenderOptions = {}
): RenderResult {
  const { initialRouterEntries, ...renderOptions } = options

  return render(ui, {
    wrapper: createWrapper({ initialRouterEntries }),
    ...renderOptions,
  })
}

export { createWrapper }

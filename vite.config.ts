import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '127.0.0.1',
    open: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    exclude: ['**/node_modules/**', '**/e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      // Scoped to the new learning-method logic so the 100% gate is enforceable
      // and meaningful without retrofitting the rest of the codebase.
      include: [
        'src/utils/srs.ts',
        'src/utils/answerCheck.ts',
        'src/utils/clozeGenerator.ts',
        'src/store/useSrsStore.ts',
        'src/config/learningMethods.ts',
      ],
      thresholds: {
        functions: 100,
      },
    },
  },
})

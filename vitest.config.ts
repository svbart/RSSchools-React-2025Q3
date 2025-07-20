import { defineConfig } from 'vitest/config';

export default defineConfig({
  // test: {
  //   environment: 'jsdom',
  //   globals: true,
  //   setupFiles: './src/setupTests.ts',
  //   coverage: {
  //     provider: 'v8',
  //     reporter: ['text', 'html'],
  //     statements: 80,
  //     branches: 50,
  //     functions: 50,
  //     lines: 50,
  //     // Или как альтернатива:
  //     threshold: {
  //       global: {
  //         statements: 80,
  //         branches: 50,
  //         functions: 50,
  //         lines: 50,
  //       },
  //     },
  //     include: ['src/**/*.tsx'],
  //     exclude: [
  //       '**/node_modules/**',
  //       '**/*.test.{ts,tsx}',
  //       'src/__tests__/setup.ts',
  //       'src/App.tsx',
  //     ],
  //   },
  // }
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/setupTests.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'src/__test__/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.tsx'],
      exclude: [
        '**/node_modules/**',
        '**/*.test.{ts,tsx}',
        'src/__tests__/setup.ts',
        'src/App.tsx',
      ],
    },
  },
});

import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'node',
  maxWorkers: 4,
  moduleNameMapper: {
    '->/(.*)': '<rootDir>/src/$1',
    '-->': '<rootDir>/src/index.ts',
    '->t/(.*)': '<rootDir/types/$1>',
  },
}
export default config

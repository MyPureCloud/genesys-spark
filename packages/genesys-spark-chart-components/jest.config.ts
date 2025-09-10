import type { Config } from 'jest';
import { createJestStencilPreset } from 'jest-stencil-runner';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = dirname(__filename); // get the name of the directory

const config: Config = {
  ...createJestStencilPreset({
    rootDir: __dirname,
    moduleNameMapper: {
      '^@utils/(.*)$': '<rootDir>/src/utils/$1',
      '^@test/(.*)$': '<rootDir>/src/test/$1'
    }
  }),
  collectCoverage: true,
  coverageDirectory: 'build/test-reports/coverage',
  coverageReporters: ['json', 'lcov', 'clover'],
  setupFilesAfterEnv: [
    '<rootDir>/src/test/setupTests.js',
    '<rootDir>/src/test/setupAxeTests.js'
  ],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'build/test-reports'
      }
    ]
  ]
};

export default config;

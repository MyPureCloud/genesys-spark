import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import copy from 'rollup-plugin-copy';
import generateMetadata from './scripts/generate-component-data';
import { reactOutputTarget } from '@stencil/react-output-target';

const testConsoleReporter =
  process.env.DEFAULT_TEST_REPORTER === 'true'
    ? 'default'
    : ['jest-silent-reporter', { useDots: true }];

export const config: Config = {
  namespace: 'genesys-chart-webcomponents',
  globalStyle: 'src/style/style.scss',
  hydratedFlag: {
    selector: 'attribute'
  },
  sourceMap: false,
  outputTargets: [
    {
      type: 'dist',
      dir: 'dist'
    },
    {
      type: 'docs-readme'
    },
    reactOutputTarget({
      componentCorePackage: 'genesys-spark-chart-components',
      proxiesFile:
        '../genesys-spark-chart-components-react/stencil-generated/index.ts'
    })
  ],
  plugins: [sass()],
  rollupPlugins: {
    after: [
      copy({
        targets: [
          { src: 'build/i18n', dest: 'dist/genesys-chart-webcomponents' }
        ],
        verbose: true
      }),
      {
        name: 'generate-metadata',
        buildEnd() {
          generateMetadata();
        }
      }
    ]
  },
  testing: {
    browserArgs: ['--no-sandbox'],
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
      '@utils/(.*)': '<rootDir>/src/utils/$1'
    },
    browserHeadless: true,
    collectCoverage: true,
    coverageDirectory: 'build/test-reports/coverage',
    coverageReporters: ['json', 'lcov', 'clover'],
    setupFilesAfterEnv: [
      '<rootDir>/src/test/setupTests.js',
      '<rootDir>/src/test/setupAxeTests.js'
    ],
    reporters: [
      testConsoleReporter,
      [
        'jest-junit',
        {
          outputDirectory: 'build/test-reports'
        }
      ]
    ]
  },
  extras: {
    experimentalImportInjection: true
  },
  devServer: {
    port: 3734
  }
};

import { Config } from '@stencil/core';
import { Credentials } from '@stencil/core/internal';
import { reactOutputTarget } from '@stencil/react-output-target';
import { sass } from '@stencil/sass';

import copy from 'rollup-plugin-copy';
import nodePolyfills from 'rollup-plugin-polyfill-node';

import { componentMetadataGenerator } from './scripts/component-metadata-generator';

const testConsoleReporter =
  process.env.DEFAULT_TEST_REPORTER === 'true'
    ? 'default'
    : ['jest-silent-reporter', { useDots: true }];

// Optionally host the dev server with https if a cert and key are provided via env variables, e.g.
// for running local dev build within a https app using assetsUrl option of registerSparkComponents.
let https: Credentials | undefined = undefined;
if (process.env.SPARK_HTTPS_CERT && process.env.SPARK_HTTPS_KEY) {
  https = {
    key: process.env.SPARK_HTTPS_KEY,
    cert: process.env.SPARK_HTTPS_CERT
  };
}

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
    }),
    {
      type: 'docs-custom',
      generator: componentMetadataGenerator
    }
  ],
  plugins: [sass()],
  rollupPlugins: {
    after: [
      nodePolyfills(),
      copy({
        targets: [
          { src: 'build/i18n', dest: 'dist/genesys-chart-webcomponents' }
        ],
        verbose: true
      })
    ]
  },
  testing: {
    browserArgs: ['--no-sandbox'],
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
      '@utils/(.*)': '<rootDir>/src/utils/$1'
    },
    browserHeadless: 'shell',
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
    port: 3734,
    https
  }
};

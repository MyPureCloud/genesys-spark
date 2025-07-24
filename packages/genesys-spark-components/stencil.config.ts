import { Config } from '@stencil/core';
import { Credentials } from '@stencil/core/internal';
import { sass } from '@stencil/sass';
import copy from 'rollup-plugin-copy';
import { componentMetadataGenerator } from './scripts/component-metadata-generator';
import { reactOutputTarget } from '@stencil/react-output-target';

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
  namespace: 'genesys-webcomponents',
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
      componentCorePackage: 'genesys-spark-components',
      proxiesFile:
        '../genesys-spark-components-react/stencil-generated/index.ts'
    }),
    {
      type: 'docs-custom',
      generator: componentMetadataGenerator
    },
    {
      type: 'www',
      dir: 'public',
      serviceWorker: null,
      copy: [{ src: '**/*.html' }, { src: '**/*.css' }]
    }
  ],
  plugins: [sass()],
  rollupPlugins: {
    after: [
      copy({
        targets: [
          {
            src: 'build/i18n',
            dest: ['dist/genesys-webcomponents', 'public/build']
          },
          {
            src: 'build/style/*',
            dest: ['dist/genesys-webcomponents', 'public/build'],
            rename: (name, extension) =>
              `/genesys-webcomponents-${name}.${extension}`
          }
        ],
        verbose: true
      })
    ]
  },
  testing: {
    verbose: false,
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
      '<rootDir>/src/test/setupTests.ts',
      '<rootDir>/src/test/setupAxeTests.ts'
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
    port: 3733,
    https
  }
};

import { Config } from '@stencil/core';
import { less as stencilLess } from '@stencil/less';
import { sass } from '@stencil/sass';
import copy from 'rollup-plugin-copy';
import generateMetadata from './scripts/generate-component-data';
import { reactOutputTarget } from '@stencil/react-output-target';

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
    })
  ],
  plugins: [stencilLess(), sass()],
  rollupPlugins: {
    after: [
      copy({
        targets: [
          { src: 'build/i18n', dest: 'dist/genesys-webcomponents' },
          { src: 'src/style/fonts', dest: 'dist/genesys-webcomponents' },
          {
            src: [
              'src/style/global.scss',
              'src/style/typography.scss',
              'src/style/focus.scss',
              'src/style/style-reset-typography.scss',
              'src/style/style-reset-focusable.scss'
            ],
            dest: 'dist/genesys-webcomponents/scss'
          }
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
      ['jest-silent-reporter', { useDots: true }],
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
  }
};

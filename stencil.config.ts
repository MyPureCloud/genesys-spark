import { Config } from '@stencil/core';
import { less as stencilLess } from '@stencil/less';
import copy from 'rollup-plugin-copy';
import generateMetadata from './scripts/generate-component-data';
import { reactOutputTarget } from '@stencil/react-output-target';

const CDN_URL = process.env.CDN_URL || '';

export const config: Config = {
  namespace: 'genesys-webcomponents',
  globalStyle: 'src/style/style.less',
  hydratedFlag: {
    selector: 'attribute'
  },
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
        './common-webcomponents-react/src/components/stencil-generated/index.ts'
    })
  ],
  plugins: [
    stencilLess({
      injectGlobalPaths: ['src/style/variables.less']
    })
  ],
  rollupPlugins: {
    after: [
      copy({
        targets: [
          { src: 'build/i18n', dest: 'dist/genesys-webcomponents' },
          { src: 'src/style/fonts', dest: 'dist/genesys-webcomponents' },
          {
            src: [
              'src/style/color-palette.less',
              'src/style/spacing.less',
              'src/style/typography.less',
              'src/style/shadows.less'
            ],
            dest: 'dist/genesys-webcomponents/less'
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
    coverageReporters: ['json', 'lcov', 'text', 'clover', 'text-summary'],
    setupFilesAfterEnv: [
      '<rootDir>/tests/setupTests.js',
      '<rootDir>/tests/setupAxeTests.js'
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
  },
  extras: {
    experimentalImportInjection: true
  }
};

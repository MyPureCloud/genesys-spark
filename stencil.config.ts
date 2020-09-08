import replace from '@rollup/plugin-replace';
import { Config } from '@stencil/core';
import { less as stencilLess } from '@stencil/less';
import copy from 'rollup-plugin-copy';

const CDN_URL = process.env.CDN_URL || '';

export const config: Config = {
  namespace: 'genesys-webcomponents',
  globalStyle: 'src/style/style.less',
  outputTargets: [
    {
      dir: 'dist',
      type: 'dist'
    },
    {
      type: 'docs-readme'
    }
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
          { src: 'src/style/fonts', dest: 'dist/genesys-webcomponents' }
        ]
      })
    ]
  },
  testing: {
    browserArgs: ['--no-sandbox'],
    browserHeadless: true,
    collectCoverage: true,
    coverageDirectory: 'build/test-reports/coverage',
    coverageReporters: ['json', 'lcov', 'text', 'clover', 'text-summary'],
    reporters: [
      'default',
      [
        'jest-junit',
        {
          outputDirectory: 'build/test-reports'
        }
      ]
    ]
  }
};

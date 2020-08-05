import replace from '@rollup/plugin-replace';
import { Config } from '@stencil/core';
import { less } from '@stencil/less';
import copy from 'rollup-plugin-copy';

const CDN_URL = process.env.CDN_URL || '';

export const config: Config = {
  namespace: 'genesys-webcomponents',
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
    less({
      injectGlobalPaths: ['src/style/variables.less', 'src/style/mixins.less']
    })
  ],
  rollupPlugins: {
    after: [
      copy({
        targets: [{ src: 'build/i18n', dest: 'dist/genesys-webcomponents' }],
        verbose: true
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

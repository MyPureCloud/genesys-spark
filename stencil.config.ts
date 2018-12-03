import { Config } from '@stencil/core';
import { OutputTargetDist } from '@stencil/core/dist/declarations';
import { less } from '@stencil/less';

const distTarget: OutputTargetDist = {
  dir: 'www/static',
  type: 'dist'
};
export const config: Config = {
  copy: [
    {
      dest: '../fonts',
      src: 'style/fonts'
    },
    {
      dest: '../icons',
      src: 'style/icons'
    },
    {
      dest: '../i18n',
      src: './components/**/*.i18n.*.json'
    }
  ],
  excludeSrc: [
    '**/test/**',
    '**/*.spec.*',
    '**/*.e2e.*',
    '**/stories/**',
    '**/**.md'
  ],
  namespace: 'genesys-webcomponents',
  outputTargets: [
    {
      dir: 'dist',
      type: 'dist'
    },
    distTarget
  ],
  plugins: [
    less({
      injectGlobalPaths: ['src/style/variables.less', 'src/style/mixins.less']
    })
  ],
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

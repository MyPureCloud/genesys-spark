import { Config } from '@stencil/core';
import { less } from '@stencil/less';

export const config: Config = {
  copy: [
    {
      src: 'style/fonts',
      dest: 'fonts'
    },
    {
      src: 'style/icons',
      dest: 'icons'
    }
  ],
  excludeSrc: ['**/test/**', '**/*.spec.*', '**/*.e2e.*', '**/stories/**'],
  namespace: 'genesys-webcomponents',
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'www'
    }
  ],
  plugins: [
    less({
      injectGlobalPaths: [
        'src/style/variables.less',
        'src/style/mixins.less',
        'src/style/fonts/fonts.less',
        'src/style/icons/icons.less'
      ]
    })
  ],
  testing: {
    collectCoverage: true,
    coverageDirectory: '.coverage',
    coverageReporters: ['json', 'lcov', 'text', 'clover']
  }
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};

import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  copy: [
    {
      dest: 'fonts',
      src: 'style/fonts'
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
    sass({
      injectGlobalPaths: [
        'src/style/variables.scss'
      ]
    })
  ],
  testing: {
    "collectCoverage": true,
    "coverageDirectory": ".coverage",
    "coverageReporters": ["json", "lcov", "text", "clover"]
  }
}

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}

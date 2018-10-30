import { Config } from '@stencil/core';
import { OutputTargetDist } from '@stencil/core/dist/declarations';
import { less } from '@stencil/less';

const distTarget: OutputTargetDist = {
  dir: 'www/static',
  type: 'dist'
}
export const config: Config = {
  copy: [
    {
      dest: 'fonts',
      src: 'style/fonts'
    },
    {
      dest: 'icons',
      src: 'style/icons'
    }
  ],
  excludeSrc: ['**/test/**', '**/*.spec.*', '**/*.e2e.*', '**/stories/**', '**/**.md'],
  namespace: 'genesys-webcomponents',
  outputTargets: [
    {
      dir: 'build/dist',
      type: 'dist'
    },
    {
      type: 'www'
    },
    distTarget
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
    "collectCoverage": true,
    "coverageDirectory": "build/test-reports/coverage",
    "coverageReporters": ["json", "lcov", "text", "clover"],
    "reporters": [ 
      "default",
      [ "jest-junit", 
        {
          "outputDirectory": "build/test-reports"
        } 
      ]
    ]
  }
}

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}

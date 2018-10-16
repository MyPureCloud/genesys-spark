import { less } from '@stencil/less';

exports.config = {
  namespace: 'genesys-webcomponents',
  excludeSrc: ['**/test/**', '**/*.spec.*', '**/*.e2e.*', '**/stories/**'],
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
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: false
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
  ]
}

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}

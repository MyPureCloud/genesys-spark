import { sass } from '@stencil/sass';

exports.config = {
  namespace: 'genesys-webcomponents',
  excludeSrc: ['**/test/**', '**/*.spec.*', '**/*.e2e.*', '**/stories/**'],
  copy: [
    {
      src: 'style/fonts',
      dest: 'fonts'
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
    sass({
      injectGlobalPaths: [
        'src/style/variables.scss'
      ]
    })
  ]
}

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}

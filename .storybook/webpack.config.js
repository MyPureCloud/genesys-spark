// load the default config generator.
const path = require('path');
const stencil = require('@stencil/webpack');

module.exports = (baseConfig, env, defaultConfig) => {

  defaultConfig.module.rules.push({
    resourceQuery: /blockType=docs/,
    use: [
      'storybook-readme/env/vue/docs-loader',
      'html-loader',
      'markdown-loader',
    ]
  }, {
    test: /\.js$/,
    //It is necessary to include lit-html to combat transpilation errors
    exclude: /node_modules[\\|\/](?!lit-html)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['env']
      }
    }
  }, {
    test: /\.tsx$/,
    exclude: /node_modules/,
    use: [{
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      },
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  });

  defaultConfig.resolve = {
    ...defaultConfig.resolve,
    alias: {
      'genesys-webcomponents': path.resolve(__dirname, '../www/static/genesys-webcomponents')
    }
  }

  defaultConfig.plugins.push(
    new stencil.StencilPlugin({
      collections: [
        './dist/genesys-webcomponents'
      ]
    })
  )
  return defaultConfig;
};
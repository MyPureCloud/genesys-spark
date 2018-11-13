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
  });

  defaultConfig.resolve = {
      ...defaultConfig.resolve,
      alias: {'genesys-webcomponents': path.resolve(__dirname, '../www/static/genesys-webcomponents')}
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
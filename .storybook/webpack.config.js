// load the default config generator.
const path = require('path');
const stencil = require('@stencil/webpack');

module.exports = ({ config, mode }) => {
  if (mode == 'PRODUCTION') {
    config.output = {
      ...config.output,
      publicPath: process.env.CDN_URL || ''
    };
  }

  config.module.rules.push(
    {
      resourceQuery: /blockType=docs/,
      use: [
        'storybook-readme/env/vue/docs-loader',
        'html-loader',
        'markdown-loader'
      ]
    },
    {
      test: /\.js$/,
      //It is necessary to include lit-html to combat transpilation errors
      exclude: /node_modules[\\|\/](?!lit-html)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              'env',
              {
                targets: {
                  chrome: 62,
                  edge: 40,
                  firefox: 56,
                  ie: 11,
                  safari: 11
                }
              }
            ]
          ]
        }
      }
    },
    {
      test: /\.tsx$/,
      exclude: /node_modules/,
      use: [
        {
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
    }
  );

  config.resolve = {
    ...config.resolve,
    alias: {
      'genesys-webcomponents': path.resolve(
        __dirname,
        '../www/static/genesys-webcomponents'
      ),
      'fonts.css': path.resolve(__dirname, '../www/static/fonts/fonts.css'),
      'icons.css': path.resolve(__dirname, '../www/static/icons/icons.css')
    }
  };

  return config;
};

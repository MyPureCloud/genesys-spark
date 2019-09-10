// load the default config generator.
const path = require('path');
const stencil = require('@stencil/webpack');

const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: [
      [
        'env',
        {
          targets: {
            browsers: 'last 2 versions, not dead'
          }
        }
      ]
    ]
  }
};

module.exports = ({ config, mode }) => {
  if (mode == 'PRODUCTION') {
    config.output = {
      ...config.output,
      publicPath: process.env.CDN_URL || ''
    };
  }

  config.module.rules.push(
    {
      test: /\.js$/,
      //It is necessary to include lit-html to combat transpilation errors
      exclude: /node_modules[\\|\/](?!lit-html)/,
      use: babelLoader
    },
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        babelLoader,
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
    extensions: [...config.resolve.extensions, '.ts', '.tsx'],
    alias: {
      'genesys-webcomponents': path.resolve(
        __dirname,
        '../dist/genesys-webcomponents'
      ),
      'fonts.css': path.resolve(__dirname, '../dist/fonts/fonts.css'),
      'icons.css': path.resolve(__dirname, '../dist/icons/icons.css')
    }
  };

  return config;
};

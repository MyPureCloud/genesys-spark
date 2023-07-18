const path = require('path');
const fs = require('fs');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const CDN_URL = process.env.CDN_URL || '';

module.exports = {
  entry: {
    componentListing: './src/component-listing/app.js',
    componentViewer: './src/component-viewer/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: CDN_URL,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'less-loader' // compiles Less to CSS
          }
        ]
      },
      {
        test: /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/,
        type: 'asset/resource',
        dependency: { not: ['url'] }
      }
    ]
  },
  resolve: {
    fallback: {
      crypto: false
    }
  },
  plugins: [
    new MonacoWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/index.html',
          to: '[name][ext]',
          transform: injectCdnUrl
        },
        {
          from: '../../packages/genesys-spark-components/src/components/**/example.html',
          to: ({ absoluteFilename }) => {
            const segments = absoluteFilename.split(path.sep);
            const component = segments[segments.length - 2];
            return `${component}.html`;
          },
          transform: generateComponentPage
        },
        {
          from: '../../packages/genesys-spark-components/src/style/examples/*.html',
          to: ({ absoluteFilename }) => {
            return path.basename(absoluteFilename);
          },
          transform: generateComponentPage
        },
        {
          from: '../../packages/genesys-spark-components/src/components/stable/gux-icon/icons',
          to: 'icons'
        },
        {
          from: './webfonts',
          to: 'webfonts'
        },
        {
          from: '../../packages/genesys-spark-components/dist/genesys-webcomponents',
          to: 'genesys-webcomponents'
        }
      ]
    })
  ],
  devServer: {
    compress: true,
    port: 8080,
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization'
    },
    static: {
      serveIndex: true
    }
  },
  devtool: 'source-map'
};

const componentPageTemplate = injectCdnUrl(
  fs.readFileSync('src/viewer-template.html').toString()
);

function generateComponentPage(exampleMarkup) {
  const sanitizedMarkup = exampleMarkup.toString().replace(/`/g, '\\`');

  let withHtml = componentPageTemplate.replace(
    '${EXAMPLE_HTML}',
    sanitizedMarkup
  );

  if (withHtml.includes('${SPARK_ICON_EXAMPLE_LIST}')) {
    const iconScript = require('./src/utils/generateIcons');
    const iconsExamplesHtml = iconScript.generateHTML();
    withHtml = withHtml.replace(
      '${SPARK_ICON_EXAMPLE_LIST}',
      iconsExamplesHtml
    );
  }

  if (withHtml.includes('${FA_ICON_EXAMPLE_LIST}')) {
    const iconScript = require('./src/utils/generateFontAwesomeIcons');
    const iconsExamplesHtml = iconScript.generateHTML();
    withHtml = withHtml.replace('${FA_ICON_EXAMPLE_LIST}', iconsExamplesHtml);
  }

  if (withHtml.includes('${LEGACY_ICON_EXAMPLE_LIST}')) {
    const iconScript = require('./src/utils/generateLegacyIcons');
    const iconsExamplesHtml = iconScript.generateHTML(
      '../../packages/genesys-spark-components/src/components/stable/gux-icon/icons/legacy'
    );
    withHtml = withHtml.replace(
      '${LEGACY_ICON_EXAMPLE_LIST}',
      iconsExamplesHtml
    );
  }

  return withHtml;
}

function injectCdnUrl(content) {
  let htmlCdnUrl = CDN_URL;
  if (htmlCdnUrl.length > 0 && !htmlCdnUrl.endsWith('/')) {
    htmlCdnUrl = htmlCdnUrl + '/';
  }
  return content.toString().replace(/\$\{CDN_URL\}/g, htmlCdnUrl);
}

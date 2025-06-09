const path = require('path');
const fs = require('fs');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { generateIconListHTML } = require('./src/utils/generate-icon-list-html');
const {
  generateIconSelectHTML
} = require('./src/utils/generate-icon-select-html');

const ASSET_PREFIX = process.env.ASSET_PREFIX || '';

module.exports = {
  entry: {
    componentListing: './src/component-listing/app.js',
    componentViewer: './src/component-viewer/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
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
          transform: injectAssetPrefix
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
          from: '../../packages/genesys-spark-components/src/components/**/docs/*.html',
          to: ({ absoluteFilename }) => {
            const segments = absoluteFilename.split(path.sep);
            const component = segments[segments.length - 3];
            const page = segments[segments.length - 1];
            return `${component}-${page}`;
          },
          transform: generateComponentPage
        },
        {
          from: '../../packages/genesys-spark/src/style/examples/*.html',
          to: ({ absoluteFilename }) => {
            return path.basename(absoluteFilename);
          },
          transform: generateComponentPage
        },
        {
          from: '../../packages/genesys-spark-chart-components/src/components/**/example.html',
          to: ({ absoluteFilename }) => {
            const segments = absoluteFilename.split(path.sep);
            const component = segments[segments.length - 2];

            return `${component}.html`;
          },
          transform: generateComponentPage
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

const componentPageTemplate = injectAssetPrefix(
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
    withHtml = withHtml.replace(
      '${FA_ICON_EXAMPLE_LIST}',
      generateIconListHTML(
        '../../packages/genesys-spark-components/src/components/stable/gux-icon/icons/fa/**/*.svg'
      )
    );
  }

  if (withHtml.includes('${CUSTOM_ICON_EXAMPLE_LIST}')) {
    withHtml = withHtml.replace(
      '${CUSTOM_ICON_EXAMPLE_LIST}',
      generateIconListHTML(
        '../../packages/genesys-spark-components/src/components/stable/gux-icon/icons/custom/**/*.svg'
      )
    );
  }

  if (withHtml.includes('${LEGACY_ICON_EXAMPLE_LIST}')) {
    withHtml = withHtml.replace(
      '${LEGACY_ICON_EXAMPLE_LIST}',
      generateIconSelectHTML(
        '../../packages/genesys-spark-components/src/components/stable/gux-icon/icons/legacy/**/*.svg'
      )
    );
  }

  if (withHtml.includes('${RESTRICTED_ICON_EXAMPLE_LIST}')) {
    withHtml = withHtml.replace(
      '${RESTRICTED_ICON_EXAMPLE_LIST}',
      generateIconListHTML(
        '../../packages/genesys-spark-components/src/components/stable/gux-icon/icons/restricted/**/*.svg'
      )
    );
  }

  if (withHtml.includes('${DEPRECATED_ICON_EXAMPLE_LIST}')) {
    withHtml = withHtml.replace(
      '${DEPRECATED_ICON_EXAMPLE_LIST}',
      generateIconListHTML(
        '../../packages/genesys-spark-components/src/components/stable/gux-icon/icons/deprecated/**/*.svg'
      )
    );
  }

  if (withHtml.includes('${BRAND_ICON_EXAMPLE_LIST}')) {
    withHtml = withHtml.replace(
      '${BRAND_ICON_EXAMPLE_LIST}',
      generateIconListHTML(
        '../../packages/genesys-spark-components/src/components/stable/gux-icon/icons/brand/**/*.svg'
      )
    );
  }

  return withHtml;
}

function injectAssetPrefix(content) {
  let htmlAssetPrefix = ASSET_PREFIX;
  if (htmlAssetPrefix.length > 0 && !htmlAssetPrefix.endsWith('/')) {
    htmlAssetPrefix = htmlAssetPrefix + '/';
  }
  return content.toString().replace(/\$\{ASSET_PREFIX\}/g, htmlAssetPrefix);
}

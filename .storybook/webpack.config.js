// load the default config generator.
const path = require('path');
const ROOT_PATH = path.resolve(process.cwd());

module.exports = (baseConfig, env, defaultConfig) => {

  defaultConfig.resolve.alias = {
    ...defaultConfig.resolve.alias,
    "MD": path.resolve(__dirname, "../.docs")
  };

  defaultConfig.module.rules.push({
    resourceQuery: /blockType=docs/,
    use: [
      'storybook-readme/env/vue/docs-loader',
      'html-loader',
      'markdown-loader',
    ]
  });

  return defaultConfig;
};
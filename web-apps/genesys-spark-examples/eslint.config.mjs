import genesysSparkConfig from 'eslint-config-genesys-spark-components';
import globals from 'globals';

export default [
  {
    ignores: ['dist/', 'node_modules/']
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2022,
        ...globals.node
      },
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2022
      }
    }
  },
  ...genesysSparkConfig
];

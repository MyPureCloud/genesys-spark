import genesysSparkConfig from 'eslint-config-genesys-spark-components';
import globals from 'globals';

export default [
  {
    ignores: ['dist/', 'dist-new/', 'node_modules/']
  },
  {
    languageOptions: {
      globals: {
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

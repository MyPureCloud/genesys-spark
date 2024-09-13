import genesysSparkConfig from './index.mjs';
import globals from 'globals';

export default [
  ...genesysSparkConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }
];

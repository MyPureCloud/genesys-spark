import genesysSparkConfig from 'eslint-config-genesys-spark-components';
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

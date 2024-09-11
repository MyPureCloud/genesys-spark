import genesysSparkConfig from 'eslint-config-genesys-spark-components';
import globals from 'globals';

export default [
  {
    ignores: [
      'dist/',
      'node_modules/',
      'packages/',
      'playground/',
      'playgrounds/',
      'shared-configs/',
      'web-apps/',

      'manifest.json'
    ]
  },
  ...genesysSparkConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }
];

import genesysSparkConfig from 'eslint-config-genesys-spark-components';
import genesysSparkTypescriptConfig from 'eslint-config-genesys-spark-components/typescript.mjs';
import globals from 'globals';
import { merge } from 'smob';

export default [
  {
    ignores: ['dist/', 'node_modules/', 'stencil-generated/']
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        sourceType: 'module',
        project: ['./tsconfig.eslint.json']
      }
    }
  },
  ...genesysSparkConfig,
  ...genesysSparkTypescriptConfig.map(config =>
    merge({ files: ['**/*.ts'] }, config)
  )
];

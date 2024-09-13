import genesysSparkConfig from 'eslint-config-genesys-spark-components';
import genesysSparkTypescriptConfig from 'eslint-config-genesys-spark-components/typescript.mjs';
import globals from 'globals';
import { merge } from 'smob';

export default [
  {
    ignores: ['node_modules/', 'dist/']
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2015
      },
      parserOptions: {
        sourceType: 'module',
        project: ['./tsconfig.eslint.json']
      }
    }
  },
  ...genesysSparkConfig,
  ...genesysSparkTypescriptConfig.map(config =>
    merge(
      {
        files: ['**/*.{ts,tsx}']
      },
      config
    )
  ),
  {
    files: ['**/*.config.{js,mjs}'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },
  ...genesysSparkTypescriptConfig.map(config =>
    merge(
      {
        files: ['test/**/*.ts']
      },
      config
    )
  ),
  {
    files: ['test/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2015,
        ...globals.jest
      },
      parserOptions: {
        sourceType: 'module',
        project: ['./tsconfig.eslint.json']
      }
    },
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
];

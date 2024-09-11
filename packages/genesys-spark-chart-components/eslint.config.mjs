import genesysSparkConfig from 'eslint-config-genesys-spark-components';
import genesysSparkTypescriptConfig from 'eslint-config-genesys-spark-components/typescript.mjs';
import globals from 'globals';
import { merge } from 'smob';

export default [
  {
    ignores: [
      'node_modules/',
      'build/',
      'dist/',
      'src/components/**/*.md',
      'src/components.d.ts',
      'scripts/generate-component-data.js'
    ]
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2015
      }
    }
  },
  {
    files: ['scripts/*.js'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },
  {
    files: ['src/test/*.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node
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
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        sourceType: 'module',
        project: ['./tsconfig.eslint.json']
      }
    },
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off'
    }
  },
  ...genesysSparkTypescriptConfig.map(config =>
    merge(
      {
        files: ['**/*.{spec,e2e}.ts']
      },
      config
    )
  ),
  {
    files: ['**/*.{spec,e2e}.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/require-await': 'off'
    }
  }
];

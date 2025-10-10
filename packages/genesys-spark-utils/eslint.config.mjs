import config from 'eslint-config-genesys-spark-components';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  ...config,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.ts', 'src/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },
  {
    ignores: ['dist/**/*']
  },
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

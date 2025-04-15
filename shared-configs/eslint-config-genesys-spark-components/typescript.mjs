import tsEslint from 'typescript-eslint';
import javascript from './index.mjs';

export default [
  javascript,
  ...tsEslint.configs.recommended,
  {
    name: 'eslint-config-genesys-spark-components/typescript',
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: false
    },
    rules: {
      'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off'
    }
  }
];

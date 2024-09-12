import eslint from '@eslint/js';

export default [
  eslint.configs.recommended,
  {
    name: 'eslint-config-genesys-spark-components/javascript',
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: false
    },
    rules: {
      'prefer-const': 'error',
      curly: 'error'
    }
  }
];

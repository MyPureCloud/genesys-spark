module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'playground/angular-v12/tsconfig.json'],
    sourceType: 'module'
  },
  plugins: [
    'eslint-plugin-jsdoc',
    'eslint-plugin-prefer-arrow',
    'eslint-plugin-react',
    '@typescript-eslint'
  ],
  overrides: [
    {
      files: ['./**/**/*.spec.*', './**/**/*.e2e.*'],
      plugins: ['jest'],
      rules: {
        '@typescript-eslint/unbound-method': 'off',
        'jest/unbound-method': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/require-await': 'off'
      }
    }
  ],
  rules: {
    '@typescript-eslint/unbound-method': [
      'error',
      {
        ignoreStatic: true
      }
    ],
    '@typescript-eslint/typedef': [
      'error',
      {
        arrayDestructuring: false,
        arrowParameter: false,
        memberVariableDeclaration: true,
        objectDestructuring: false,
        parameter: true,
        propertyDeclaration: true,
        variableDeclaration: false,
        variableDeclarationIgnoreFunction: false
      }
    ],
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false
      }
    ],
    '@typescript-eslint/no-unsafe-assignment': 'off', // 47
    '@typescript-eslint/no-inferrable-types': 'off'
  }
};

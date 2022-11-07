module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', [110]],
    'subject-case': [2, 'never', ['pascal-case', 'upper-case']]
  }
};

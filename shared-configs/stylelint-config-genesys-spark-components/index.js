module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'postcss-less',
    'postcss-html'
  ],
  overrides: [
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less'
    },
    {
      files: ['**/*.html'],
      customSyntax: 'postcss-html'
    }
  ],
  rules: {
    'media-feature-range-notation': 'prefix',
    'selector-not-notation': null,
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
    'value-no-vendor-prefix': null,
    'property-no-vendor-prefix': null,
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['/^gux-/', 'lineargradient']
      }
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['fade', 'lighten', 'darken', 'e', '%']
      }
    ],
    'declaration-block-no-redundant-longhand-properties': [
      true,
      {
        ignoreShorthands: ['flex-flow', 'grid-column', 'grid-row', 'grid-area']
      }
    ]
  }
};

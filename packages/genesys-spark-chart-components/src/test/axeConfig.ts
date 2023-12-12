// config for axe-core automated testing in e2e tests
export const axeConfig = {
  runOnly: {
    type: 'tags',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
  }
};

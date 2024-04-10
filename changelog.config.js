const COMPONENT_SPECS = require('genesys-spark-components/build/component-specs/component-specs.json');
const CHART_COMPONENT_SPECS = require('genesys-spark-chart-components/build/component-specs/component-specs.json');

const componentSpecs = Object.assign(COMPONENT_SPECS, CHART_COMPONENT_SPECS);

const getComponentSpec = function () {
  const scopeList = ['other'];
  for (const [key] of Object.entries(componentSpecs)) {
    scopeList.push(key.replace('gux-', ''));
  }
  return scopeList;
};

module.exports = {
  format: '{type}{scope}: {subject}',
  list: [
    'feat',
    'fix',
    'test',
    'chore',
    'docs',
    'refactor',
    'style',
    'ci',
    'perf'
  ],
  maxMessageLength: 110,
  minMessageLength: 3,
  questions: ['type', 'scope', 'subject', 'body', 'issues'],
  scopes: getComponentSpec(),
  messages: {
    type: "Review the [contributing guide](./docs/CONTRIBUTING.md) before commiting\nSelect the type of change that you're committing:",
    scope: 'Select the scope this commit affects:',
    subject: 'Write a short, imperative mood description of the change:\n',
    body: 'Provide a longer description of the change:\n ',
    issues: 'Issues this commit closes, e.g #123:'
  },
  types: {
    chore: {
      description: 'Build process or auxiliary tool changes',
      value: 'chore'
    },
    ci: {
      description: 'CI related changes',
      value: 'ci'
    },
    docs: {
      description: 'Documentation only changes',
      value: 'docs'
    },
    feat: {
      description:
        'A new feature (minor version bump and adds commit message to CHANGELOG)',
      value: 'feat'
    },
    fix: {
      description:
        'A bug fix (minor version bump and adds commit message to CHANGELOG)',
      value: 'fix'
    },
    perf: {
      description: 'A code change that improves performance',
      value: 'perf'
    },
    refactor: {
      description: 'A code change that neither fixes a bug or adds a feature',
      value: 'refactor'
    },
    style: {
      description: 'Markup, white-space, formatting, missing semi-colons...',
      value: 'style'
    },
    test: {
      description: 'Adding missing tests',
      value: 'test'
    }
  }
};

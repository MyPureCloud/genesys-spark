import { action } from '@storybook/addon-actions';
import { boolean, number, select, text } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Basic Components', module).add(
  'Spin Button',
  withReadme(README, () => {
    const containerWidth = number('Container Width', 500, {
      max: 1000,
      min: 100,
      range: true,
      step: 10
    });

    const container = document.createElement('div');
    container.setAttribute(
      'style',
      `width: ${containerWidth}px; padding: 8px 8px`
    );

    const component = document.createElement('gux-spin-button');
    component.label = text('Label', 'Minutes');
    component.min = number('Minimal value', '15');
    component.max = number('Maximum value', '60');
    component.step = number('Interval value', '15');
    component.value = number('Input value', '30');
    component.ignoreValidation = boolean('Ignore validation', false);
    component.errorMessage = text('Error message');
    component.addEventListener('input', e => action('input')(e.detail));

    container.appendChild(component);

    document.getElementsByTagName('html')[0].className =
      'gux-' + select('Theme', ['dark', 'default'], 'default') + '-theme';
    return container;
  })
);

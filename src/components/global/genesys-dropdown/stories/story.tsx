import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import { boolean, object, select, text, withKnobs } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { html, render } from 'lit-html';
import { withReadme  } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Genesys Components', module)
.addDecorator(withKnobs)
.addDecorator(checkA11y)
.add(
    'Genesys Dropdown',
    withReadme(README, () => {
      const el = document.createElement('genesys-dropdown');
      el.items = object('items', [
        { text: 'Brazil' },
        { text: 'France' },
        { text: 'Belgium' }
      ]);
      el.filterable = boolean('filterable', false);
      el.value = text('value', '');
      el.label = text('label', '');
      el.placeholder = text('placeholder', 'Select...');
      setTimeout(() => {
        el.addEventListener('change', e => action('change')(e.detail));
      }, 100);
      document.getElementsByTagName('html')[0].className = 'genesys-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
);

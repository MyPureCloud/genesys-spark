import { action } from '@storybook/addon-actions';
import {
  object,
  select,
  withKnobs
} from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Genesys Components', module)
  .addDecorator(withKnobs)
  .add(
    'Genesys List',
    withReadme(README, () => {
      const el = document.createElement('genesys-list');
      el.items = object('items', [
        {
          text: 'test',
          callback: i => {
            alert('test:' + JSON.stringify(i));
          }
        },
        { type: 'divider' },
        { text: 'test2' },
        { text: 'test3', isDisabled: true }
      ]);
      setTimeout(() => {
        el.addEventListener('change', e => action('change')(e.detail));
      }, 100);
      document.getElementsByTagName('html')[0].className = 'genesys-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
  );

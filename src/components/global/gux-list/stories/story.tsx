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
      const el = document.createElement('gux-list');
      el.items = object('items', [
        {
          callback: i => {
            alert('test:' + JSON.stringify(i));
          },
          text: 'test'
        },
        { type: 'divider' },
        { text: 'test2' },
        { text: 'test3', isDisabled: true }
      ]);
      el.addEventListener('custom', e => action('custom')(e.detail));
      document.getElementsByTagName('html')[0].className =
        'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
  );

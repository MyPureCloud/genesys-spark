import { checkA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import {
  object,
  select,
  text,
  withKnobs
} from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Genesys Components', module)
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .add(
    'Genesys Action Button',
    withReadme(README, () => {
      const el = document.createElement('gux-action-button');
      el.text = text('text', 'Blop');
      el.items = object('items', [
        {
          callback: i => {
            alert('test:' + JSON.stringify(i));
          },
          text: 'test'
        },
        { text: 'divider', type: 'divider' },
        {
          callback: i => {
            alert('test:' + JSON.stringify(i));
          },
          text: 'test2'
        },
        { text: 'test3', isDisabled: true },
        { text: 'test3' }
      ]);
      el.addEventListener('open', e => action('open')());
      el.addEventListener('close', e => action('close')());
      el.addEventListener('actionClick', e => action('actionClick')());
      el.accent = select('accent', ['primary', 'secondary'], 'secondary');
      document.getElementsByTagName('html')[0].className =
        'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
  );

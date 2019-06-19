import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Basic Components', module).add(
  'Button',
  withReadme(README, () => {
    const el = document.createElement('gux-button');
    el.disabled = boolean('disabled', false);
    el.title = text('title', 'Blop');
    el.text = text('text', 'Blop');
    el.leftIcon = text('leftIcon', '');
    el.rightIcon = text('rightIcon', '');
    el.accent = select('accent', ['primary', 'secondary'], 'secondary');
    el.addEventListener('click', e => action('click')(e)); // native event
    document.getElementsByTagName('html')[0].className =
      'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
    return el;
  })
);

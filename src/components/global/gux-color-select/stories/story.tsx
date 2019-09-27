import { action } from '@storybook/addon-actions';
import { array, select, text } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Basic Components', module).add(
  'Color Select',
  withReadme(README, () => {
    const el = document.createElement('gux-color-select');
    el.value = text('value', '');
    el.customColors = array('customColors', []);
    el.addEventListener('input', e => action('input')(e.detail));
    document.getElementsByTagName('html')[0].className =
      'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
    return el;
  })
);

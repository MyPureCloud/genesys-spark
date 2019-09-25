import { action } from '@storybook/addon-actions';
import {
  array,
  boolean,
  number,
  select,
  text
} from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Basic Components', module).add(
  'Rating',
  withReadme(README, () => {
    const el = document.createElement('gux-rating');
    el.setAttribute('aria-label', text('aria-label', 'label'));
    el.disabled = boolean('disabled', false);
    el.rating = number('rating', 0);
    el.maxRating = number('maxRating', 5);
    el.allowHalfRatings = boolean('allowHalfRatings', false);
    el.labels = array('labels', []);
    el.addEventListener('update', e => action('update')(e.detail));
    document.getElementsByTagName('html')[0].className =
      'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
    return el;
  })
);

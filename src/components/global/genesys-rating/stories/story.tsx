import { action } from '@storybook/addon-actions';
import { array, boolean, number, select, text, withKnobs } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme  } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Genesys Components', module)
.addDecorator(withKnobs)
.add(
    'Genesys Rating',
    withReadme(README, () => {
      const el = document.createElement('genesys-rating');
      el.setAttribute('aria-label', text('aria-label', 'label'));
      el.disabled = boolean('disabled', false);
      el.rating = number('rating', 0);
      el.maxRating = number('maxRating', 5);
      el.allowHalfRatings =  boolean('allowHalfRatings', false);
      el.labels = array('labels', []);
      el.addEventListener('update', e => action('update')(e.detail));
      document.getElementsByTagName('html')[0].className = 'genesys-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
);

import { action } from '@storybook/addon-actions';
import { select, text, withKnobs } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme  } from 'storybook-readme';

import README from 'MD/genesys-text-field/README.md';

storiesOf('Genesys Components', module)
.addDecorator(withKnobs)
.add(
    'Genesys Text Field',
    withReadme(README, () => {
      const el = document.createElement('genesys-text-field'); 
      el.first = text('first', 'Blop');
      el.last = text('last', 'Blop');
      el.middle = text('middle', 'Blop');
      el.addEventListener('custom', e => action('custom')(e.detail));
      document.getElementsByTagName('html')[0].className = 'genesys-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
);

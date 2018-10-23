import { action } from '@storybook/addon-actions';
import { array, object, select, withKnobs } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme  } from 'storybook-readme';

import README from 'MD/genesys-list/README.md';

storiesOf('Genesys Components', module)
.addDecorator(withKnobs)
.add(
    'Genesys List',
    withReadme(README, () => {
      const el = document.createElement('genesys-list'); 
      el.items = object('items', [
        {'text': 'test', 'callback': (i) => {alert('test:'+ JSON.stringify(i));}},
        {'type': 'divider'},
        {'text': 'test2'}
      ]);
      el.addEventListener('custom', e => action('custom')(e.detail));
      document.getElementsByTagName('html')[0].className = 'genesys-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
);

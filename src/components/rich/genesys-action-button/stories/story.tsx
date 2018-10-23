import { action } from '@storybook/addon-actions';
import { object, select, text, withKnobs } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme  } from 'storybook-readme';

import README from 'MD/genesys-action-button/README.md';

storiesOf('Genesys Rich Components', module)
.addDecorator(withKnobs)
.add(
    'Genesys Action Button',
    withReadme(README, () => {
      const el = document.createElement('genesys-action-button');
      el.text = text('text', 'Blop');
      el.items = object('items', [
        {'text': 'test', 'callback': (i) => {alert('test:'+ JSON.stringify(i));}},
        {'text': 'test2'}
      ]);
      el.addEventListener('open', e => action('open')());
      el.addEventListener('close', e => action('close')());
      el.addEventListener('actionClick', e => action('actionClick')());
      el.accent = select('accent', ['primary', 'secondary'], 'secondary');
      document.getElementsByTagName('html')[0].className = 'genesys-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
);

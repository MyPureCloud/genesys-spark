import { boolean, select, text, withKnobs } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme  } from 'storybook-readme';

import README from 'MD/genesys-button/README.md';

storiesOf('Genesys Components', module)
.addDecorator(withKnobs)
.add(
    'Genesys Button',
    withReadme(README, () => {
      const el = document.createElement('genesys-button');
      el.disabled = boolean('disabled', false);
      el.innerText='Blop';
      el.title = text('title', 'Blop');
      el.accent = select('accent', ['primary', 'secondary'], 'secondary');
      document.getElementsByTagName('html')[0].className = 'genesys-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
);

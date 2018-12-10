import { checkA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import { select, text, withKnobs } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { html, render } from 'lit-html';
import { withReadme  } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Genesys Components', module)
.addDecorator(withKnobs)
.addDecorator(checkA11y)
.add(
    'Genesys Disclosure Button',
    withReadme(README, () => {
      const el = document.createElement('div');
      render(html`
        <h2>Basic samples</h2>
        <genesys-disclosure-button></genesys-disclosure-button>
        <h2>Interactive sample</h2>
        <genesys-disclosure-button
          id='interactive'
          first=${text('first', 'blob')}
          last=${text('last', 'Blop')}
          middle=${text('middle', 'Blop')}
        >
        </genesys-disclosure-button>
      `, el);
      setTimeout(() => {
        const it = document.getElementById('interactive');
        it.addEventListener('custom', e => action('custom')(e.detail));
      }, 100);
      document.getElementsByTagName('html')[0].className = 'genesys-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
);

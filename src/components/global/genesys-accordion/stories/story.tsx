import { action } from '@storybook/addon-actions';
import { select, array, withKnobs } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { html, render } from 'lit-html';
import { withReadme  } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Genesys Components', module)
.addDecorator(withKnobs)
.add(
    'Genesys Accordion',
    withReadme(README, () => {
      const el = document.createElement('div');
      render(html`
        <genesys-accordion id='interactive'>
          <div slot="first">
            <span>I'm a span in a div.</span>
          </div>
          <p slot="second">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <span slot="third">I'm a span.</span>
          <h1>I'm an h1, but i'm not a slot.</h1>
        </genesys-accordion>
      `, el);
      setTimeout(() => {
        const it = document.getElementById('interactive');
        it.addEventListener('custom', e => action('custom')(e.detail));
      }, 100);
      document.getElementsByTagName('html')[0].className = 'genesys-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
);

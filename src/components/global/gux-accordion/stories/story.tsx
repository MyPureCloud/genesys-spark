import { select } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { html, render } from 'lit-html';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Genesys Components', module)
  .add(
    'Genesys Accordion',
    withReadme(README, () => {
      const el = document.createElement('div');
      render(
        html`
        <gux-accordion id='interactive'>
          <div slot="First Section">
            <span>I'm a span in a div.</span>
            <button>I'm the button.</button>
          </div>
          <p slot="Second Section">I'm a p.</p>
          <span slot="Third Section">I'm a span.</span>
          <h1>I'm an h1, but i'm not a slot.</h1>
        </gux-accordion>
      `,
        el
      );
      document.getElementsByTagName('html')[0].className =
        'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
  );

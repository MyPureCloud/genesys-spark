import { checkA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import {
  boolean,
  select,
  text,
  withKnobs
} from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { html, render } from 'lit-html';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Basic Components', module)
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .add(
    'Modal',
    withReadme(README, () => {
      const el = document.createElement('div');
      render(
        html`
        <h2>Interactive sample</h2>
        <gux-button id='interactive-button' text='Display modal'></gux-button>
        <gux-modal
          id="interactive"
          size=${select('size', ['small', 'medium', 'large'], 'small')}
          modalTitle=${text('modalTitle', 'Modal Header')}
        >
          <div slot="modal-content">This contains the modal content.</div>
          <div slot="additional-buttons">
            <gux-button title='Button' text='Text' accent='primary'></gux-button>
        </gux-modal>
      `,
        el
      );
      setTimeout(() => {
        const it = document.getElementById('interactive');
        it.active = boolean('active', false);
        it.addEventListener('active', e => action('active')(e.detail));
        const interactiveButton = document.getElementById('interactive-button');
        interactiveButton.addEventListener('click', () => {
          it.active = true;
        });
      }, 100);
      document.getElementsByTagName('html')[0].className =
        'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
  );

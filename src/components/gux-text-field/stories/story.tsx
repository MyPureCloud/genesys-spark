import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { html, render } from 'lit-html';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Basic Components', module).add(
  'Text Field',
  withReadme(README, () => {
    const el = document.createElement('div');
    render(
      html`
        <h3>Basic samples</h3>
        <h4>Unpopulated</h4>
        <gux-text-field></gux-text-field>
        <h4>Ghost text</h4>
        <gux-text-field placeholder="Type here"></gux-text-field>
        <h4>Populated</h4>
        <gux-text-field
          placeholder="Type here"
          value="blop blop"
        ></gux-text-field>
        <h4>Error</h4>
        <gux-text-field error-message="Error message here"></gux-text-field>
        <h4>Password</h4>
        <gux-text-field
          type="password"
          placeholder="Enter password here"
        ></gux-text-field>
        <h3>Interactive sample</h3>
        <gux-text-field
          id="interactive"
          placeholder=${text('placeholder', 'placeholder')}
          type=${text('type', 'text')}
          erase-label=${text('erase-label', 'erase')}
          error-message=${text('error-message', '')}
          error-message-type=${text('error-message-type', 'error')}
          value=${text('value', 'value')}
          disabled=${boolean('disabled', false)}
          readonly=${boolean('readOnly', false)}
        >
        </gux-text-field>
      `,
      el
    );
    setTimeout(() => {
      const it = document.getElementById('interactive');
      it.addEventListener('input', e => action('input')(e.detail));
      it.addEventListener('focus', e => action('focus')(e.detail));
    }, 100);
    document.getElementsByTagName('html')[0].className =
      'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
    return el;
  })
);

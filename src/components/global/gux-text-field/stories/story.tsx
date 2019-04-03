import { action } from '@storybook/addon-actions';
import {
  boolean,
  select,
  text
} from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { html, render } from 'lit-html';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Basic Components', module)
  .add(
    'Text Field',
    withReadme(README, () => {
      const el = document.createElement('div');
      render(
        html`
        <h2>Basic samples</h2>
        <i>Unpopulated</i><br/><br/>
        <gux-text-field label='Name'></gux-text-field>

        <gux-text-field label='Longer name above'></gux-text-field>
        <br/><i>Ghost text</i><br/><br/>
        <gux-text-field label='Name' placeholder='Type here'></gux-text-field>
        <gux-text-field label='Longer name above' placeholder='Type here'></gux-text-field>
        <br/><i>Populated</i><br/><br/>
        <gux-text-field label='Name' placeholder='Type here' value='blop blop'></gux-text-field>
        <gux-text-field label='Longer name above' placeholder='Type here' value='blop blop'></gux-text-field>
        <br/><i>Error</i><br/><br/>
        <gux-text-field error-message='Error message here' label='Name'></gux-text-field>
        <gux-text-field error-message='Error message here' label='Longer name above'></gux-text-field>
        <gux-text-field label='Edit login password' type='password' placeholder='Enter password here'></gux-text-field>
        <br/><br/><h2>Interactive sample</h2>
        <gux-text-field
          id='interactive'
          placeholder=${text('placeholder', 'placeholder')}
          type=${text('type', 'text')}
          label=${text('label', 'label')}
          erase-label=${text('erase-label', 'erase')}
          label-position=${text('label-position', '')}
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

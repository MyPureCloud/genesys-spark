import { action } from '@storybook/addon-actions';
import { select, text, withKnobs } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { html, render } from 'lit-html';
import { withReadme  } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Genesys Components', module)
.addDecorator(withKnobs)
.add(
    'Genesys Text Field',
    withReadme(README, () => {
      const el = document.createElement('div');
      render(html`
        <h2>Basic samples</h2>
        <i>Unpopulated</i><br/><br/>
        <genesys-text-field label='Name'></genesys-text-field>

        <genesys-text-field label='Longer name above'></genesys-text-field>
        <br/><i>Ghost text</i><br/><br/>
        <genesys-text-field label='Name' placeholder='Type here'></genesys-text-field>
        <genesys-text-field label='Longer name above' placeholder='Type here'></genesys-text-field>
        <br/><i>Populated</i><br/><br/>
        <genesys-text-field label='Name' placeholder='Type here' value='blop blop'></genesys-text-field>
        <genesys-text-field label='Longer name above' placeholder='Type here' value='blop blop'></genesys-text-field>
        <br/><i>Error</i><br/><br/>
        <genesys-text-field error-message='Error message here' label='Name'></genesys-text-field>
        <genesys-text-field error-message='Error message here' label='Longer name above'></genesys-text-field>
        <br/><br/><h2>Interactive sample</h2>
        <genesys-text-field
          id='interactive'
          placeholder=${text('placeholder', 'placeholder')}
          label=${text('label', 'label')}
          erase-label=${text('erase-label', 'erase')}
          label-position=${text('label-position', '')}
          error-message=${text('error-message', '')}
          error-message-type=${text('error-message-type', 'error')}
          value=${text('value', 'value')}
        >
        </genesys-text-field>
      `, el);
      setTimeout(() => {
        const it = document.getElementById('interactive');
        it.addEventListener('input', e => action('input')(e.detail));
        it.addEventListener('focus', e => action('focus')(e.detail));
      }, 100);
      document.getElementsByTagName('html')[0].className = 'genesys-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
);

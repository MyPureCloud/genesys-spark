import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import { boolean, object, select, text, withKnobs } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { html, render } from 'lit-html';
import { withReadme  } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Genesys Components', module)
.addDecorator(withKnobs)
.addDecorator(checkA11y)
.add(
    'Genesys Dropdown',
    withReadme(README, () => {
      const el = `
        <genesys-dropdown
          mode="${select('mode', ['default', 'page', 'palette'], 'default')}"
          disabled="${boolean('disabled', false)}"
          filterable="${boolean('filterable', false)}"
          value="${text('value', '')}"
          label="${text('label', 'Interactive Select')}"
          placeholder="${text('placeholder', 'Select...')}">
        </genesys-dropdown>
        <genesys-dropdown
          mode="page"
          filterable="false"
          label="Page Title Select"
          placeholder="Select...">
        </genesys-dropdown>
        <genesys-dropdown
          mode="palette"
          filterable="false"
          label="Palette Select'"
          placeholder="Select...">
        </genesys-dropdown>
      `;
      setTimeout(() => {
        const its = Array.from(document.getElementsByTagName('genesys-dropdown'));
        its.map(it => {
          it.items = [
            { text: 'Belgium' },
            { text: 'Brazil' },
            { text: 'France' },
            { text: 'Spain', isDisabled: true }
          ];
          it.addEventListener('change', e => action('change')(e.detail));
        });
      }, 100);
      document.getElementsByTagName('html')[0].className = 'genesys-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
);

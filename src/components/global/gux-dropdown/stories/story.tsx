import { checkA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme  } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Genesys Components', module)
.addDecorator(withKnobs)
.addDecorator(checkA11y)
.add(
    'Genesys Dropdown',
    withReadme(README, () => {
      const el = `
        <gux-dropdown
          mode="${select('mode', ['default', 'page', 'palette'], 'default')}"
          disabled="${boolean('disabled', false)}"
          filterable="${boolean('filterable', false)}"
          value="${text('value', '')}"
          label="${text('label', 'Interactive Select')}"
          placeholder="${text('placeholder', 'Select...')}">
        </gux-dropdown>
        <gux-dropdown
          mode="page"
          filterable="false"
          label="Page Title Select"
          placeholder="Select...">
        </gux-dropdown>
        <gux-dropdown
          mode="palette"
          filterable="false"
          label="Palette Select'"
          placeholder="Select...">
        </gux-dropdown>
      `;
      setTimeout(() => {
        const its = Array.from(document.getElementsByTagName('gux-dropdown'));
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
      document.getElementsByTagName('html')[0].className = 'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
);

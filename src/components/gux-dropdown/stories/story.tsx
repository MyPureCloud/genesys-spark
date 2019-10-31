import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Basic Components', module).add(
  'Dropdown',
  withReadme(README, () => {
    const el = `
        <gux-dropdown
          mode="${select('mode', ['default', 'page', 'palette'], 'default')}"
          disabled="${boolean('disabled', false)}"
          filterable="${boolean('filterable', false)}"
          value="${text('value', '')}"
          placeholder="${text('placeholder', 'Select...')}">
        </gux-dropdown>
        <h4>Page Title Select</h4>
        <gux-dropdown
          mode="page"
          filterable="false"
          placeholder="Select...">
        </gux-dropdown>
        <h4>Palette Select</h4>
        <gux-dropdown
          mode="palette"
          filterable="false"
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
    document.getElementsByTagName('html')[0].className =
      'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
    return el;
  })
);

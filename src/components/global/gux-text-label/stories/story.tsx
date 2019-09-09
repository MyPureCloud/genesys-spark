import { select, text } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { html, render } from 'lit-html';
import { withReadme } from 'storybook-readme';
import './story.css';

import README from '../readme.md';

storiesOf('Basic Components', module).add(
  'Text Label',
  withReadme(README, () => {
    const el = document.createElement('div');
    render(
      html`
        <gux-text-label
          label="${text('label', 'Form Input')}"
          position=${select('position', ['above', 'beside'], 'beside')}
        >
          <gux-text-field></gux-text-field>
        </gux-text-label>

        <gux-text-label
          position=${select('position', ['above', 'beside'], 'above')}
        >
          <div slot="label">
            <i class="genesys-icon-gear-add"></i>${text('label', 'Form Input')}
          </div>
          <gux-text-field></gux-text-field>
        </gux-text-label>

        <gux-text-label
          label="Country"
          position=${select('position', ['above', 'beside'], 'above')}
        >
          <gux-dropdown></gux-dropdown>
        </gux-text-label>

        <gux-text-label
          label="Advanced Dropdown"
          position=${select('position', ['above', 'beside'], 'above')}
        >
          <gux-advanced-dropdown></gux-advanced-dropdown>
        </gux-text-label>

        <gux-text-label
          label="Search"
          position=${select('position', ['vertical', 'horizontal'], 'vertical')}
        >
          <gux-search></gux-search>
        </gux-text-label>
      `,
      el
    );
    setTimeout(() => {
      const its = Array.from(document.getElementsByTagName('gux-dropdown'));
      its.map(it => {
        it.items = [
          { text: 'Belgium' },
          { text: 'Brazil' },
          { text: 'France' },
          { text: 'Spain', isDisabled: true }
        ];
      });
    }, 100);
    document.getElementsByTagName('html')[0].className =
      'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
    return el;
  })
);

import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { html, render } from 'lit-html';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Basic Components', module).add(
  'Advanced Dropdown',
  withReadme(README, () => {
    const el = document.createElement('div');
    render(
      html`
        <gux-advanced-dropdown
          disabled="${boolean('disabled', false)}"
          label="${text('label', 'Interactive Select')}"
          placeholder="${text('placeholder', 'Select...')}">
        </gux-advanced-dropdown>
        <h2>Foobar</h2>
      `,
      el
    );
    setTimeout(() => {
      const its = Array.from(
        document.getElementsByTagName('gux-advanced-dropdown')
      );
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

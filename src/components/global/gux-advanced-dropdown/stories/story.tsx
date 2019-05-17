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
        <h2>Select One</h2>
        <gux-advanced-dropdown
          id="select-one"
          label="Selection One option"
          placeholder="[None]">
          <gux-dropdown-option value="en-US">American English</gux-dropdown-option>
          <gux-dropdown-option value="es">Latin American Spanish</gux-dropdown-option>
          <gux-dropdown-option value="es-ES">European Spanish</gux-dropdown-option>
          <gux-dropdown-option value="en-UK" >UK English</gux-dropdown-option>
          <gux-dropdown-option value="fr-CA">Canadian French</gux-dropdown-option>
          <gux-dropdown-option value="fr">European French</gux-dropdown-option>
          <gux-dropdown-option value="nl">Dutch</gux-dropdown-option>
        </gux-advanced-dropdown>
      `,
      el
    );

    setTimeout(() => {
      document
        .getElementById('select-one')
        .addEventListener('input', (value: CustomEvent) => {
          action('select-one')(value.detail);
        });
    }, 100);

    document.getElementsByTagName('html')[0].className =
      'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
    return el;
  })
);

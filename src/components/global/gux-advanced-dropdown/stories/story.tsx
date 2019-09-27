import { action } from '@storybook/addon-actions';
import { boolean, number, select } from '@storybook/addon-knobs/polymer';
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
          disabled=${boolean('disabled', false)}
          no-filter=${boolean('noFilter', false)}
          filter-debounce-timeout=${number('filterDebounceTimeout', 500)}
          id="select-one"
          placeholder="[None]"
        >
          <gux-dropdown-option
            selected
            value="en-US"
            text="American English"
          ></gux-dropdown-option>
          <gux-dropdown-option
            value="es"
            text="Latin American Spanish"
          ></gux-dropdown-option>
          <gux-dropdown-option
            value="es-ES"
            text="European Spanish"
          ></gux-dropdown-option>
          <gux-dropdown-option
            value="en-UK"
            text="UK English"
          ></gux-dropdown-option>
          <gux-dropdown-option
            value="fr-CA"
            text="Canadian French"
          ></gux-dropdown-option>
          <gux-dropdown-option
            value="fr"
            text="European French"
          ></gux-dropdown-option>
          <gux-dropdown-option value="nl" text="Dutch"></gux-dropdown-option>
        </gux-advanced-dropdown>
      `,
      el
    );

    setTimeout(() => {
      const selectOne = document.getElementById('select-one');
      selectOne.addEventListener('input', (value: CustomEvent) => {
        action('select-one-input')(value.detail);
      });
      selectOne.addEventListener('filter', (value: CustomEvent) => {
        action('select-one-filter')(value.detail);
      });
    }, 100);

    document.getElementsByTagName('html')[0].className =
      'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
    return el;
  })
);

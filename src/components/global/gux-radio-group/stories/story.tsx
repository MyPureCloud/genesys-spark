import { checkA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import { select, withKnobs } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Basic Components', module)
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .add(
    'Radios',
    withReadme(README, () => {
      const container = document.createElement('div');

      container.innerHTML = `<style>gux-radio { padding: 4px; }</style>
        <gux-radio-group name="food-selection" aria-labelledby="food-header">
          <h4 id="food-header">Simple Radios</h4>

          <gux-radio id="pizza-radio" value="pizza">Pizza</gux-radio>
          <gux-radio id="pasta-radio" value="pasta">Pasta</gux-radio>
          <gux-radio id="burger-radio" value="burger">Hamburger</gux-radio>
          <gux-radio id="sandwich-radio" value="sandwich" disabled="true">Sandwich</gux-radio>
        </gux-radio-group>
      `;

      [
        '#pizza-radio',
        '#pasta-radio',
        '#burger-radio',
        '#sandwich-radio'
      ].forEach(r =>
        container
          .querySelector(r)
          .addEventListener('check', (e: any) =>
            action(`radio[${e.target.value}].check`)(e.detail)
          )
      );

      container
        .querySelector('gux-radio-group')
        .addEventListener('input', (e: any) =>
          action(`radio-group.input`)(e.detail)
        );

      document.getElementsByTagName('html')[0].className =
        'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';

      return container;
    })
  );

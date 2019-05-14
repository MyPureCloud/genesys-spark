import { checkA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import {
  boolean,
  select,
  text,
  withKnobs
} from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import { GuxCheckbox } from '../gux-checkbox';

import README from '../readme.md';

storiesOf('Genesys Components', module)
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .add(
    'Genesys Checkbox',
    withReadme(README, () => {
      const container = document.createElement('div');
      container.innerHTML = `<style>gux-checkbox { padding: 4px; }</style>
          <h4 id="food-header">Simple Checkboxes</h4>

          <gux-checkbox id="pizza-checkbox">Pizza</gux-checkbox>
          <gux-checkbox id="pasta-checkbox" checked>Pasta</gux-checkbox>
          <gux-checkbox id="burger-checkbox" indeterminate>Hamburger</gux-checkbox>
          <gux-checkbox id="sandwich-checkbox" disabled="true">Sandwich</gux-checkbox>
      `;

      const cb = (container.querySelector(
        '#sandwich-checkbox'
      ) as any) as GuxCheckbox;
      cb.label = text('label', 'Sandwich');
      cb.checked = boolean('checked');
      cb.indeterminate = boolean('indeterminate');
      cb.disabled = boolean('disabled', true);

      [
        '#pizza-checkbox',
        '#pasta-checkbox',
        '#burger-checkbox',
        '#sandwich-checkbox'
      ].forEach(r =>
        container
          .querySelector(r)
          .addEventListener('check', (e: any) =>
            action(`${e.target.id}.checked`)(e.detail)
          )
      );

      document.getElementsByTagName('html')[0].className =
        'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return container;
    })
  );

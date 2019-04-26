import { checkA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';
import { GuxCheckbox } from '../gux-checkbox';

const createCheckbox = (
  label: string,
  checked: boolean | null | 'undefined'
) => {
  const cb = document.createElement('gux-checkbox');
  cb.label = label;

  if (checked === undefined || checked === 'undefined') {
    cb.checked = undefined;
  } else {
    cb.checked = checked === null ? undefined : checked;
  }

  cb.addEventListener('checkedChanged', (e: any) =>
    action('checkedChanged')(e.detail)
  );

  return cb;
};

storiesOf('Genesys Components', module)
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .add(
    'Genesys Checkbox',
    withReadme(README, () => {
      const container = document.createElement('div');
      container.innerHTML = `<style>gux-checkbox { padding: 4px; }</style>
          <h4 id="food-header">Simple Checkboxes</h4>

          <gux-checkbox id="pizza-checkbox" label="Pizza"></gux-checkbox>
          <gux-checkbox id="pasta-checkbox" label="Pasta" checked></gux-checkbox>
          <gux-checkbox id="burger-checkbox" label="Hamburger" indeterminate></gux-checkbox>
          <gux-checkbox id="sandwich-checkbox" label="Sandwich" disabled="true"></gux-checkbox>
      `;

      const cb = container.querySelector('#sandwich-checkbox') as any as GuxCheckbox;
      cb.label = text('label', 'Sandwich');
      cb.checked = boolean('checked')
      cb.indeterminate = boolean('indeterminate')
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

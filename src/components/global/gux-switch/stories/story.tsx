import { checkA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import { object, select, withKnobs } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { html, render } from 'lit-html';
import { withReadme } from 'storybook-readme';
import README from '../readme.md';

storiesOf('Genesys Components', module)
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .add(
    'Genesys Switch',
    withReadme(README, () => {
      const el = document.createElement('div');
      const items = object('items', [
        {
          displayName: 'Month',
          value: 'Month'
        },
        {
          displayName: 'Week',
          value: 'Week'
        },
        {
          displayName: 'Day',
          value: 'Day'
        },
        {
          displayName: 'Hour',
          isDisabled: true,
          value: 'Hour'
        },
        {
          displayName: 'Minute',
          value: 'Minute'
        }
      ]);

      const selectedValue = select('selectedValue', items.map(item => item.value), items[0].value);

      render(
        html`
        <h2>Small</h2>
        <gux-switch
          id='small'
          layout='small'
          selected-value=${selectedValue}
        >
        </gux-switch>
        <h2>Medium</h2>
        <gux-switch
          id='medium'
          layout='medium'
          selected-value=${selectedValue}
        >
        </gux-switch>
        <h2>Large</h2>
        <gux-switch
          id='large'
          layout='large'
          selected-value=${selectedValue}
        >
        </gux-switch>
      `,
        el
      );

      setTimeout(() => {
        const smallSwitch = document.getElementById('small');
        smallSwitch.addEventListener('selectionChanged', e => action('selectionChanged')(e.detail));
        smallSwitch.items = items;

        const mediumSwitch = document.getElementById('medium');
        mediumSwitch.addEventListener('selectionChanged', e => action('selectionChanged')(e.detail));
        mediumSwitch.items = items;

        const largeSwitch = document.getElementById('large');
        largeSwitch.addEventListener('selectionChanged', e => action('selectionChanged')(e.detail));
        largeSwitch.items = items;
      }, 100);

      document.getElementsByTagName('html')[0].className =
        'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
  );


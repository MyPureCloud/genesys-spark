import { checkA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import {
  number,
  select,
  text,
  withKnobs
} from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Pickers', module)
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .add(
    'Datepicker',
    withReadme(README, () => {
      const el: HTMLGuxDatepickerElement = document.createElement(
        'gux-datepicker'
      ) as HTMLGuxDatepickerElement;
      el.format = text('format', 'mm/dd/yyyy');
      el.mode = select('mode', ['single', 'range'], 'single');
      el.label = text('label', 'Time');
      el.numberOfMonths = number('numberOfMonths', 1);
      el.firstDayOfWeek = number('firstDayOfWeek', 0, {
        max: 6,
        min: 0,
        range: true,
        step: 1
      });
      el.locale = text(
        'locale',
        navigator.languages ? navigator.languages[0] : navigator.language
      );
      el.addEventListener('change', (e: CustomEvent) =>
        action('change')(e.detail)
      );
      document.getElementsByTagName('html')[0].className =
        'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
  );

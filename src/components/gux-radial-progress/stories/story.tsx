import { checkA11y } from '@storybook/addon-a11y';
import { number, select, withKnobs } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { html, render } from 'lit-html';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Basic Components', module)
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .add(
    'Radial Progress',
    withReadme(README, () => {
      const el = document.createElement('div');
      const component = document.createElement('gux-radial-progress');
      let percentage = 0;
      component.value = percentage;
      const timer = () => {
        if (percentage >= 100) {
          return;
        }
        percentage += 1;
        component.value = percentage;
        setTimeout(timer, 30);
      };
      timer();
      render(
        html`
          <h2>Basic sample</h2>
          ${component}
          <h2>No Percentage sample</h2>
          <gux-radial-progress></gux-radial-progress>
          <h2>Interactive sample</h2>
          <gux-radial-progress
            value=${number('value', 0, { min: 0, max: 100 })}
            max=${number('max', 100)}
          >
          </gux-radial-progress>
        `,
        el
      );
      document.getElementsByTagName('html')[0].className =
        'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
  );

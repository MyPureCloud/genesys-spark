import { action } from '@storybook/addon-actions';
import {
  boolean,
  number,
  select
} from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { html, render } from 'lit-html';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Basic Components', module)
  .add(
    'Slider',
    withReadme(README, () => {
      const el = document.createElement('div');
      render(
        html`
      <div style="padding:50px 25px 0px 25px;">
        <gux-slider
          id="interactive"
          min=${number('min', 0)}
          max=${number('max', 10)}
          step=${number('step', 1)}
          value=${number('value', 3)}
          >
        </gux-slider>
      </div>`,
        el
      );
      setTimeout(() => {
        const slider = document.getElementById('interactive');
        slider.isPercentage = boolean('isPercentage', true);
        slider.displayTextBox = boolean('displayTextBox', true);
        slider.addEventListener('update', e => action('update')(e.detail));
      }, 100);
      document.getElementsByTagName('html')[0].className =
        'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
  );

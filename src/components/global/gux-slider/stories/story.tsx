import { action } from '@storybook/addon-actions';
import {
  boolean,
  number,
  select,
  withKnobs
} from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { html, render } from 'lit-html';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Genesys Components', module)
  .addDecorator(withKnobs)
  .add(
    'Genesys Slider',
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
          isPercentage=${boolean('isPercentage', true)}
          displayTextBox=${boolean('displayTextBox', true)}
          >
        </gux-slider>
      </div>`,
        el
      );
      setTimeout(() => {
        const slider = document.getElementById('interactive');
        slider.addEventListener('update', e => action('update')(e.detail));
      }, 100);
      document.getElementsByTagName('html')[0].className =
        'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
  );

import { action } from '@storybook/addon-actions';
import { boolean, number, select, text, withKnobs } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme  } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Genesys Components', module)
.addDecorator(withKnobs)
.add(
    'Genesys Slider',
    withReadme(README, () => {
      const el = document.createElement('genesys-slider');
      el.displayTextBox = boolean('displayTextBox', true);
      el.min = number('min', 0);
      el.max = number('max', 10);
      el.value = number('value', 5);
      document.getElementsByTagName('html')[0].className = 'genesys-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
);

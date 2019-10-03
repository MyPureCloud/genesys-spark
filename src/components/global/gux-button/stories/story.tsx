import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Basic Components', module).add(
  'Button',
  withReadme(README, () => {
    const buttonElement = document.createElement('gux-button');
    buttonElement.disabled = boolean('disabled', false);
    buttonElement.title = text('title', 'Blop');
    buttonElement.accent = select(
      'accent',
      ['primary', 'secondary'],
      'secondary'
    );
    buttonElement.addEventListener('click', e => action('click')(e)); // native event

    const buttonContentElement = document.createElement('span');
    buttonContentElement.innerHTML = 'Blob';

    buttonElement.appendChild(buttonContentElement);

    document.getElementsByTagName('html')[0].className =
      'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
    return buttonElement;
  })
);

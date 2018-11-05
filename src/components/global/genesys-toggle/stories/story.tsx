import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme  } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Genesys Components', module)
.addDecorator(withKnobs)
.add(
    'Genesys Toggle',
    withReadme(README, () => {
      const el = document.createElement('genesys-toggle');
      el.checked = boolean('checked', false);
      el.disabled = boolean('disabled', false);
      el.checkedLabel = text('checkedLabel', 'on');
      el.uncheckedLabel = text('uncheckedLabel', 'off');
      el.addEventListener('check', e => action('check')(e.detail));
      document.getElementsByTagName('html')[0].className = 'genesys-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
);

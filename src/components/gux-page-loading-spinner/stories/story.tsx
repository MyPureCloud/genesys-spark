import { checkA11y } from '@storybook/addon-a11y';
import { select, withKnobs } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Basic Components', module)
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .add(
    'Page Loading Spinner',
    withReadme(README, () => {
      const el = document.createElement('gux-page-loading-spinner');
      document.getElementsByTagName('html')[0].className =
        'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
  );

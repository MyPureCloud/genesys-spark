import { checkA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import { select, text, withKnobs } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

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
      container.appendChild(createCheckbox('Check me out!', false));
      container.appendChild(createCheckbox('I can be initially checked', true));
      container.appendChild(
        createCheckbox('Or even display an indeterminate value', undefined)
      );

      container.appendChild(
        createCheckbox(
          text('label', 'Play around with my knobs'),
          select('checked', {
            undefined: 'undefined',
            // tslint:disable-next-line:object-literal-sort-keys
            true: true,
            // tslint:disable-next-line:object-literal-sort-keys
            false: false
          })
        )
      );

      document.getElementsByTagName('html')[0].className =
        'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return container;
    })
  );

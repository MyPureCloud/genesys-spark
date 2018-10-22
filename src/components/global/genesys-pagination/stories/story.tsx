import { number, select, withKnobs } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import README from 'MD/genesys-pagination/README.md';

storiesOf('Genesys Components', module)
  .addDecorator(withKnobs)
  .add(
    'Genesys Pagination',
    withReadme(README, () => {
      const component = document.createElement('genesys-pagination');
      component.totalItems = number('totalItems', 270);
      component.currentPage = number('currentPage', 4);

      document.getElementsByTagName('html')[0].className =
        'genesys-' + select('theme', ['dark', 'default'], 'default') + '-theme';

      return component;
    })
  );

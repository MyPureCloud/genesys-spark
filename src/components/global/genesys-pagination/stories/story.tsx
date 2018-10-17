import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';
import { withKnobs, number, select } from '@storybook/addon-knobs/polymer';

import README from 'MD/genesys-pagination/README.md';

storiesOf('Genesys Components', module)
  .addDecorator(withKnobs)
  .add(
    'Genesys Pagination',
    withReadme(README, () => {
      const component = document.createElement('genesys-pagination');
      component.totalPages = number('totalPages', 10);
      component.currentPage = number('currentPage', 4);

      document.getElementsByTagName('html')[0].className =
        'genesys-' + select('theme', ['dark', 'default'], 'default') + '-theme';

      return component;
    })
  );

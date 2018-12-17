import { action } from '@storybook/addon-actions';
import { array, number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import readme from '../readme.md';

const createComponent = () => document.createElement('genesys-pagination');

const createActionLoggers = story => {
  const component = story();

  component.addEventListener('pageChanged', ev =>
    action('pageChanged')(ev.detail)
  );

  component.addEventListener('itemsPerPageChanged', ev =>
    action('itemsPerPageChanged')(ev.detail)
  );

  return component;
};

storiesOf('Pagination', module)
  .addDecorator(withKnobs)
  .addDecorator(createActionLoggers)
  .add(
    'Simple',
    withReadme(readme, () => {
      const component = createComponent();
      component.totalItems = number('totalItems', 250);

      return component;
    })
  )
  .add(
    'Complex',
    withReadme(readme, () => {
      const component = createComponent();
      component.totalItems = number('totalItems', 250);
      component.currentPage = number('currentPage', 3);

      const itemsPerPage = number('setItemsPerPage(value)', 20);
      const itemsPerPageOptions = array('setItemsPerPage(options)', [
        10,
        20
      ]).map(i => parseInt(i, 10));

      component.componentOnReady().then(() => {
        component.setItemsPerPage(itemsPerPage, itemsPerPageOptions);
      });

      return component;
    })
  )
  .add(
    'No Items Per Page options',
    withReadme(readme, () => {
      const component = createComponent();
      component.totalItems = number('totalItems', 250);
      component.currentPage = number('currentPage', 3);

      const itemsPerPage = number('setItemsPerPage(value)', 20);

      component.componentOnReady().then(() => {
        component.setItemsPerPage(itemsPerPage, []);
      });

      return component;
    })
  );

import { action } from '@storybook/addon-actions';
import { array, number, withKnobs } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import README from 'MD/genesys-pagination/README.md';

const createWrapper = story => {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('style', 'padding: 24px');

  wrapper.appendChild(story());

  return wrapper;
};

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
  .addDecorator(createWrapper)
  .addDecorator(createActionLoggers)
  .add(
    'Simple',
    withReadme(README, () => {
      const component = createComponent();
      component.totalItems = number('totalItems', 250);

      return component;
    })
  )
  .add(
    'Complex',
    withReadme(README, () => {
      const component = createComponent();
      component.totalItems = number('totalItems', 250);
      component.currentPage = number('currentPage', 3);
      component.itemsPerPage = number('itemsPerPage', 20);
      component.itemsPerPageOptions = array('itemsPerPage', [10, 20]);

      return component;
    })
  )
  .add(
    'Preset Items Per Page',
    withReadme(README, () => {
      const component = createComponent();
      component.totalItems = number('totalItems', 250);
      component.currentPage = number('currentPage', 3);
      component.itemsPerPage = number('itemsPerPage', 50);
      component.itemsPerPageOptions = null;

      return component;
    })
  );

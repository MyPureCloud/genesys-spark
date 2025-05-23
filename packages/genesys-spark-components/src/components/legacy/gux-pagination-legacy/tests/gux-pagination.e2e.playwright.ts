import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-pagination.common';

test.describe('gux-pagination-legacy', () => {
  test.describe('#render', () => {
    checkRenders({ renderConfigs, element: 'gux-pagination-legacy' });
  });
});

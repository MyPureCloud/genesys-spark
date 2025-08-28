import { checkRenders, test } from '@test/playwrightTestUtils';

import { renderConfigs } from './gux-form-field-search.common';

test.describe('gux-form-field-search', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs,
      element: 'gux-form-field-search'
    });
  });
});

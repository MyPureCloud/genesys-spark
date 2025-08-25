import { checkRenders, test } from '@test/playwrightTestUtils';

import { renderConfigs } from './gux-form-field-text-like.common';

test.describe('gux-form-field-text-like', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs,
      element: 'gux-form-field-text-like'
    });
  });
});

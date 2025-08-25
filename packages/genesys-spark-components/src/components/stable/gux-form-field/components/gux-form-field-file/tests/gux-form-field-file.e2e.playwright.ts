import { checkRenders, test } from '@test/playwrightTestUtils';

import { renderConfigs } from './gux-form-field-file.common';

test.describe('gux-form-field-file', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs,
      element: 'gux-form-field-file'
    });
  });
});

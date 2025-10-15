import { checkRenders, test } from '@test/playwrightTestUtils';

import { renderConfigs } from './gux-form-field-file.common';

const axeExclusions = [];

test.describe('gux-form-field-file-beta', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs,
      element: 'gux-form-field-file-beta',
      axeExclusions
    });
  });
});

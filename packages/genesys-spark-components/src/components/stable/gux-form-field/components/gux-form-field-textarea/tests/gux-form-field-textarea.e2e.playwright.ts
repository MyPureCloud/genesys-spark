import { checkRenders, test } from '@test/playwrightTestUtils';

import { renderConfigs } from './gux-form-field-textarea.common';

const axeExclusions = [];

test.describe('gux-form-field-textarea', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs,
      element: 'gux-form-field-textarea',
      axeExclusions
    });
  });
});

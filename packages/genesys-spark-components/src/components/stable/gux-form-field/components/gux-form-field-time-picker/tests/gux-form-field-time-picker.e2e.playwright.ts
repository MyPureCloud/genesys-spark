import { checkRenders, test } from '@test/playwrightTestUtils';

import { renderConfigs } from './gux-form-field-time-picker.common';

const axeExclusions = [];

test.describe('gux-form-field-time-picker', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs,
      element: 'gux-form-field-time-picker',
      axeExclusions
    });
  });
});

import { checkRenders, test } from '@test/playwrightTestUtils';

import { renderConfigs } from './gux-form-field-color.common';

const axeExclusions = [];

test.describe('gux-form-field-color', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs,
      element: 'gux-form-field-color',
      axeExclusions
    });
  });
});

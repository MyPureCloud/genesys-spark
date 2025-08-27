import { checkRenders, test } from '@test/playwrightTestUtils';

import { renderConfigs } from './gux-form-field-time-zone-picker.common';

const axeExclusions = [
  {
    issueId: 'target-size',
    exclusionReason:
      'COMUI-2944 Fix any of the following: Target has insufficient size (20px by 18px, should be at least 24px by 24px); Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 20px instead of at least 24px.'
  }
];

test.describe('gux-form-field-time-zone-picker', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs,
      element: 'gux-form-field-time-zone-picker',
      axeExclusions
    });
  });
});

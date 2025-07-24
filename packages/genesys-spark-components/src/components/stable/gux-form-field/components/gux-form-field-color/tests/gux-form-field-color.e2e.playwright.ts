import { checkRenders, test } from '@test/playwrightTestUtils';

import { renderConfigs } from './gux-form-field-color.common';

const axeExclusions = [
  {
    issueId: 'color-contrast',
    target: '#gux-form-field-error-',
    exclusionReason:
      'COMUI-XXXX: Element has insufficient color contrast of 3.89 (foreground color: #e84e6a, background color: #2a2a2e, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1'
  }
];

test.describe('gux-form-field-color', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs,
      element: 'gux-form-field-color',
      axeExclusions
    });
  });
});

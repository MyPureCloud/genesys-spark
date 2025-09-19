import { checkRenders, test, E2EPage } from '@test/playwrightTestUtils';

import { renderConfigs } from './gux-form-field-date.common';

const axeExclusions = [];

test.describe('gux-form-field-date', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs,
      extraActions: async (page: E2EPage) => {
        const pickerButton = page.getByTestId('picker-button');

        if (
          (await pickerButton.isEnabled()) &&
          (await pickerButton.getAttribute('aria-expanded')) !== 'true'
        ) {
          pickerButton.click();
        }
      },
      axeExclusions
    });
  });
});

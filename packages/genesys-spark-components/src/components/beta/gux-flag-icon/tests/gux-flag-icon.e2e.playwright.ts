import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfig, combinedFlagsConfig } from './gux-flag-icon.common';

test.describe('gux-flag-icon', () => {
  test.describe('#render', () => {
    checkRenders([renderConfig], 'gux-flag-icon');

    checkRenders([combinedFlagsConfig], 'gux-flag-icon', undefined, false);
  });
});

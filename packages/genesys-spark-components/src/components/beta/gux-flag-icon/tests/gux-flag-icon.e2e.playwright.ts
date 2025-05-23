import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfig, combinedFlagsConfig } from './gux-flag-icon.common';

test.describe('gux-flag-icon', () => {
  test.describe('#render', () => {
    checkRenders({ renderConfigs: [renderConfig], element: 'gux-flag-icon' });

    checkRenders({
      renderConfigs: [combinedFlagsConfig],
      element: 'gux-flag-icon',
      performA11yCheck: false
    });
  });
});

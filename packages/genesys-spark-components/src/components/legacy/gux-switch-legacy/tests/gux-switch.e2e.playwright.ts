import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfig } from './gux-switch.common';

test.describe('gux-switch-legacy', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs: [renderConfig],
      element: 'gux-switch-legacy'
    });
  });
});

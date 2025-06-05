import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfig } from './gux-popover.common';

test.describe('gux-popover', () => {
  checkRenders({
    renderConfigs: [renderConfig],
    element: 'gux-popover'
  });
});

import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfig } from './gux-popover-list.common';

test.describe('gux-popover-list-beta', () => {
  checkRenders({
    renderConfigs: [renderConfig],
    element: 'gux-popover-list-beta'
  });
});

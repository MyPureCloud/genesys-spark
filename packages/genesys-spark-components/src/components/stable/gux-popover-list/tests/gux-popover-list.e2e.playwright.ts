import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfig } from './gux-popover-list.common';

test.describe('gux-popover-list', () => {
  checkRenders({
    renderConfigs: [renderConfig],
    element: 'gux-popover-list'
  });
});

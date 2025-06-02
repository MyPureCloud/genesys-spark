import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfig } from './gux-tab-list.common';

test.describe('gux-tab-list', () => {
  checkRenders({
    renderConfigs: [renderConfig],
    element: 'gux-tab-list'
  });
});

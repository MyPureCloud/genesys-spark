import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfig } from './gux-list.common';

test.describe('gux-list', () => {
  checkRenders({
    renderConfigs: [renderConfig],
    element: 'gux-list'
  });
});

import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-tab-panel.common';

test.describe('gux-tab-panel', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-tab-panel'
  });
});

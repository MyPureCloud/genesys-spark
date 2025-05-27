import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-tab.common';

test.describe('gux-tab', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-tab'
  });
});

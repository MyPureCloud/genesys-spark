import { checkRenders, E2EPage, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-truncate.common';

test.describe('gux-truncate', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-truncate',
    extraActions: async (page: E2EPage) => {
      await page.locator('gux-truncate').hover();
    }
  });
});

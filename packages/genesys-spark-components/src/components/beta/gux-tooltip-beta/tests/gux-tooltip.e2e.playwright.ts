import { checkRenders, test, E2EPage } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-tooltip.common';

test.describe('gux-tooltip-beta', () => {
  checkRenders({
    renderConfigs,
    extraActions: async (page: E2EPage) => {
      await page.locator('#element').hover();
    }
  });
});

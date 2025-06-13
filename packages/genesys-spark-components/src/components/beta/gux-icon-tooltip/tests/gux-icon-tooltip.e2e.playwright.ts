import { checkRenders, E2EPage, test } from '@test/playwrightTestUtils';
import { renderConfig } from './gux-icon-tooltip.common';

test.describe('gux-icon-tooltip-beta', () => {
  checkRenders({
    renderConfigs: [renderConfig],
    element: 'gux-icon-tooltip-beta',
    extraActions: async (page: E2EPage) => {
      await page.locator('gux-icon-tooltip-beta').hover();
    }
  });
});

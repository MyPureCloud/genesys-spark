import { checkRenders, E2EPage, test } from '@test/playwrightTestUtils';
import { renderConfig } from './gux-avatar-change-photo.common';

test.describe('gux-avatar-change-photo-beta', () => {
  checkRenders({
    renderConfigs: [renderConfig],
    element: 'gux-avatar-change-photo-beta',
    extraActions: async (page: E2EPage) => {
      await page.locator('gux-avatar-change-photo-beta').hover();
    }
  });
});

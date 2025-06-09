import { checkRenders, E2EPage, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-avatar-focusable.common';

test.describe('gux-avatar-focusable-beta', () => {
  checkRenders({
    renderConfigs: renderConfigs,
    element: 'gux-avatar-focusable-beta',
    extraActions: async (page: E2EPage) => {
      const focusableElement = page.locator('a, button');
      await focusableElement.focus();
    }
  });
});

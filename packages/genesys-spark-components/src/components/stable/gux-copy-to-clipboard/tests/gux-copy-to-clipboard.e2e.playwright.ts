import { checkRenders, E2EPage, test } from '@test/playwrightTestUtils';
import { renderConfig } from './gux-copy-to-clipboard.common';

test.describe('gux-copy-to-clipboard', () => {
  checkRenders(
    [renderConfig],
    'gux-copy-to-clipboard',
    async (page: E2EPage) => {
      await page.locator('gux-copy-to-clipboard').hover();
    }
  );
});

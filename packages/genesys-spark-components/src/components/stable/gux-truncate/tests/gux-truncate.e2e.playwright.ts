import { checkRenders, E2EPage, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-truncate.common';

test.describe('gux-truncate', () => {
  checkRenders(renderConfigs, 'gux-truncate', async (page: E2EPage) => {
    await page.locator('gux-truncate').hover();
  });
});

import { checkRenders, expect, test } from '@test/playwrightTestUtils';

import { defaultConfig, renderConfigs } from './gux-logo.common';

test.describe('gux-logo-beta', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs,
      element: 'gux-logo-beta'
    });
  });

  test.describe('#accessibility', () => {
    test('should have proper ARIA attributes', async ({ page }) => {
      await page.setContent(defaultConfig.html);
      const logo = page.locator('gux-logo-beta');
      await expect(logo).toMatchAriaSnapshot(`- img "Genesys Logo"`);
    });
  });
});

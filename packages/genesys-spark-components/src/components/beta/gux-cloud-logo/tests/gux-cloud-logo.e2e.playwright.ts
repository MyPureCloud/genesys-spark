import { checkRenders, expect, test } from '@test/playwrightTestUtils';

import { defaultConfig, renderConfigs } from './gux-cloud-logo.common';

test.describe('gux-cloud-logo-beta', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs,
      element: 'gux-cloud-logo-beta'
    });
  });

  test.describe('#accessibility', () => {
    test('should have proper ARIA attributes', async ({ page }) => {
      await page.setContent(defaultConfig.html);
      const logo = page.locator('gux-cloud-logo-beta');
      await expect(logo).toMatchAriaSnapshot(`- img "Genesys Cloud Logo"`);
    });
  });
});

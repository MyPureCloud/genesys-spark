import { checkRenders, expect, test } from '@test/playwrightTestUtils';

import { defaultConfig, renderConfigs } from './gux-cloud-logomark.common';

test.describe('gux-cloud-logomark-beta', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs,
      element: 'gux-cloud-logomark-beta'
    });
  });

  test.describe('#accessibility', () => {
    test('should have proper ARIA attributes', async ({ page }) => {
      await page.setContent(defaultConfig.html);
      const logomark = page.locator('gux-cloud-logomark-beta');
      await expect(logomark).toMatchAriaSnapshot(
        `- img "Genesys Cloud Logomark"`
      );
    });
  });
});

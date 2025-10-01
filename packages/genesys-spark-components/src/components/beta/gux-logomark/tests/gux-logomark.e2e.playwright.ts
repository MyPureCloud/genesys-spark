import { checkRenders, expect, test } from '@test/playwrightTestUtils';

import { defaultConfig, renderConfigs } from './gux-logomark.common';

test.describe('gux-logomark-beta', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs,
      element: 'gux-logomark-beta'
    });
  });

  test.describe('#accessibility', () => {
    test('should have proper ARIA attributes', async ({ page }) => {
      await page.setContent(defaultConfig.html);
      const logo = page.locator('gux-logomark-beta');
      await expect(logo).toMatchAriaSnapshot(`- img "Genesys Logomark"`);
    });
  });
});

import {
  checkRenders,
  test,
  expect,
  setContent,
  E2EPage
} from '@test/playwrightTestUtils';
import { renderConfig } from './gux-copy-to-clipboard.common';

test.describe('gux-copy-to-clipboard', () => {
  checkRenders({
    renderConfigs: [renderConfig],
    element: 'gux-copy-to-clipboard',
    extraActions: async (page: E2EPage) => {
      await page.locator('gux-copy-to-clipboard').hover();
    }
  });

  test('renders tooltip on hover', async ({ page }) => {
    await setContent(page, renderConfig.html);

    const element = page.locator('gux-copy-to-clipboard');
    const tooltip = element.locator('gux-tooltip');

    await element.hover();
    await tooltip.waitFor({ state: 'visible' });

    await expect(tooltip).toHaveText('Click to Copy');
  });
});

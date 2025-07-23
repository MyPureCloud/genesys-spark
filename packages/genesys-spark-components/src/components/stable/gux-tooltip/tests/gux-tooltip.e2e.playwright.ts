import {
  checkRenders,
  expect,
  test,
  setContent
} from '@test/playwrightTestUtils';
import { renderConfig } from './gux-tooltip.common';

test.describe('gux-tooltip', () => {
  checkRenders({ renderConfigs: [renderConfig] });

  test('Should render tooltip with correct attributes', async ({ page }) => {
    await setContent(page, renderConfig.html);

    const element = page.locator('#element');
    const tooltip = page.locator('gux-tooltip');
    await expect(tooltip).not.toHaveClass('gux-show');

    await element.hover();
    await tooltip.waitFor({ state: 'visible' });

    const tooltipId = await tooltip.getAttribute('id');
    await expect(element).toHaveAttribute('aria-describedby', tooltipId);

    await expect(tooltip).toHaveClass('gux-show');
    await expect(tooltip).toHaveAttribute('data-placement', 'bottom-start');
  });
});

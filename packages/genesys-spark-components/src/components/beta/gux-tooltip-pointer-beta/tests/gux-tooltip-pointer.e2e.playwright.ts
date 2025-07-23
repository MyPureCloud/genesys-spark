import {
  checkRenders,
  expect,
  test,
  setContent
} from '@test/playwrightTestUtils';
import { renderConfig } from './gux-tooltip-pointer.common';

test.describe('gux-tooltip-pointer-beta', () => {
  checkRenders({ renderConfigs: [renderConfig] });

  test('Should render tooltip with correct attributes', async ({ page }) => {
    await setContent(page, renderConfig.html);

    const element = page.locator('#element');
    const tooltip = page.locator('gux-tooltip-pointer-beta');
    const baseTooltip = tooltip.locator('gux-tooltip-base-beta');

    await expect(baseTooltip).not.toHaveClass('gux-show');
    await baseTooltip.waitFor({ state: 'visible' });

    const tooltipId = await tooltip.getAttribute('id');

    await expect(element).toHaveAttribute('aria-describedby', tooltipId);

    await expect(baseTooltip).toHaveClass('gux-show');
    await expect(baseTooltip).toHaveAttribute('data-placement', 'bottom-start');
  });
});

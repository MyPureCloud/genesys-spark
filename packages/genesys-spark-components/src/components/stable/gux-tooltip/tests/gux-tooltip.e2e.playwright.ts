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

  test('Should enforce tooltip uniqueness - only one tooltip visible at a time', async ({
    page
  }) => {
    // Set up HTML with multiple elements that have tooltips
    const html = `
      <div>
        <button id="button1">Button 1</button>
        <gux-tooltip for="button1">
          <div slot="content">Tooltip 1</div>
        </gux-tooltip>

        <button id="button2">Button 2</button>
        <gux-tooltip for="button2">
          <div slot="content">Tooltip 2</div>
        </gux-tooltip>

        <input id="input1" type="text" value="Input 1" />
        <gux-tooltip for="input1">
          <div slot="content">Tooltip 3</div>
        </gux-tooltip>
      </div>
    `;

    await setContent(page, html);

    const button1 = page.locator('#button1');
    const input1 = page.locator('#input1');
    const tooltip1 = page.locator('gux-tooltip[for="button1"]');
    const tooltip2 = page.locator('gux-tooltip[for="button2"]');
    const tooltip3 = page.locator('gux-tooltip[for="input1"]');

    // Initially no tooltips should be visible
    await expect(tooltip1).not.toHaveClass('gux-show');
    await expect(tooltip2).not.toHaveClass('gux-show');
    await expect(tooltip3).not.toHaveClass('gux-show');

    // Show first tooltip by hovering
    await button1.hover();
    await tooltip1.waitFor({ state: 'visible' });
    await expect(tooltip1).toHaveClass('gux-show');
    await expect(tooltip2).not.toHaveClass('gux-show');
    await expect(tooltip3).not.toHaveClass('gux-show');

    // Focus on input while first tooltip is still showing (this demonstrates the issue)
    await input1.focus();
    await tooltip3.waitFor({ state: 'visible' });

    // EXPECTED BEHAVIOR: Only one tooltip should be visible at a time
    // When input1 gets focus, tooltip1 should be hidden and only tooltip3 should be visible
    const tooltip1Visible = await tooltip1.evaluate(el =>
      el.classList.contains('gux-show')
    );
    const tooltip3Visible = await tooltip3.evaluate(el =>
      el.classList.contains('gux-show')
    );

    // Only tooltip3 should be visible (the most recently triggered one)
    expect(tooltip3Visible).toBe(true);
    expect(tooltip1Visible).toBe(false);

    // Verify that exactly one tooltip is visible
    expect(tooltip1Visible && tooltip3Visible).toBe(false);
    expect(tooltip1Visible || tooltip3Visible).toBe(true);
  });
});

import {
  checkRenders,
  setContent,
  runAxe,
  test,
  expect
} from '@test/playwrightTestUtils';

import { renderConfigs } from './gux-form-field-checkbox.common';

const axeExclusions = [
  {
    issueId: 'color-contrast',
    target: '#gux-form-field-error-',
    exclusionReason:
      'COMUI-XXXX: Element has insufficient color contrast of 3.89 (foreground color: #e84e6a, background color: #2a2a2e, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1'
  }
];

test.describe('gux-form-field-checkbox', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs,
      element: 'gux-form-field-checkbox',
      axeExclusions
    });
  });

  test('switches between states when clicked', async ({ page }) => {
    const html = `
        <gux-form-field-checkbox>
          <input slot="input" type="checkbox" name="food-1[]" value="pizza"/>
          <label slot="label">Pizza</label>
        </gux-form-field-checkbox>
      `;
    await setContent(page, html);

    const element = page.locator('gux-form-field-checkbox');
    const label = element.locator('label');
    const input = element.locator('input');

    expect((await runAxe(page)).violations).toHaveNoViolations({
      axeExclusions: [],
      axeScanContext: 'Before checking checkbox'
    });

    await label.click();
    await page.waitForChanges();
    await expect(input).toHaveJSProperty('checked', true);

    expect((await runAxe(page)).violations).toHaveNoViolations({
      axeExclusions: [],
      axeScanContext: 'After checking checkbox'
    });

    await label.click();
    await page.waitForChanges();
    await expect(input).toHaveJSProperty('checked', false);

    await label.click();
    await page.waitForChanges();
    await expect(input).toHaveJSProperty('checked', true);
  });
});

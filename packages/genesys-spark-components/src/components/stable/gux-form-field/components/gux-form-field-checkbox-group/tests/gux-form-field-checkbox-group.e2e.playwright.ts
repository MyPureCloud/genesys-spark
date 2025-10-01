import {
  checkRenders,
  setContent,
  runAxe,
  test,
  expect
} from '@test/playwrightTestUtils';

import { renderConfigs } from './gux-form-field-checkbox-group.common';

const axeExclusions = [
  {
    issueId: 'color-contrast',
    target: 'label[slot="group-label"]',
    exclusionReason:
      'COMUI-XXXX: Inactive user interface components do not need to meet contrast minimum but they need to be marked as such'
  }
];

test.describe('gux-form-field-checkbox-group', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs,
      element: 'gux-form-field-checkbox-group',
      axeExclusions
    });
  });

  test('switches between states when clicked', async ({ page }) => {
    const html = `
      <gux-form-field-checkbox-group-beta>
        <label slot="label">Food</label>
        <gux-form-field-checkbox id="pizza">
          <input slot="input" type="checkbox" name="food-1" value="pizza"/>
          <label slot="label">Pizza</label>
        </gux-form-field-checkbox>
        <gux-form-field-checkbox id="pasta">
          <input slot="input" type="checkbox" name="food-1" value="pasta"/>
          <label slot="label">Pasta</label>
        </gux-form-field-checkbox>
      </gux-form-field-checkbox-group-beta>
    `;
    await setContent(page, html);

    const pizzaElement = page.locator('#pizza');
    const pizzaLabel = pizzaElement.locator('label');
    const pizzaInput = pizzaElement.locator('input');

    const pastaElement = page.locator('#pasta');
    const pastaLabel = pastaElement.locator('label');
    const pastaInput = pastaElement.locator('input');

    expect((await runAxe(page)).violations).toHaveNoViolations({
      axeExclusions: [],
      axeScanContext: 'Before checking checkbox'
    });

    await pizzaLabel.click();
    await page.waitForChanges();

    await expect(pizzaInput).toHaveJSProperty('checked', true);
    await expect(pastaInput).toHaveJSProperty('checked', false);

    expect((await runAxe(page)).violations).toHaveNoViolations({
      axeExclusions: [],
      axeScanContext: 'After checking checkbox'
    });

    await pastaLabel.click();
    await page.waitForChanges();

    await expect(pizzaInput).toHaveJSProperty('checked', true);
    await expect(pastaInput).toHaveJSProperty('checked', true);
  });

  test('disables the slotted form field checkbox inputs', async ({ page }) => {
    const html = `
      <gux-form-field-checkbox-group-beta disabled>
        <label slot="label">Food</label>
        <gux-form-field-checkbox id="pizza">
          <input slot="input" type="checkbox" name="food-1" value="pizza"/>
          <label slot="label">Pizza</label>
        </gux-form-field-checkbox>
        <gux-form-field-checkbox id="pasta">
          <input slot="input" type="checkbox" name="food-1" value="pasta"/>
          <label slot="label">Pasta</label>
        </gux-form-field-checkbox>
      </gux-form-field-checkbox-group-beta>
    `;
    await setContent(page, html);

    await expect(page.locator('#pizza').locator('input')).toBeDisabled();
    await expect(page.locator('#pasta').locator('input')).toBeDisabled();
  });
});

import { checkRenders, test, expect } from '@test/playwrightTestUtils';

import { renderConfigs } from './gux-form-field-radio-group.common';

test.describe('gux-form-field-radio-group-beta', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs,
      element: 'gux-form-field-radio-group-beta'
    });
  });

  test('switches between states when clicked', async ({ page }) => {
    await page.setContent(`
      <gux-form-field-radio-group-beta>
        <label slot="group-label">Food</label>
        <gux-form-field-radio id="pizza">
          <input slot="input" type="radio" name="food-1" value="pizza"/>
          <label slot="label">Pizza</label>
        </gux-form-field-radio>
        <gux-form-field-radio id="pasta">
          <input slot="input" type="radio" name="food-1" value="pasta"/>
          <label slot="label">Pasta</label>
        </gux-form-field-radio>
      </gux-form-field-radio-group-beta>
    `);

    const pizzaLabel = page.locator('#pizza label');
    const pizzaInput = page.locator('#pizza input');
    const pastaLabel = page.locator('#pasta label');
    const pastaInput = page.locator('#pasta input');

    await pizzaLabel.click();
    await expect(pizzaInput).toBeChecked();
    await expect(pastaInput).not.toBeChecked();

    await pastaLabel.click();
    await expect(pizzaInput).not.toBeChecked();
    await expect(pastaInput).toBeChecked();

    await pizzaLabel.click();
    await expect(pizzaInput).toBeChecked();
    await expect(pastaInput).not.toBeChecked();
  });

  test('disables the slotted form field radio inputs', async ({ page }) => {
    await page.setContent(`
      <gux-form-field-radio-group-beta disabled>
        <label slot="group-label">Food</label>
        <gux-form-field-radio id="pizza">
          <input slot="input" type="radio" name="food-1" value="pizza"/>
          <label slot="label">Pizza</label>
        </gux-form-field-radio>
        <gux-form-field-radio id="pasta">
          <input slot="input" type="radio" name="food-1" value="pasta"/>
          <label slot="label">Pasta</label>
        </gux-form-field-radio>
      </gux-form-field-radio-group-beta>
    `);

    const pizzaInput = page.locator('#pizza input');
    const pastaInput = page.locator('#pasta input');

    await expect(pizzaInput).toBeDisabled();
    await expect(pastaInput).toBeDisabled();
  });
});

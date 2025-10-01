import {
  checkRenders,
  expect,
  setContent,
  test
} from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-phone-input.common';

test.describe('gux-phone-input-beta', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-phone-input-beta'
  });

  // eslint-disable-next-line playwright/no-skipped-test
  test.skip('open country dropdown and select option with value not starting with +', async ({
    page
  }) => {
    await setContent(page, '<gux-phone-input-beta></gux-phone-input-beta>');

    const component = page.locator('gux-phone-input-beta');
    const inputField = component.locator('#tel-input');
    const dropdownButton = component.locator('.gux-field-button');
    const flag = component.locator('.gux-selected-option gux-flag-icon-beta');

    await inputField.press('1');
    await dropdownButton.press('Enter');

    await expect(dropdownButton).toHaveAttribute('aria-expanded', 'true');

    // First arrow down focuses the currently selected option
    await page.keyboard.press('ArrowDown');
    // Second arrow down to move the selection down one
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(dropdownButton).toHaveAttribute('aria-expanded', 'false');
    await expect(flag).toHaveAttribute('screenreader-text', 'Afghanistan');
    await expect(inputField).toHaveValue('1');
  });

  // eslint-disable-next-line playwright/no-skipped-test
  test.skip('open country dropdown and select option with value starting with +', async ({
    page
  }) => {
    await setContent(page, '<gux-phone-input-beta></gux-phone-input-beta>');

    const component = page.locator('gux-phone-input-beta');
    const inputField = component.locator('#tel-input');
    const dropdownButton = component.locator('.gux-field-button');
    const flag = component.locator('.gux-selected-option gux-flag-icon-beta');

    await inputField.fill('+1');
    await dropdownButton.press('Enter');

    await expect(dropdownButton).toHaveAttribute('aria-expanded', 'true');

    // First arrow down focuses the currently selected option
    await page.keyboard.press('ArrowDown');
    // Second arrow down to move the selection down one
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await expect(dropdownButton).toHaveAttribute('aria-expanded', 'false');
    await expect(flag).toHaveAttribute('screenreader-text', 'Andorra');
    await expect(inputField).toHaveValue('+376');
  });

  test('region is set when initialized with value', async ({ page }) => {
    await setContent(
      page,
      '<gux-phone-input-beta value="+13175971660"></gux-phone-input-beta>'
    );

    const component = page.locator('gux-phone-input-beta');
    const flag = component.locator('.gux-selected-option gux-flag-icon-beta');

    await expect(flag).toHaveAttribute('screenreader-text', 'United States');
  });

  test('region is set when typing in country code', async ({ page }) => {
    await setContent(page, '<gux-phone-input-beta></gux-phone-input-beta>');

    const component = page.locator('gux-phone-input-beta');
    const inputField = component.locator('#tel-input');

    await inputField.fill('+41');

    const selected = page.locator('.gux-selected');

    await expect(selected).toHaveText('Switzerland (+41)');
  });
});

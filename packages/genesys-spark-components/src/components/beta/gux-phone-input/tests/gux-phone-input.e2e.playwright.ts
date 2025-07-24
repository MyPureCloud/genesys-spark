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

  test('open country dropdown and select option with value not starting with +', async ({
    page
  }) => {
    await setContent(page, '<gux-phone-input-beta></gux-phone-input-beta>');

    const dropdownButton = page.locator('.gux-field-button');
    const inputField = page.locator('#tel-input');
    const component = page.locator('gux-phone-input-beta');
    await inputField.press('1');

    await dropdownButton.press('Enter');
    await expect(dropdownButton).toHaveAttribute('aria-expanded', 'true');

    // First arrow down focuses the currently selected option
    await page.keyboard.press('ArrowDown');
    // Second arrow down to move the selection down one
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    const region = await component.evaluate(
      (el: HTMLGuxPhoneInputBetaElement) => el.getRegion()
    );

    expect(region.alpha2Code).toBe('AF');
    const value = await component.evaluate(
      (el: HTMLGuxPhoneInputBetaElement) => el.value
    );
    expect(value).toBe('1');
    await expect(dropdownButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('open country dropdown and select option with value starting with +', async ({
    page
  }) => {
    await setContent(page, '<gux-phone-input-beta></gux-phone-input-beta>');

    const dropdownButton = page.locator('.gux-field-button');
    const inputField = page.locator('#tel-input');
    const component = page.locator('gux-phone-input-beta');

    await inputField.fill('+1');

    await dropdownButton.press('Enter');
    await expect(dropdownButton).toHaveAttribute('aria-expanded', 'true');

    // First arrow down focuses the currently selected option
    await page.keyboard.press('ArrowDown');
    // Second arrow down to move the selection down one
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    const region = await component.evaluate(
      (el: HTMLGuxPhoneInputBetaElement) => el.getRegion()
    );

    expect(region.alpha2Code).toBe('AD');
    const value = await component.evaluate(
      (el: HTMLGuxPhoneInputBetaElement) => el.value
    );
    expect(value).toBe('+376');
    await expect(dropdownButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('region is set when initialized with value', async ({ page }) => {
    await setContent(
      page,
      '<gux-phone-input-beta value="+13175971660"></gux-phone-input-beta>'
    );

    const dropdownButtonIcon = page.locator(
      '.gux-field-button gux-flag-icon-beta'
    );
    const component = page.locator('gux-phone-input-beta');

    const region = await component.evaluate(
      (el: HTMLGuxPhoneInputBetaElement) => el.getRegion()
    );

    expect(region.alpha2Code).toBe('US');
    await expect(dropdownButtonIcon).toHaveAttribute(
      'screenreader-text',
      'United States'
    );
  });

  test('region is set when typing in country code', async ({ page }) => {
    await setContent(page, '<gux-phone-input-beta></gux-phone-input-beta>');

    const dropdownButton = page.locator('.gux-field-button');
    const inputField = page.locator('#tel-input');

    await inputField.fill('+41');

    await dropdownButton.click();

    const selected = page.locator('.gux-selected');

    await expect(selected).toHaveText('Switzerland (+41)');
  });
});

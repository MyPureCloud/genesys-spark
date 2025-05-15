import {
  analyze,
  checkRenders,
  expect,
  setContent,
  test
} from '@test/playwrightTestUtils';
import { renderConfig } from './gux-advanced-dropdown.common';

test.describe('gux-advanced-dropdown-legacy', () => {
  test.describe('#render', () => {
    checkRenders([renderConfig], 'gux-advanced-dropdown-legacy');
  });

  test.describe('#interactions', () => {
    test('should open the dropdown on click', async ({ page }) => {
      await setContent(page, renderConfig.html);

      await expect(page.locator('[slot="popup"]')).not.toBeVisible();

      await page.locator('gux-advanced-dropdown-legacy').click();

      await expect(page.locator('[slot="popup"]')).toBeVisible();

      await analyze(page);
    });

    test('should select an option and close the dropdown menu when an option is clicked', async ({
      page
    }) => {
      await setContent(page, renderConfig.html);
      const inputSpy = await page.spyOnEvent('input');

      await expect(page.locator('[slot="popup"]')).not.toBeVisible();

      await page.locator('gux-advanced-dropdown-legacy').click();

      await expect(page.locator('[slot="popup"]')).toBeVisible();

      page.locator('gux-dropdown-option[value="en"]').click();
      await page.waitForChanges();

      expect(inputSpy).toHaveReceivedEventDetail('en');

      await expect(page.locator('[slot="popup"]')).not.toBeVisible();
    });

    test('should fire filter event with a delay', async ({ page }) => {
      await setContent(page, renderConfig.html);

      const filterSpy = await page.spyOnEvent('filter');

      await expect(page.locator('[slot="popup"]')).not.toBeVisible();

      await page.locator('gux-advanced-dropdown-legacy').click();

      await expect(page.locator('[slot="popup"]')).toBeVisible();

      const input = page.locator('input[type=search]');

      await input.fill('en');
      await page.waitForChanges();

      await page.waitForTimeout(1000);

      expect(filterSpy).toHaveReceivedEventDetail('en');

      const options = page
        .locator('gux-dropdown-option')
        .filter({ visible: true });

      await expect(options).toHaveCount(1);
    });

    test('should not filter if no-filter is true', async ({ page }) => {
      await setContent(
        page,
        `
        <gux-advanced-dropdown-legacy lang="en" filter-debounce-timeout="0" no-filter>
          <gux-dropdown-option value="en" text="English"></gux-dropdown-option>
          <gux-dropdown-option value="nl" text="Dutch"></gux-dropdown-option>
        </gux-advanced-dropdown-legacy>
      `
      );

      const filterSpy = await page.spyOnEvent('filter');

      await expect(page.locator('[slot="popup"]')).not.toBeVisible();

      await page.locator('gux-advanced-dropdown-legacy').click();

      await expect(page.locator('[slot="popup"]')).toBeVisible();

      const input = page.locator('input[type=search]');

      await input.fill('en');
      await page.waitForChanges();

      await page.waitForTimeout(1000);

      expect(filterSpy).toHaveReceivedEventDetail('en');

      const options = page
        .locator('gux-dropdown-option')
        .filter({ visible: true });

      await expect(options).toHaveCount(2);
    });

    test('should allow options to be dynamically rendered', async ({
      page
    }) => {
      await setContent(page, renderConfig.html);

      await page.evaluate(() => {
        const guxAdvancedDropdown = document.querySelector(
          'gux-advanced-dropdown-legacy'
        );
        const guxDropdownOption = guxAdvancedDropdown
          .querySelector('gux-dropdown-option')
          .cloneNode();

        guxAdvancedDropdown.appendChild(guxDropdownOption);
      });
      await page.waitForChanges();

      await page.locator('gux-advanced-dropdown-legacy').click();

      await expect(page.locator('[slot="popup"]')).toBeVisible();

      const options = page
        .locator('gux-dropdown-option')
        .filter({ visible: true });

      await expect(options).toHaveCount(3);
    });

    test('should not fire filter event as dropdown is closing', async ({
      page
    }) => {
      await setContent(page, renderConfig.html);

      const filterSpy = await page.spyOnEvent('filter');

      await expect(page.locator('[slot="popup"]')).not.toBeVisible();

      await page.locator('gux-advanced-dropdown-legacy').click();

      await expect(page.locator('[slot="popup"]')).toBeVisible();

      page.locator('gux-dropdown-option[value=en]').click();

      await page.waitForChanges();

      await expect(page.locator('[slot="popup"]')).not.toBeVisible();

      expect(filterSpy).not.toHaveReceivedEvent();
    });

    test('should not select an option or close the dropdown menu when a selected option is clicked', async ({
      page
    }) => {
      await setContent(page, renderConfig.html);

      await expect(page.locator('[slot="popup"]')).not.toBeVisible();

      await page.locator('gux-advanced-dropdown-legacy').click();

      await expect(page.locator('[slot="popup"]')).toBeVisible();

      page.locator('gux-dropdown-option[value=en]').click();

      await page.waitForChanges();

      await expect(page.locator('[slot="popup"]')).not.toBeVisible();

      const inputSpy = await page.spyOnEvent('input');

      await page.locator('gux-advanced-dropdown-legacy').click();

      await expect(page.locator('[slot="popup"]')).toBeVisible();

      page.locator('gux-dropdown-option[value=en]').click();
      await page.waitForChanges();

      await expect(page.locator('[slot="popup"]')).not.toBeVisible();

      expect(inputSpy).not.toHaveReceivedEvent();
    });
  });
});

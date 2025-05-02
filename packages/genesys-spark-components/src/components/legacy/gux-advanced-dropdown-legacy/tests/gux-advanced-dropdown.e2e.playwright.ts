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

    // test('should select an option and closes the dropdown menu when an option is clicked', async ({ page }) => {
    //   await setContent(page, renderConfig.html);

    //   const element = await page.find('gux-advanced-dropdown-legacy');
    //   const inputSpy = await element.spyOnEvent('input');
    //   const dropdownElement = await element.find('pierce/.gux-popup-container');

    //   expect(dropdownElement.classList.contains('gux-expanded')).toBe(false);

    //   await element.click();
    //   await page.waitForChanges();

    //   expect(dropdownElement.classList.contains('gux-expanded')).toBe(true);

    //   const englishDropdownOption = await element.find(
    //     'gux-dropdown-option[value="en"]'
    //   );
    //   await englishDropdownOption.click();
    //   await page.waitForChanges();

    //   expect(inputSpy).toHaveReceivedEventDetail('en');
    //   expect(dropdownElement.classList.contains('gux-expanded')).toBe(false);
    // });

    // test('should fire filter event with a delay', async ({ page }) => {
    //   await setContent(page, renderConfig.html);

    //   const element = await page.find('gux-advanced-dropdown-legacy');
    //   const filterSpy = await element.spyOnEvent('filter');
    //   const dropdownElement = await element.find('pierce/.gux-popup-container');

    //   expect(dropdownElement.classList.contains('gux-expanded')).toBe(false);

    //   await element.click();
    //   await page.waitForChanges();

    //   expect(dropdownElement.classList.contains('gux-expanded')).toBe(true);

    //   const input = await element.find('pierce/input');

    //   await input.press('KeyE');
    //   await input.press('KeyN');
    //   await page.waitForChanges();

    //   const value = await input.getProperty('value');
    //   expect(value).toBe('en');

    //   await page.waitForTimeout(1000);

    //   expect(filterSpy).toHaveReceivedEventDetail('en');

    //   const options = await element.findAll('gux-dropdown-option');
    //   const filteredOptions = await asyncFilter(
    //     options,
    //     async option => !(await option.getProperty('filtered'))
    //   );

    //   expect(filteredOptions.length).toBe(1);
    // });

    // test('should not filter if no-filter is true', async ({ page }) => {
    //   const page = await newSparkE2EPage({
    //     html: `
    //     <gux-advanced-dropdown-legacy lang="en" filter-debounce-timeout="0" no-filter>
    //       <gux-dropdown-option value="en" text="English"></gux-dropdown-option>
    //       <gux-dropdown-option value="nl" text="Dutch"></gux-dropdown-option>
    //     </gux-advanced-dropdown-legacy>
    //   `
    //   });
    //   const element = await page.find('gux-advanced-dropdown-legacy');
    //   const filterSpy = await element.spyOnEvent('filter');
    //   const dropdownElement = await element.find('pierce/.gux-popup-container');

    //   expect(dropdownElement.classList.contains('gux-expanded')).toBe(false);

    //   await element.click();
    //   await page.waitForChanges();

    //   expect(dropdownElement.classList.contains('gux-expanded')).toBe(true);

    //   const input = await element.find('pierce/input');

    //   await input.press('KeyE');
    //   await input.press('KeyN');
    //   await page.waitForChanges();

    //   const value = await input.getProperty('value');
    //   expect(value).toBe('en');

    //   await page.waitForTimeout(1000);

    //   expect(filterSpy).toHaveReceivedEventDetail('en');

    //   const options = await element.findAll('gux-dropdown-option');
    //   const filteredOptions = await asyncFilter(
    //     options,
    //     async option => !(await option.getProperty('filtered'))
    //   );

    //   expect(filteredOptions.length).toBe(2);
    // });

    // test('should allow options to be dynamically rendered', async ({ page }) => {
    //   await setContent(page, renderConfig.html);

    //   const element = await page.find('gux-advanced-dropdown-legacy');

    //   await page.evaluate(() => {
    //     const guxAdvancedDropdown = document.querySelector(
    //       'gux-advanced-dropdown-legacy'
    //     );
    //     const guxDropdownOption = document.querySelector('gux-dropdown-option');

    //     guxAdvancedDropdown.removeChild(guxDropdownOption);
    //     guxAdvancedDropdown.appendChild(guxDropdownOption);
    //   });
    //   await page.waitForChanges();

    //   const options = await element.findAll('gux-dropdown-option');
    //   const filteredOptions = await asyncFilter(
    //     options,
    //     async option => !(await option.getProperty('filtered'))
    //   );

    //   expect(filteredOptions.length).toBe(2);
    // });

    // test('should not fire filter event as dropdown is closing', async ({ page }) => {
    //   const page = await newSparkE2EPage({
    //     html: `
    //     <gux-advanced-dropdown-legacy lang="en">
    //       <gux-dropdown-option value="en" text="English"></gux-dropdown-option>
    //       <gux-dropdown-option value="nl" text="Dutch"></gux-dropdown-option>
    //     </gux-advanced-dropdown-legacy>
    //   `
    //   });
    //   const element = await page.find('gux-advanced-dropdown-legacy');
    //   const filterSpy = await element.spyOnEvent('filter');
    //   const dropdownElement = await element.find('pierce/.gux-popup-container');

    //   expect(dropdownElement.classList.contains('gux-expanded')).toBe(false);

    //   await element.click();
    //   await page.waitForChanges();

    //   expect(dropdownElement.classList.contains('gux-expanded')).toBe(true);

    //   const englishDropdownOption = await element.find(
    //     'gux-dropdown-option[value="en"]'
    //   );
    //   await englishDropdownOption.click();
    //   await page.waitForChanges();

    //   expect(dropdownElement.classList.contains('gux-expanded')).toBe(false);

    //   expect(filterSpy).not.toHaveReceivedEvent();
    // });

    // test('should not select an option or close the dropdown menu when a selected option is clicked', async ({ page }) => {
    //   await setContent(page, renderConfig.html);

    //   const element = await page.find('gux-advanced-dropdown-legacy');

    //   const dropdownElement = await element.find('pierce/.gux-popup-container');
    //   const englishDropdownOption = await element.find(
    //     'gux-dropdown-option[value="en"]'
    //   );

    //   expect(dropdownElement.classList.contains('gux-expanded')).toBe(false);

    //   await element.click();
    //   await page.waitForChanges();

    //   expect(dropdownElement.classList.contains('gux-expanded')).toBe(true);

    //   await englishDropdownOption.click();
    //   await page.waitForChanges();

    //   expect(dropdownElement.classList.contains('gux-expanded')).toBe(false);

    //   const inputSpy = await element.spyOnEvent('input');

    //   await element.click();
    //   await page.waitForChanges();

    //   expect(dropdownElement.classList.contains('gux-expanded')).toBe(true);

    //   await englishDropdownOption.click();
    //   await page.waitForChanges();

    //   expect(inputSpy).not.toHaveReceivedEvent();
    //   expect(dropdownElement.classList.contains('gux-expanded')).toBe(false);
    // });
  });
});

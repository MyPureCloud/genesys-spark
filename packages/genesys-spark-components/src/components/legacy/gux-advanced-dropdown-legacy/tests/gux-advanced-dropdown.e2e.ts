import {
  a11yCheck,
  newSparkE2EPage,
  waitForTimeout
} from '../../../../test/e2eTestUtils';

import { asyncFilter } from '@utils/array/async-filter';
const html = `
  <div lang="en">
    <gux-advanced-dropdown-legacy lang="en" filter-debounce-timeout=0>
      <gux-dropdown-option value="en" text="English"></gux-dropdown-option>
      <gux-dropdown-option value="nl" text="Dutch"></gux-dropdown-option>
    </gux-advanced-dropdown-legacy>
  </div>
`;
describe('gux-advanced-dropdown-legacy', () => {
  it('should render', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-advanced-dropdown-legacy');
    await a11yCheck(page);
    expect(element).toHaveAttribute('hydrated');
  });

  it('should open the dropdown on click', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-advanced-dropdown-legacy');
    const dropdownElement = await element.find('pierce/.gux-popup-container');

    expect(dropdownElement.classList.contains('gux-expanded')).toBe(false);

    await element.click();
    await page.waitForChanges();
    await a11yCheck(page);

    expect(dropdownElement.classList.contains('gux-expanded')).toBe(true);
  });

  it('should select an option and closes the dropdown menu when an option is clicked', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-advanced-dropdown-legacy');
    const inputSpy = await element.spyOnEvent('input');
    const dropdownElement = await element.find('pierce/.gux-popup-container');

    expect(dropdownElement.classList.contains('gux-expanded')).toBe(false);

    await element.click();
    await page.waitForChanges();

    expect(dropdownElement.classList.contains('gux-expanded')).toBe(true);

    const englishDropdownOption = await element.find(
      'gux-dropdown-option[value="en"]'
    );
    await englishDropdownOption.click();
    await page.waitForChanges();

    expect(inputSpy).toHaveReceivedEventDetail('en');
    expect(dropdownElement.classList.contains('gux-expanded')).toBe(false);
  });

  it('should fire filter event with a delay', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-advanced-dropdown-legacy');
    const filterSpy = await element.spyOnEvent('filter');
    const dropdownElement = await element.find('pierce/.gux-popup-container');

    expect(dropdownElement.classList.contains('gux-expanded')).toBe(false);

    await element.click();
    await page.waitForChanges();

    expect(dropdownElement.classList.contains('gux-expanded')).toBe(true);

    const input = await element.find('pierce/input');

    await input.press('KeyE');
    await input.press('KeyN');
    await page.waitForChanges();

    const value = await input.getProperty('value');
    expect(value).toBe('en');

    await waitForTimeout(1000);

    expect(filterSpy).toHaveReceivedEventDetail('en');

    const options = await element.findAll('gux-dropdown-option');
    const filteredOptions = await asyncFilter(
      options,
      async option => !(await option.getProperty('filtered'))
    );

    expect(filteredOptions.length).toBe(1);
  });

  it('should not filter if no-filter is true', async () => {
    const page = await newSparkE2EPage({
      html: `
      <gux-advanced-dropdown-legacy lang="en" filter-debounce-timeout="0" no-filter>
        <gux-dropdown-option value="en" text="English"></gux-dropdown-option>
        <gux-dropdown-option value="nl" text="Dutch"></gux-dropdown-option>
      </gux-advanced-dropdown-legacy>
    `
    });
    const element = await page.find('gux-advanced-dropdown-legacy');
    const filterSpy = await element.spyOnEvent('filter');
    const dropdownElement = await element.find('pierce/.gux-popup-container');

    expect(dropdownElement.classList.contains('gux-expanded')).toBe(false);

    await element.click();
    await page.waitForChanges();

    expect(dropdownElement.classList.contains('gux-expanded')).toBe(true);

    const input = await element.find('pierce/input');

    await input.press('KeyE');
    await input.press('KeyN');
    await page.waitForChanges();

    const value = await input.getProperty('value');
    expect(value).toBe('en');

    await waitForTimeout(1000);

    expect(filterSpy).toHaveReceivedEventDetail('en');

    const options = await element.findAll('gux-dropdown-option');
    const filteredOptions = await asyncFilter(
      options,
      async option => !(await option.getProperty('filtered'))
    );

    expect(filteredOptions.length).toBe(2);
  });

  it('should allow options to be dynamically rendered', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-advanced-dropdown-legacy');

    await page.evaluate(() => {
      const guxAdvancedDropdown = document.querySelector(
        'gux-advanced-dropdown-legacy'
      );
      const guxDropdownOption = document.querySelector('gux-dropdown-option');

      guxAdvancedDropdown.removeChild(guxDropdownOption);
      guxAdvancedDropdown.appendChild(guxDropdownOption);
    });
    await page.waitForChanges();

    const options = await element.findAll('gux-dropdown-option');
    const filteredOptions = await asyncFilter(
      options,
      async option => !(await option.getProperty('filtered'))
    );

    expect(filteredOptions.length).toBe(2);
  });

  it('should not fire filter event as dropdown is closing', async () => {
    const page = await newSparkE2EPage({
      html: `
      <gux-advanced-dropdown-legacy lang="en">
        <gux-dropdown-option value="en" text="English"></gux-dropdown-option>
        <gux-dropdown-option value="nl" text="Dutch"></gux-dropdown-option>
      </gux-advanced-dropdown-legacy>
    `
    });
    const element = await page.find('gux-advanced-dropdown-legacy');
    const filterSpy = await element.spyOnEvent('filter');
    const dropdownElement = await element.find('pierce/.gux-popup-container');

    expect(dropdownElement.classList.contains('gux-expanded')).toBe(false);

    await element.click();
    await page.waitForChanges();

    expect(dropdownElement.classList.contains('gux-expanded')).toBe(true);

    const englishDropdownOption = await element.find(
      'gux-dropdown-option[value="en"]'
    );
    await englishDropdownOption.click();
    await page.waitForChanges();

    expect(dropdownElement.classList.contains('gux-expanded')).toBe(false);

    expect(filterSpy).not.toHaveReceivedEvent();
  });

  it('should not select an option or close the dropdown menu when a selected option is clicked', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-advanced-dropdown-legacy');

    const dropdownElement = await element.find('pierce/.gux-popup-container');
    const englishDropdownOption = await element.find(
      'gux-dropdown-option[value="en"]'
    );

    expect(dropdownElement.classList.contains('gux-expanded')).toBe(false);

    await element.click();
    await page.waitForChanges();

    expect(dropdownElement.classList.contains('gux-expanded')).toBe(true);

    await englishDropdownOption.click();
    await page.waitForChanges();

    expect(dropdownElement.classList.contains('gux-expanded')).toBe(false);

    const inputSpy = await element.spyOnEvent('input');

    await element.click();
    await page.waitForChanges();

    expect(dropdownElement.classList.contains('gux-expanded')).toBe(true);

    await englishDropdownOption.click();
    await page.waitForChanges();

    expect(inputSpy).not.toHaveReceivedEvent();
    expect(dropdownElement.classList.contains('gux-expanded')).toBe(false);
  });
});

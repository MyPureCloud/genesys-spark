import { newE2EPage } from '@stencil/core/testing';

import { asyncFilter } from '../../../../utils/array/async-filter';
const html = `
  <div lang="en">
    <gux-advanced-dropdown lang="en" filter-debounce-timeout=0>
      <gux-dropdown-option value="en" text="English"></gux-dropdown-option>
      <gux-dropdown-option value="nl" text="Dutch"></gux-dropdown-option>
    </gux-advanced-dropdown>
  </div>
`;
describe('gux-advanced-dropdown', () => {
  it('should render', async () => {
    const page = await newE2EPage({ html });
    const element = await page.find('gux-advanced-dropdown');

    expect(element).toHaveClass('hydrated');
  });

  it('should open the dropdown on click', async () => {
    const page = await newE2EPage({ html });
    const element = await page.find('gux-advanced-dropdown');
    const dropdownElement = await page.find(
      'gux-advanced-dropdown >>> .gux-dropdown'
    );

    expect(dropdownElement.classList.contains('gux-active')).toBe(false);

    element.click();
    await page.waitForChanges();

    expect(dropdownElement.classList.contains('gux-active')).toBe(true);
  });

  it('should select an option and closes the dropdown menu when an option is clicked', async () => {
    const page = await newE2EPage({ html });
    const element = await page.find('gux-advanced-dropdown');
    const inputSpy = await element.spyOnEvent('input');
    const dropdownElement = await page.find(
      'gux-advanced-dropdown >>> .gux-dropdown'
    );

    expect(dropdownElement.classList.contains('gux-active')).toBe(false);

    element.click();
    await page.waitForChanges();

    expect(dropdownElement.classList.contains('gux-active')).toBe(true);

    const englishDropdownOption = await element.find(
      'gux-dropdown-option[value="en"]'
    );
    englishDropdownOption.click();
    await page.waitForChanges();

    expect(inputSpy).toHaveReceivedEventDetail('en');
    expect(dropdownElement.classList.contains('gux-active')).toBe(false);
  });

  it('should fire filter event with a delay', async () => {
    const page = await newE2EPage({ html });
    const element = await page.find('gux-advanced-dropdown');
    const filterSpy = await element.spyOnEvent('filter');
    const dropdownElement = await page.find(
      'gux-advanced-dropdown >>> .gux-dropdown'
    );

    expect(dropdownElement.classList.contains('gux-active')).toBe(false);

    element.click();
    await page.waitForChanges();

    expect(dropdownElement.classList.contains('gux-active')).toBe(true);

    const input = await page.find('gux-advanced-dropdown >>> input');

    await input.press('KeyE');
    await input.press('KeyN');
    await page.waitForChanges();

    const value = await input.getProperty('value');
    expect(value).toBe('en');

    await page.waitFor(1000);

    expect(filterSpy).toHaveReceivedEventDetail('en');

    const options = await element.findAll('gux-dropdown-option');
    const filteredOptions = await asyncFilter(
      options,
      async option => !(await option.getProperty('filtered'))
    );

    expect(filteredOptions.length).toBe(1);
  });

  it('should not filter if no-filter is true', async () => {
    const page = await newE2EPage({
      html: `
      <gux-advanced-dropdown lang="en" filter-debounce-timeout="0" no-filter>
        <gux-dropdown-option value="en" text="English"></gux-dropdown-option>
        <gux-dropdown-option value="nl" text="Dutch"></gux-dropdown-option>
      </gux-advanced-dropdown>
    `
    });
    const element = await page.find('gux-advanced-dropdown');
    const filterSpy = await element.spyOnEvent('filter');
    const dropdownElement = await page.find(
      'gux-advanced-dropdown >>> .gux-dropdown'
    );

    expect(dropdownElement.classList.contains('gux-active')).toBe(false);

    element.click();
    await page.waitForChanges();

    expect(dropdownElement.classList.contains('gux-active')).toBe(true);

    const input = await page.find('gux-advanced-dropdown >>> input');

    await input.press('KeyE');
    await input.press('KeyN');
    await page.waitForChanges();

    const value = await input.getProperty('value');
    expect(value).toBe('en');

    await page.waitFor(1000);

    expect(filterSpy).toHaveReceivedEventDetail('en');

    const options = await element.findAll('gux-dropdown-option');
    const filteredOptions = await asyncFilter(
      options,
      async option => !(await option.getProperty('filtered'))
    );

    expect(filteredOptions.length).toBe(2);
  });

  it('should allow options to be dynamically rendered', async () => {
    const page = await newE2EPage({ html });
    const element = await page.find('gux-advanced-dropdown');

    await page.evaluate(() => {
      const guxAdvancedDropdown = document.querySelector(
        'gux-advanced-dropdown'
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
});

import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

describe('gux-time-picker-beta', () => {
  it('renders', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-time-picker-beta></gux-time-picker-beta>`
    });
    const element = await page.find('gux-time-picker-beta');

    expect(element).toHaveClass('hydrated');
  });

  it('Active class on focus', async () => {
    // Setup
    const page = await newSparkE2EPage({
      html: `<gux-time-picker-beta></gux-time-picker-beta>`
    });

    // Run
    await page.focus('input');
    await page.waitForChanges();

    // Validate
    const input = await page.find('gux-time-picker-beta input');
    const focusedElement = await page.find(':focus');
    expect(focusedElement).toBe(input);
  });

  it('Type a valid value', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-time-picker-beta></gux-time-picker-beta>`
    });
    await a11yCheck(page, [], 'dropdown closed');

    // Focus in
    const input = await page.find('gux-time-picker-beta input');
    await input.focus();
    let focusedElement = await page.find(':focus');
    expect(focusedElement.outerHTML).toBe(input.outerHTML);

    // Type
    await input.type('00:55:00');
    let list = await page.find('gux-time-picker-beta gux-list');
    await a11yCheck(page, [], 'dropdown opened');
    focusedElement = await page.find(':focus');
    expect(focusedElement.outerHTML).toBe(input.outerHTML);

    expect(list).not.toBeNull();

    // Keep focus on input
    await input.press('Enter');
    const timePicker = await page.find('gux-time-picker-beta');
    list = await page.find('gux-time-picker-beta gux-list');
    focusedElement = await page.find(':focus');
    expect(focusedElement.outerHTML).toBe(input.outerHTML);
    expect(list).toBeNull();
    expect(await timePicker.getProperty('value')).toEqual('00:55:00');
  });

  it('Type an invalid value', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-time-picker-beta></gux-time-picker-beta>`
    });

    // Focus in
    const input = await page.find('gux-time-picker-beta input');
    await input.focus();
    let focusedElement = await page.find(':focus');
    expect(focusedElement.outerHTML).toBe(input.outerHTML);

    // Type
    await input.type('00:55:0');
    let list = await page.find('gux-time-picker-beta gux-list');
    focusedElement = await page.find(':focus');
    expect(focusedElement.outerHTML).toBe(input.outerHTML);
    // expect(input).toHaveFocus();
    expect(list).not.toBeNull();

    // Keep focus on input
    await input.press('Enter');
    const timePicker = await page.find('gux-time-picker-beta');
    list = await page.find('gux-time-picker-beta gux-list');
    focusedElement = await page.find(':focus');
    expect(focusedElement.outerHTML).toBe(input.outerHTML);
    expect(list).toBeNull();
    expect(await timePicker.getProperty('value')).toEqual('');
  });

  it('Selects a value from the dropdown on click', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-time-picker-beta></gux-time-picker-beta>`
    });

    // click input
    const input = await page.find('gux-time-picker-beta input');
    await input.click();
    const focusedElement = await page.find(':focus');
    expect(focusedElement.outerHTML).toBe(input.outerHTML);

    // Type
    await input.type('00:00:00');
    const list = await page.find('gux-time-picker-beta gux-list');
    const listItem = await page.findAll(
      'gux-time-picker-beta gux-list gux-list-item'
    );

    expect(list).not.toBeNull();

    // click list item
    await listItem[1].click();
    const timePicker = await page.find('gux-time-picker-beta');
    expect(await timePicker.getProperty('value')).toEqual('00:15:00');
  });
});

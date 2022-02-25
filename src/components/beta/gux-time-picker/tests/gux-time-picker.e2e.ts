import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

const html = '<gux-time-picker-beta lang="en"></gux-time-picker-beta>';
describe('gux-time-picker-beta', () => {
  it('renders', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-time-picker-beta');

    expect(element).toHaveClass('hydrated');
  });

  it('Active class on focus', async () => {
    // Setup
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-time-picker-beta');
    const input = await element.find('pierce/input');

    // Run
    await input.focus();
    await page.waitForChanges();

    // Validate
    const focusedElement = await element.find('pierce/:focus');
    expect(focusedElement.outerHTML).toEqual(input.outerHTML);
  });

  it('Type a valid value', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-time-picker-beta');
    const input = await element.find('pierce/input');

    await a11yCheck(page, [], 'dropdown closed');

    // Focus in
    await input.focus();
    let focusedElement = await element.find('pierce/:focus');
    expect(focusedElement.outerHTML).toEqual(input.outerHTML);

    // Type
    await input.type('00:55:00');
    let list = await element.find('pierce/gux-list');
    await a11yCheck(page, [], 'dropdown opened');
    focusedElement = await element.find('pierce/:focus');
    expect(focusedElement.outerHTML).toEqual(input.outerHTML);

    expect(list).not.toBeNull();

    // Keep focus on input
    await input.press('Enter');
    list = await element.find('pierce/gux-list');
    focusedElement = await element.find('pierce/:focus');
    expect(focusedElement.outerHTML).toEqual(input.outerHTML);
    expect(list).toBeNull();
    expect(await element.getProperty('value')).toEqual('00:55:00');
  });

  it('Type an invalid value', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-time-picker-beta');
    const input = await element.find('pierce/input');

    // Focus in
    await input.focus();
    let focusedElement = await element.find('pierce/:focus');
    expect(focusedElement.outerHTML).toEqual(input.outerHTML);

    // Type
    await input.type('00:55:0');
    let list = await element.find('pierce/gux-list');
    focusedElement = await element.find('pierce/:focus');
    expect(focusedElement.outerHTML).toEqual(input.outerHTML);
    // expect(input).toHaveFocus();
    expect(list).not.toBeNull();

    // Keep focus on input
    await input.press('Enter');
    list = await element.find('pierce/gux-list');
    focusedElement = await element.find('pierce/:focus');
    expect(focusedElement.outerHTML).toEqual(input.outerHTML);
    expect(list).toBeNull();
    expect(await element.getProperty('value')).toEqual('');
  });

  it('Selects a value from the dropdown on click', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-time-picker-beta');
    const input = await element.find('pierce/input');

    // click input
    await input.click();
    const focusedElement = await element.find('pierce/:focus');
    expect(focusedElement.outerHTML).toEqual(input.outerHTML);

    // Type
    await input.type('00:00:00');
    const list = await element.find('pierce/gux-list');
    const listItem = await element.findAll('pierce/gux-list gux-list-item');

    expect(list).not.toBeNull();

    // click list item
    await listItem[1].click();
    expect(await element.getProperty('value')).toEqual('00:15:00');
  });
});

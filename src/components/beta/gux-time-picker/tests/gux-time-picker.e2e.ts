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
    expect(input).toHaveClass('gux-focused');
  });

  it('Type a valid value', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-time-picker-beta></gux-time-picker-beta>`
    });
    await a11yCheck(page, [], 'dropdown closed');

    // Focus in
    const input = await page.find('gux-time-picker-beta input');
    await input.focus();
    expect(input).toHaveClass('gux-focused');

    // Type
    await input.type('00:55:00');
    let list = await page.find('gux-time-picker-beta gux-list');
    await a11yCheck(page, [], 'dropdown opened');
    expect(input).toHaveClass('gux-focused');
    expect(list).not.toBeNull();

    // Lose Focus
    await input.press('Enter');
    const timePicker = await page.find('gux-time-picker-beta');
    list = await page.find('gux-time-picker-beta gux-list');
    expect(input).not.toHaveClass('focused');
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
    expect(input).toHaveClass('gux-focused');

    // Type
    await input.type('00:55:0');
    let list = await page.find('gux-time-picker-beta gux-list');
    expect(input).toHaveClass('gux-focused');
    expect(list).not.toBeNull();

    // Lose Focus
    await input.press('Enter');
    const timePicker = await page.find('gux-time-picker-beta');
    list = await page.find('gux-time-picker-beta gux-list');
    expect(input).not.toHaveClass('focused');
    expect(list).toBeNull();
    expect(await timePicker.getProperty('value')).toEqual('');
  });
});

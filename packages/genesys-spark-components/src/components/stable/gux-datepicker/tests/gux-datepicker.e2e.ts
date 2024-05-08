import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-datepicker', () => {
  it('renders', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-datepicker lang="en"></gux-datepicker>`
    });
    const element = await page.find('gux-datepicker');
    expect(element).toHaveAttribute('hydrated');
  });

  it('renders a datepicker for range of dates', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-datepicker
        mode="range"
        value="2019-11-25/2019-12-02"
        number-of-months="2"
        ></gux-datepicker>`
    });
    const element = await page.find('gux-datepicker');
    expect(element).toHaveAttribute('hydrated');
  });

  it('updates the text input state when the datepicker’s value property is set', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-datepicker lang="en"></gux-datepicker>`
    });

    const element = await page.find('gux-datepicker');

    element.setProperty('value', '1985-12-01');
    await page.waitForChanges();

    const input = await element.find('pierce/input');
    const value = await input.getProperty('value');
    await a11yCheck(page);
    expect(value).toBe('12/01/1985');
  });

  it('opens the calendar when the input is clicked', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-datepicker lang="en"></gux-datepicker>`
    });
    const datepicker = await page.find('gux-datepicker');
    const datepickerContainer = await datepicker.find('pierce/.gux-datepicker');
    const input = await datepickerContainer.find('input');
    await input.click();
    await page.waitForChanges();
    await a11yCheck(page);
    expect(datepickerContainer.className).toContain('gux-active');
  });

  it('opens and closes the calendar when the button is clicked', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-datepicker lang="en"></gux-datepicker>`
    });
    const datepicker = await page.find('gux-datepicker');
    const datepickerContainer = await datepicker.find('pierce/.gux-datepicker');
    const input = await datepicker.find('pierce/input');
    await input.click();
    await page.waitForChanges();
    expect(datepickerContainer.className).toContain('gux-active');
    const button = await datepicker.find('pierce/.gux-calendar-toggle-button');
    await button.click();
    await page.waitForChanges();
    expect(datepickerContainer.className).not.toContain('gux-active');
  });

  it('should not open the calendar when the input or button is clicked when disabled', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-datepicker lang="en" disabled></gux-datepicker>`
    });
    const datepicker = await page.find('gux-datepicker');
    const datepickerContainer = await datepicker.find('pierce/.gux-datepicker');
    const input = await datepicker.find('pierce/input');
    await input.click();
    await page.waitForChanges();
    expect(datepickerContainer.className).not.toContain('gux-active');
    const button = await datepicker.find('pierce/.gux-calendar-toggle-button');
    await button.click();
    await page.waitForChanges();
    expect(datepickerContainer.className).not.toContain('gux-active');
  });

  it('provides the correct label in single date mode', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-datepicker lang="en"></gux-datepicker>`
    });
    const element = await page.find('gux-datepicker');
    const labels = await page.findAll('pierce/.gux-datepicker-field-label');
    await a11yCheck(page);
    expect(labels.length).toBe(1);
    expect(labels[0].textContent).toEqual('Date');
    expect(labels[0].className).toContain('gux-sr-only');

    element.setAttribute('label', 'test');
    await page.waitForChanges();
    await a11yCheck(page);
    expect(labels[0].textContent).toEqual('test');
    expect(labels[0].className).not.toContain('gux-sr-only');
  });

  it('provides the correct labels in date range mode', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-datepicker
      mode="range"
      value="2019-11-25/2019-12-02"
      number-of-months="2"
      ></gux-datepicker>`
    });
    const labels = await page.findAll('pierce/.gux-datepicker-field-label');
    await page.waitForChanges();
    await a11yCheck(page);
    expect(labels.length).toBe(2);
    expect(labels[0].textContent).toBe('Start');
    expect(labels[0].className).not.toContain('gux-sr-only');
    expect(labels[1].textContent).toBe('End');

  });
});

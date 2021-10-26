import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

const axeExclusions = [
  {
    issueId: 'color-contrast',
    exclusionReason:
      'Will consult UX for guidance regarding the color contrast violations in the calendar element'
  }
];

describe('gux-datepicker', () => {
  it('renders', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-datepicker lang="en"></gux-datepicker>`
    });
    const element = await page.find('gux-datepicker');
    expect(element).toHaveClass('hydrated');
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
    expect(element).toHaveClass('hydrated');
  });

  it('updates the text input state when the datepicker’s value property is set', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-datepicker lang="en"></gux-datepicker>`
    });

    const element = await page.find('gux-datepicker');

    await element.setProperty('value', '1985-12-01');
    await page.waitForChanges();

    const input = await page.find('input');
    const value = await input.getProperty('value');
    await a11yCheck(page, axeExclusions);
    expect(value).toBe('12/01/1985');
  });

  it('opens the calendar when the input is clicked', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-datepicker lang="en"></gux-datepicker>`
    });
    const datepicker = await page.find('.gux-datepicker');
    const input = await page.find('input');
    await input.click();
    await page.waitForChanges();
    await a11yCheck(page, axeExclusions);
    expect(datepicker.className).toContain('gux-active');
  });

  it('opens and closes the calendar when the button is clicked', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-datepicker lang="en"></gux-datepicker>`
    });
    const datepicker = await page.find('.gux-datepicker');
    const button = await page.find('.gux-calendar-toggle-button');
    await button.click();
    await page.waitForChanges();
    expect(datepicker.className).toContain('gux-active');
    await button.click();
    await page.waitForChanges();
    expect(datepicker.className).not.toContain('gux-active');
  });

  it('provides the correct label in single date mode', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-datepicker lang="en"></gux-datepicker>`
    });
    const element = await page.find('gux-datepicker');
    const labels = await page.findAll('.gux-datepicker-field-label');
    await a11yCheck(page, axeExclusions);
    expect(labels.length).toBe(1);
    expect(labels[0].textContent).toEqual('Datepicker');
    expect(labels[0].className).toContain('gux-sr-only');

    await element.setAttribute('label', 'test');
    await page.waitForChanges();
    await a11yCheck(page, axeExclusions);
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
    const element = await page.find('gux-datepicker');
    const labels = await page.findAll('.gux-datepicker-field-label');
    await page.waitForChanges();
    await a11yCheck(page, axeExclusions);
    expect(labels.length).toBe(2);
    expect(labels[0].textContent).toBe('Start');
    expect(labels[0].className).not.toContain('gux-sr-only');
    expect(labels[1].textContent).toBe('End');

    // await element.setAttribute('label', ['test1', 'test2']);
    // await page.waitForChanges();
    // expect(labels[0].textContent).toEqual('test1');
    // expect(labels[0].className).not.toContain('gux-sr-only');
    // expect(labels[1].textContent).toEqual('test2');
  });
});

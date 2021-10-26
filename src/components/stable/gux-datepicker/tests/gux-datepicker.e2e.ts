import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

const axeExclusions = [];

describe('gux-datepicker', () => {
  it('renders', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-datepicker lang="en"></gux-datepicker>`
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
});

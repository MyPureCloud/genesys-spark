import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

describe('gux-calendar', () => {
  it('renders', async () => {
    const page = await newSparkE2EPage({
      html: '<gux-calendar lang="en"></gux-calendar>'
    });
    const element = await page.find('gux-calendar');
    await a11yCheck(page);

    expect(element).toHaveAttribute('hydrated');
  });
  it('shows the correct first day of week (en)', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-calendar lang="en"></gux-calendar>`
    });
    const element = await page.find('gux-calendar');
    const firstDayOfWeek = await element.find('pierce/th');
    expect(firstDayOfWeek.innerText).toEqual('S');
  });
  it('shows the correct first day of week (es-es)', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-calendar lang="es-es"></gux-calendar>`
    });
    const element = await page.find('gux-calendar');
    const firstDayOfWeek = await element.find('pierce/th');
    expect(firstDayOfWeek.innerText).toEqual('L');
  });
});

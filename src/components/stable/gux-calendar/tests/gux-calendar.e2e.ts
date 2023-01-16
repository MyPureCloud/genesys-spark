import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

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

  it('should render the correct months when using a range calendar', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-calendar mode="range" number-of-months="2" value="2022-08-31/2022-09-06">
      </gux-calendar>`
    });
    const element = await page.find('gux-calendar');
    const monthList = element.shadowRoot.querySelector('.gux-month-list');

    expect(monthList).toEqualHtml(
      '<div class="gux-month-list"><label>August 2022</label><label>September 2022</label></div>'
    );
  });

  it('should render the correct months when using a range calendar', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-calendar mode="range" number-of-months="2" value="2022-05-31/2022-06-06">
      </gux-calendar>`
    });
    const element = await page.find('gux-calendar');
    const monthList = element.shadowRoot.querySelector('.gux-month-list');

    expect(monthList).toEqualHtml(
      '<div class="gux-month-list"><label>May 2022</label><label>June 2022</label></div>'
    );
  });
});

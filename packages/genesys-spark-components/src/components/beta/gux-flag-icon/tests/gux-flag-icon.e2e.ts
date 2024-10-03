import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-flag-icon-beta', () => {
  it(`should render component as expected`, async () => {
    const html = `<gux-flag-icon-beta flag="ie"></gux-flag-icon-beta>`;
    const page = await newSparkE2EPage({ html });
    await a11yCheck(page);

    const element = await page.find('gux-flag-icon-beta');
    expect(element.outerHTML).toMatchSnapshot();
  });

  it(`should render component with screenreader text as expected`, async () => {
    const html = `<gux-flag-icon-beta flag="ie" screenreader-text="ireland"></gux-flag-icon-beta>`;
    const page = await newSparkE2EPage({ html });
    await a11yCheck(page);

    const element = await page.find('gux-flag-icon-beta');
    expect(element.outerHTML).toMatchSnapshot();
  });
});

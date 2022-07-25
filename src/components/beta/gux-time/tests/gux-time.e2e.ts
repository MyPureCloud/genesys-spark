import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

const date = new Date(2022, 6, 7, 9, 35, 30, 100).toISOString();

describe('gux-time-beta', () => {
  describe('#render', () => {
    [
        `<gux-time-beta time=${date} format="short"></gux-time-beta>`,
        `<gux-time-beta time=${date} format="medium"></gux-time-beta>`,
        `<gux-time-beta time=${date} format="long"></gux-time-beta>`,
        `<gux-time-beta time=${date} format="full"></gux-time-beta>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        await a11yCheck(page);

        const element = await page.find('gux-time-beta');
        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});

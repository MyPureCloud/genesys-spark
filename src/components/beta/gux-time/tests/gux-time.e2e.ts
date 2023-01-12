import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

const date = '2022-07-07T13:35:30.100Z';

describe('gux-time-beta', () => {
  describe('#render', () => {
    [
      `<gux-time-beta datetime=${date} format="short"></gux-time-beta>`,
      `<gux-time-beta datetime=${date} format="medium"></gux-time-beta>`,
      `<gux-time-beta datetime=${date} format="long"></gux-time-beta>`,
      `<gux-time-beta datetime=${date} format="full"></gux-time-beta>`
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

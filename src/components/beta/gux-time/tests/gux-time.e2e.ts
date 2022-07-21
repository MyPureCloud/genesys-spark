import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

const date = new Date(2022, 6, 7, 9, 35, 30, 100);

describe('gux-time-beta', () => {
  describe('#render', () => {
    [
        `<gux-time-beta format="short"></gux-time-beta>`,
        `<gux-time-beta format="medium"></gux-time-beta>`,
        `<gux-time-beta format="long"></gux-time-beta>`,
        `<gux-time-beta format="full"></gux-time-beta>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-time-beta');

        element.setAttribute('date', date);
        await page.waitForChanges()

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});

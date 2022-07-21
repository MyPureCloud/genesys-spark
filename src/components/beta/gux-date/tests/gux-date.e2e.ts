import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

const date = new Date(2022, 6, 7, 9, 35, 30, 100);

describe('gux-date-beta', () => {
  describe('#render', () => {
    [
        `<gux-date-beta format="short"></gux-date-beta>`,
        `<gux-date-beta format="medium"></gux-date-beta>`,
        `<gux-date-beta format="long"></gux-date-beta>`,
        `<gux-date-beta format="full"></gux-date-beta>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-date-beta');

        element.setAttribute('date', date);
        await page.waitForChanges()

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});

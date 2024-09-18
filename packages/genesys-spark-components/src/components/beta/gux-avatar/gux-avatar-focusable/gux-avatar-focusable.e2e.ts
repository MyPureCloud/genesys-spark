import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-avatar', () => {
  describe('#render', () => {
    [
      `<gux-avatar-focusable-beta>
        <button>
          <gux-avatar-beta name="Conor Darcy"></gux-avatar-beta>
        </button>
      </gux-avatar-focusable-beta>`,
      `<gux-avatar-focusable-beta>
        <a href="#">
          <gux-avatar-beta name="Conor Darcy"></gux-avatar-beta>
        </a>
      </gux-avatar-focusable-beta>`,
      `<gux-avatar-focusable-beta>
        <gux-avatar-change-photo-beta>
          <gux-avatar-beta slot="avatar" name="Conor Darcy"></gux-avatar-beta>
        </gux-avatar-change-photo-beta>
      </gux-avatar-focusable-beta>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-avatar-focusable-beta');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});

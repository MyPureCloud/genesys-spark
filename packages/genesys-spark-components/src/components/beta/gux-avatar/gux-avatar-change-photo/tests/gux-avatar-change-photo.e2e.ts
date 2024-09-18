import { newSparkE2EPage, a11yCheck } from '../../../../../test/e2eTestUtils';

describe('gux-avatar', () => {
  describe('#render', () => {
    it(`should log warning for gux-avatar-change-photo without avatar`, async () => {
      const html = `<gux-avatar-change-photo-beta>
        <gux-avatar-beta slot="avatar" name="Conor Darcy"></gux-avatar-beta>
      </gux-avatar-change-photo-beta>`;
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-avatar-change-photo-beta');

      await a11yCheck(page);

      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});

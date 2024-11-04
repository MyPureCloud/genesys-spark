jest.mock('../../../../../utils/error/log-error', () => ({
  __esModule: true,
  logWarn: jest.fn()
}));

import { newSpecPage } from '@test/specTestUtils';
import { GuxAvatarChangePhoto } from '../gux-avatar-change-photo';
import { logWarn } from '../../../../../utils/error/log-error';

describe('gux-avatar-change-photo', () => {
  describe('#render', () => {
    it(`component with valid markup`, async () => {
      const html = `<gux-avatar-change-photo-beta>
        <gux-avatar-beta slot="avatar" name="Conor Darcy"></gux-avatar-beta>
      </gux-avatar-change-photo-beta>`;
      const page = await newSpecPage({
        components: [GuxAvatarChangePhoto],
        html
      });
      expect(page.root).toMatchSnapshot();
      expect(logWarn).not.toHaveBeenCalled();
    });
  });

  describe('warnings', () => {
    it(`should log warning for gux-avatar-change-photo without avatar`, async () => {
      const html = `<gux-avatar-change-photo-beta></gux-avatar-change-photo-beta>`;
      await newSpecPage({ components: [GuxAvatarChangePhoto], html });
      expect(logWarn).toHaveBeenCalled();
    });
  });
});

jest.mock('../../../../../utils/error/log-error', () => ({
  __esModule: true,
  logWarn: jest.fn()
}));

import { newSpecPage, checkRenders } from '@test/specTestUtils';
import { GuxAvatarFocusable } from '../gux-avatar-focusable';
import { logWarn } from '../../../../../utils/error/log-error';
import { renderConfigs } from './gux-avatar-focusable.common';

describe('gux-avatar-focusable', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, [GuxAvatarFocusable]);
  });

  describe('warnings', () => {
    it(`should log warning for gux-avatar-focusable without gux-avatar-beta`, async () => {
      const html = `<gux-avatar-focusable-beta>
        <a href="#">Johnnny Dooley</a>
      </gux-avatar-focusable-beta>`;
      await newSpecPage({ components: [GuxAvatarFocusable], html });
      expect(logWarn).toHaveBeenCalled();
    });

    [
      `<gux-avatar-focusable-beta>
          <gux-avatar-beta name="Conor Darcy"></gux-avatar-beta>
      </gux-avatar-focusable-beta>`,
      `<gux-avatar-focusable-beta>
        <div>
          <gux-avatar-beta name="Conor Darcy"></gux-avatar-beta>
        </div>
      </gux-avatar-focusable-beta>`,
      `<gux-avatar-focusable-beta>
        <gux-avatar-change-photo-beta>
          <gux-avatar-beta slot="avatar" name="Conor Darcy"></gux-avatar-beta>
        </gux-avatar-change-photo-beta>
      </gux-avatar-focusable-beta>`
    ].forEach((html, index) => {
      it(`should log warning for gux-avatar-focusable without anchor, gux-change-photo-beta or button tags type (${index + 1})`, async () => {
        await newSpecPage({ components: [GuxAvatarFocusable], html });
        expect(logWarn).toHaveBeenCalled();
      });
    });
  });
});

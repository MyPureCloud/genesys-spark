jest.mock('../../../../utils/error/log-error', () => ({
  __esModule: true,
  logWarn: jest.fn()
}));

import { newSpecPage } from '@test/specTestUtils';
import { GuxAvatar } from '../gux-avatar';
import { logWarn } from '../../../../utils/error/log-error';

describe('gux-avatar', () => {
  describe('#render', () => {
    [
      `<gux-avatar-beta name="John Doe"></gux-avatar-beta>`,
      `<gux-avatar-beta name="John Doe"><img slot="image" alt="John Doe Image" src="https://i.pravatar.cc/300" /></gux-avatar-beta>`
    ].forEach((html, index) => {
      it(`component with or without an image (${
        index + 1
      }) for valid markup`, async () => {
        const page = await newSpecPage({ components: [GuxAvatar], html });

        expect(page.root).toMatchSnapshot();
        expect(logWarn).not.toHaveBeenCalled();
      });
    });

    it(`should log warning for avatar without name"`, async () => {
      const html = `<gux-avatar-beta></gux-avatar-beta>`;
      await newSpecPage({ components: [GuxAvatar], html });
      expect(logWarn).toHaveBeenCalled();
    });

    it(`should log warning for avatar image without alt tag"`, async () => {
      const html = `<gux-avatar-beta name="John Doe"><img slot="image" src="https://i.pravatar.cc/300" /></gux-avatar-beta>`;
      await newSpecPage({ components: [GuxAvatar], html });
      expect(logWarn).toHaveBeenCalled();
    });
  });

  describe('#render different sizes', () => {
    ['xsmall', 'small', 'medium', 'large', 'medium-rare'].forEach(
      (size: string) => {
        it(`should work as expected for "${size}"`, async () => {
          const html = `<gux-avatar-beta name="John Doe" size=${size}></gux-avatar-beta>`;
          const page = await newSpecPage({ components: [GuxAvatar], html });

          expect(page.root).toMatchSnapshot();
        });
      }
    );
  });
});

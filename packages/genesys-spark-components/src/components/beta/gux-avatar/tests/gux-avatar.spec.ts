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
      `<gux-avatar-beta name="JohnDoe"></gux-avatar-beta>`,
      `<gux-avatar-beta name="山田 太郎"></gux-avatar-beta>`,
      `<gux-avatar-beta name="이 영수"></gux-avatar-beta>`,
      `<gux-avatar-beta name="邓 小平"></gux-avatar-beta>`
    ].forEach((html, index) => {
      it(`component with name type (${
        index + 1
      }) for valid markup`, async () => {
        const page = await newSpecPage({ components: [GuxAvatar], html });

        expect(page.root).toMatchSnapshot();
        expect(logWarn).not.toHaveBeenCalled();
      });
    });

    [
      `<gux-avatar-beta name="John Doe"><img slot="image" alt="John Doe Image" src="https://i.pravatar.cc/300" /></gux-avatar-beta>`,
      `<gux-avatar-beta name="John Doe"><img slot="image" alt="John Doe Image" src="https://i.pravatar.cc/300" /></gux-avatar-beta>`
    ].forEach((html, index) => {
      it(`component with image type (${
        index + 1
      }) for valid markup`, async () => {
        const page = await newSpecPage({ components: [GuxAvatar], html });

        expect(page.root).toMatchSnapshot();
        expect(logWarn).not.toHaveBeenCalled();
      });
    });
  });

  describe('warnings', () => {
    it(`should log warning for avatar without name`, async () => {
      const html = `<gux-avatar-beta></gux-avatar-beta>`;
      await newSpecPage({ components: [GuxAvatar], html });
      expect(logWarn).toHaveBeenCalled();
    });

    it(`should log warning for avatar image without alt tag"`, async () => {
      const html = `<gux-avatar-beta name="John Doe"><img slot="image" src="https://i.pravatar.cc/300" /></gux-avatar-beta>`;
      await newSpecPage({ components: [GuxAvatar], html });
      expect(logWarn).toHaveBeenCalled();
    });

    it(`should log warning for avatar with uc integration that isn't large"`, async () => {
      const html = `<gux-avatar-beta name="John Doe" uc-integration="teams" size="medium"><img slot="image" src="https://i.pravatar.cc/300" /></gux-avatar-beta>`;
      await newSpecPage({ components: [GuxAvatar], html });
      expect(logWarn).toHaveBeenCalled();
    });
  });

  describe('changes to attributes after initial load should be reflected in DOM', () => {
    it(`should update size attribute`, async () => {
      const html = `<gux-avatar-beta size="large" name="John Doe"></gux-avatar-beta>`;
      const page = await newSpecPage({ components: [GuxAvatar], html });
      const element = document.querySelector('gux-avatar-beta');

      element.setAttribute('size', 'small');
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    it(`should update accent attribute`, async () => {
      const html = `<gux-avatar-beta accent="1" name="John Doe"></gux-avatar-beta>`;
      const page = await newSpecPage({ components: [GuxAvatar], html });
      const element = document.querySelector('gux-avatar-beta');

      element.setAttribute('accent', '6');
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
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

  describe('#render different presences', () => {
    [
      'available',
      'away',
      'busy',
      'meal',
      'training',
      'idle',
      'meeting',
      'offline',
      'on-queue',
      'out-of-office',
      'invalid-presence'
    ].forEach((presence: string) => {
      it(`should work as expected for "${presence}"`, async () => {
        const html = `<gux-avatar-beta badge presence=${presence} name="John Doe"></gux-avatar-beta>`;
        const page = await newSpecPage({ components: [GuxAvatar], html });

        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe('#render different accents', () => {
    [
      'default',
      'auto',
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      'invalid-accent'
    ].forEach((accent: string) => {
      it(`should work as expected for "${accent}"`, async () => {
        const html = `<gux-avatar-beta name="John Doe" accent=${accent}></gux-avatar-beta>`;
        const page = await newSpecPage({ components: [GuxAvatar], html });

        expect(page.root).toMatchSnapshot();
      });
    });

    describe('#render different uc-integration logos', () => {
      ['zoom', 'teams', '8x8', 'invalid-uc-integration'].forEach(
        (app: string) => {
          it(`should work as expected for "${app}"`, async () => {
            const html = `<gux-avatar-beta name="John Doe" uc-integration=${app}></gux-avatar-beta>`;
            const page = await newSpecPage({ components: [GuxAvatar], html });

            expect(page.root).toMatchSnapshot();
          });
        }
      );
    });

    describe('#render notification badge', () => {
      it('should render notification badge', async () => {
        const html = `<gux-avatar-beta badge notifications name="John Doe"></gux-avatar-beta>`;
        const page = await newSpecPage({ components: [GuxAvatar], html });

        expect(page.root).toMatchSnapshot();
      });
    });

    describe('#render presence ring', () => {
      it('should render presence ring', async () => {
        const html = `<gux-avatar-beta ring name="John Doe" presen></gux-avatar-beta>`;
        const page = await newSpecPage({ components: [GuxAvatar], html });

        expect(page.root).toMatchSnapshot();
      });
    });

    describe('#render label', () => {
      it('should render label', async () => {
        const html = `<gux-avatar-beta label="All Hands" name="John Doe" presence="busy" ring></gux-avatar-beta>`;
        const page = await newSpecPage({ components: [GuxAvatar], html });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});

import { newSpecPage } from '@test/specTestUtils';
import { GuxAvatar } from '../gux-avatar';

describe('gux-avatar', () => {
  describe('#render', () => {
    [
      `<gux-avatar-beta></gux-avatar-beta>`,
      `<gux-avatar-beta name="John Doe"></gux-avatar-beta>`,
      `<gux-avatar-beta><img slot="image" src="https://i.pravatar.cc/300" /></gux-avatar-beta>`,
      `<gux-avatar-beta name="John Doe"><img slot="image" src="https://i.pravatar.cc/300" /></gux-avatar-beta>`
    ].forEach((html, index) => {
      it(`component with or without an image (${index + 1})`, async () => {
        const page = await newSpecPage({ components: [GuxAvatar], html });

        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe('#render different sizes', () => {
    ['xsmall', 'small', 'medium', 'large'].forEach((size: string) => {
      it(`should work as expected for "${size}"`, async () => {
        const html = `<gux-avatar-beta size=${size}></gux-avatar-beta>`;
        const page = await newSpecPage({ components: [GuxAvatar], html });

        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe('#render different accents', () => {
    ['default', 'auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach(
      (accent: string) => {
        it(`should work as expected for "${accent}"`, async () => {
          const html = `<gux-avatar-beta name="John Doe" accent=${accent}></gux-avatar-beta>`;
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
      'offline',
      'on-queue',
      'out-of-office'
    ].forEach((presence: string) => {
      it(`should work as expected for "${presence}"`, async () => {
        const html = `<gux-avatar-beta has-badge presence=${presence}></gux-avatar-beta>`;
        const page = await newSpecPage({ components: [GuxAvatar], html });

        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe('#render different ucIntegration presences', () => {
    ['teams', 'zoom', '8x8'].forEach((ucIntegration: string) => {
      it(`should work as expected for "${ucIntegration}"`, async () => {
        const html = `<gux-avatar-beta has-badge uc-integration=${ucIntegration}></gux-avatar-beta>`;
        const page = await newSpecPage({ components: [GuxAvatar], html });

        expect(page.root).toMatchSnapshot();
      });
    });

    it('should not render ucIntegration badge if size is not large', async () => {
      const html = `<gux-avatar-beta has-badge uc-integration="8x8" size="medium"></gux-avatar-beta>`;
      const page = await newSpecPage({ components: [GuxAvatar], html });

      expect(page.root).toMatchSnapshot();
    });
  });

  describe('#render notification badge', () => {
    it('should render notification badge', async () => {
      const html = `<gux-avatar-beta has-badge has-notifications name="John Doe"></gux-avatar-beta>`;
      const page = await newSpecPage({ components: [GuxAvatar], html });

      expect(page.root).toMatchSnapshot();
    });
  });

  describe('#render presence ring', () => {
    it('should render presence ring', async () => {
      const html = `<gux-avatar-beta presence-ring name="John Doe"></gux-avatar-beta>`;
      const page = await newSpecPage({ components: [GuxAvatar], html });

      expect(page.root).toMatchSnapshot();
    });
  });
});

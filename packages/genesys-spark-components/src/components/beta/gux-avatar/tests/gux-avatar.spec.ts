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
});

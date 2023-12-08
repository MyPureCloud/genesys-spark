import { newSpecPage } from '@test/specTestUtils';
import { GuxAvatar } from '../gux-avatar';

describe('gux-avatar', () => {
  describe('#render', () => {
    [
      `<gux-avatar-beta></gux-avatar-beta>`,
      `<gux-avatar-beta initials="AB"></gux-avatar-beta>`,
      `<gux-avatar-beta><img slot="image" src="https://i.pravatar.cc/300" /></gux-avatar-beta>`,
      `<gux-avatar-beta initials="AB"><img slot="image" src="https://i.pravatar.cc/300" /></gux-avatar-beta>`
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
    [
      'default',
      'add',
      'more',
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      '11',
      '12'
    ].forEach((accent: string) => {
      it(`should work as expected for "${accent}"`, async () => {
        const html = `<gux-avatar-beta accent=${accent}></gux-avatar-beta>`;
        const page = await newSpecPage({ components: [GuxAvatar], html });

        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe('#render different statuses', () => {
    [
      'available',
      'break',
      'busy',
      'notifications',
      'offline',
      'queue',
      'out-of-office'
    ].forEach((status: string) => {
      it(`should work as expected for "${status}"`, async () => {
        const html = `<gux-avatar-beta status=${status}></gux-avatar-beta>`;
        const page = await newSpecPage({ components: [GuxAvatar], html });

        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe('#test interactive click', () => {
    it('should fire a click event when an interactive button is clicked', async () => {
      const html = `<gux-avatar-beta interactive></gux-avatar-beta>`;
      const page = await newSpecPage({ components: [GuxAvatar], html });

      const spy = jest.fn();
      page.root.addEventListener('click', spy);
      page.root.shadowRoot.querySelector('button').click();

      expect(spy).toHaveBeenCalled();
    });
  });
});

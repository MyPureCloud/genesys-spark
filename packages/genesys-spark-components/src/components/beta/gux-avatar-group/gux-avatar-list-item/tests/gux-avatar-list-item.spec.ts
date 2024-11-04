jest.mock('../../../../../utils/error/log-error', () => ({
  __esModule: true,
  logWarn: jest.fn()
}));

import { newSpecPage } from '@stencil/core/testing';
import { GuxAvatarListItem } from '../gux-avatar-list-item';
import { logWarn } from '../../../../../utils/error/log-error';

describe('gux-avatar-list-item', () => {
  describe('#render', () => {
    [
      `<gux-avatar-list-item-beta><gux-avatar-beta name="John Doe"></gux-avatar-beta></gux-avatar-list-item-beta>`,
      `<gux-avatar-list-item-beta interactive-element="a"><gux-avatar-beta name="John Doe"></gux-avatar-beta></gux-avatar-list-item-beta>`,
      `<gux-avatar-list-item-beta focusable="true"><gux-avatar-beta name="John Doe"></gux-avatar-beta></gux-avatar-list-item-beta>`,
      `<gux-avatar-list-item-beta layout="plus-name"><gux-avatar-beta name="John Doe"></gux-avatar-beta></gux-avatar-list-item-beta>`
    ].forEach((html, index) => {
      it(`component with name type (${
        index + 1
      }) for valid markup`, async () => {
        const page = await newSpecPage({
          components: [GuxAvatarListItem],
          html
        });

        expect(page.root).toMatchSnapshot();
        expect(logWarn).not.toHaveBeenCalled();
      });
    });
  });

  it(`should log warning for gux-avatar-list-item without avatar or overflow without gux-avatar-beta`, async () => {
    const html = `<gux-avatar-list-item-beta></gux-avatar-list-item-beta>`;
    await newSpecPage({ components: [GuxAvatarListItem], html });
    expect(logWarn).toHaveBeenCalled();
  });
});

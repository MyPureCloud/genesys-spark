jest.mock('../../../../../utils/error/log-error', () => ({
  __esModule: true,
  logWarn: jest.fn()
}));

import { newSpecPage } from '@stencil/core/testing';
import { GuxAvatarOverflow } from '../gux-avatar-overflow';
import { logWarn } from '../../../../../utils/error/log-error';

describe('gux-avatar-overflow', () => {
  describe('#render', () => {
    [
      `<gux-avatar-overflow-beta count="2"></gux-avatar-overflow-beta>`,
      `<gux-avatar-overflow-beta count="2">
        <li>1</li>
        <li>2</li>
      </gux-avatar-overflow-beta>`
    ].forEach((html, index) => {
      it(`component with name type (${
        index + 1
      }) for valid markup`, async () => {
        const page = await newSpecPage({
          components: [GuxAvatarOverflow],
          html
        });

        expect(page.root).toMatchSnapshot();
        expect(logWarn).not.toHaveBeenCalled();
      });
    });
  });
});

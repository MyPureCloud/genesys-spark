jest.mock('../../../../utils/error/log-error', () => ({
  __esModule: true,
  logWarn: jest.fn()
}));

import { newSpecPage } from '@test/specTestUtils';

import { GuxAvatarGroup } from '../gux-avatar-group';
import { logWarn } from '../../../../utils/error/log-error';
import { GuxAvatarGroupItem } from '../gux-avatar-group-item/gux-avatar-group-item';
const components = [GuxAvatarGroup, GuxAvatarGroupItem];
const language = 'en';

describe('gux-avatar-group', () => {
  it('render', async () => {
    const html = `<gux-avatar-group-beta>
  <gux-avatar-group-item-beta name="Conor Darcy">
    </gux-avatar-group-item-beta>
  <gux-avatar-group-item-beta
    name="Elliot Fitzgerald"

  ></gux-avatar-group-item-beta>
  <gux-avatar-group-item-beta
    name="Greg Hayes"

  ></gux-avatar-group-item-beta>
  <gux-avatar-group-item-beta
    name="Iseult Jones"

  ></gux-avatar-group-item-beta>
  <gux-avatar-group-item-beta
    name="John King"

  ></gux-avatar-group-item-beta>
  <gux-avatar-group-item-beta
    name="Larissa Mendez"

  ></gux-avatar-group-item-beta>
  <gux-avatar-group-item-beta
    name="Nancy Omaha"

  ></gux-avatar-group-item-beta>
  <gux-avatar-group-item-beta
    name="Paul Quinn"

  ></gux-avatar-group-item-beta>
  <gux-avatar-group-item-beta
    name="Roisin Smyth"

  ></gux-avatar-group-item-beta>
  <gux-avatar-group-item-beta name="Thomas U.">
  </gux-avatar-group-item-beta>
  <gux-avatar-group-item-beta
    name="Valerie Wall"

  ></gux-avatar-group-item-beta>
  <gux-avatar-group-item-beta
    name="Xavier Yarrow"

  ></gux-avatar-group-item-beta>
</gux-avatar-group-beta>`;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxAvatarGroup);
    expect(page.root).toMatchSnapshot();
  });

  describe('warnings', () => {
    it(`should log warning for group without gux-avatar-group-items`, async () => {
      const html = `<gux-avatar-group-beta></gux-avatar-group-beta>`;
      await newSpecPage({ components, html });
      expect(logWarn).toHaveBeenCalled();
    });
  });
});

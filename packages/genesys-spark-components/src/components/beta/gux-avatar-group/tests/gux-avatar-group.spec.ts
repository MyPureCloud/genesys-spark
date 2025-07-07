jest.mock('../../../../utils/error/log-error', () => ({
  __esModule: true,
  logWarn: jest.fn()
}));

import { newSpecPage } from '@test/specTestUtils';

import { GuxAvatarGroup } from '../gux-avatar-group';
import { logWarn } from '../../../../utils/error/log-error';
import { GuxAvatarGroupItem } from '../gux-avatar-group-item/gux-avatar-group-item';
import { GuxAvatarGroupAddItem } from '../gux-avatar-group-add-item/gux-avatar-group-add-item';

const components = [GuxAvatarGroup, GuxAvatarGroupItem, GuxAvatarGroupAddItem];

describe('gux-avatar-group', () => {
  [
    `<gux-avatar-group-beta>
      <gux-avatar-group-item-beta name="Conor Darcy"></gux-avatar-group-item-beta>
      <gux-avatar-group-item-beta name="Elliot Fitzgerald"></gux-avatar-group-item-beta>
      <gux-avatar-group-item-beta name="Greg Hayes"></gux-avatar-group-item-beta>
      <gux-avatar-group-item-beta name="Iseult Jones"></gux-avatar-group-item-beta>
      <gux-avatar-group-item-beta name="John King"></gux-avatar-group-item-beta>
      <gux-avatar-group-item-beta name="Larissa Mendez"></gux-avatar-group-item-beta>
      <gux-avatar-group-item-beta name="Nancy Omaha"></gux-avatar-group-item-beta>
      <gux-avatar-group-item-beta name="Paul Quinn"></gux-avatar-group-item-beta>
      <gux-avatar-group-item-beta name="Roisin Smyth"></gux-avatar-group-item-beta>
      <gux-avatar-group-item-beta name="Thomas U."></gux-avatar-group-item-beta>
      <gux-avatar-group-item-beta name="Valerie Wall"></gux-avatar-group-item-beta>
      <gux-avatar-group-item-beta name="Xavier Yarrow"></gux-avatar-group-item-beta>
    </gux-avatar-group-beta>`,
    `<gux-avatar-group-beta>
      <gux-avatar-group-item-beta name="Conor Darcy"></gux-avatar-group-item-beta>
      <gux-avatar-group-item-beta name="Elliot Fitzgerald"></gux-avatar-group-item-beta>
      <gux-avatar-group-item-beta name="Greg Hayes"></gux-avatar-group-item-beta>
      <gux-avatar-group-item-beta name="Iseult Jones"></gux-avatar-group-item-beta>
      <gux-avatar-group-item-beta name="John King"></gux-avatar-group-item-beta>
      <gux-avatar-group-item-beta name="Larissa Mendez"></gux-avatar-group-item-beta>
      <gux-avatar-group-item-beta name="Nancy Omaha"></gux-avatar-group-item-beta>
      <gux-avatar-group-item-beta name="Paul Quinn"></gux-avatar-group-item-beta>
      <gux-avatar-group-item-beta name="Roisin Smyth"></gux-avatar-group-item-beta>
      <gux-avatar-group-item-beta name="Thomas U."></gux-avatar-group-item-beta>
      <gux-avatar-group-item-beta name="Valerie Wall"></gux-avatar-group-item-beta>
      <gux-avatar-group-item-beta name="Xavier Yarrow"></gux-avatar-group-item-beta>
      <gux-avatar-group-add-item-beta></gux-avatar-group-add-item-beta>
    </gux-avatar-group-beta>`
  ].forEach((html, index) => {
    it(`component with name type (${index + 1}) for valid markup`, async () => {
      const page = await newSpecPage({ components, html });

      expect(page.root).toMatchSnapshot();
      expect(logWarn).not.toHaveBeenCalled();
    });
  });

  describe('warnings', () => {
    it(`should log warning for group without gux-avatar-group-items`, async () => {
      const html = `<gux-avatar-group-beta></gux-avatar-group-beta>`;
      await newSpecPage({ components, html });
      expect(logWarn).toHaveBeenCalled();
    });
  });
});

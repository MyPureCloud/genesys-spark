jest.mock('../../../../utils/error/log-error', () => ({
  __esModule: true,
  logWarn: jest.fn()
}));

import { newSpecPage } from '@test/specTestUtils';

import { GuxAvatarGroup } from '../gux-avatar-group';
import { logWarn } from '../../../../utils/error/log-error';
import { GuxAvatarGroupItem } from '../gux-avatar-group-item/gux-avatar-group-item';
import { GuxAvatarGroupAddItem } from '../gux-avatar-group-add-item/gux-avatar-group-add-item';
import { renderConfigs } from './gux-avatar-group.common';

const components = [GuxAvatarGroup, GuxAvatarGroupItem, GuxAvatarGroupAddItem];

describe('gux-avatar-group', () => {
  renderConfigs.forEach(({ description, html }) => {
    it(`${description} should render component as expected type`, async () => {
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

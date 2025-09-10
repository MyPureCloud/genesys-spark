jest.mock('../../../../utils/error/log-error', () => ({
  __esModule: true,
  logWarn: jest.fn()
}));

import { newSpecPage, checkRenders } from '@test/specTestUtils';

import { GuxAvatarGroup } from '../gux-avatar-group';
import { logWarn } from '../../../../utils/error/log-error';
import { GuxAvatarGroupItem } from '../gux-avatar-group-item/gux-avatar-group-item';
import { GuxAvatarGroupAddItem } from '../gux-avatar-group-add-item/gux-avatar-group-add-item';
import { renderConfigs } from './gux-avatar-group.common';

const components = [GuxAvatarGroup, GuxAvatarGroupItem, GuxAvatarGroupAddItem];

describe('gux-avatar-group', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });

  describe('warnings', () => {
    it(`should log warning for group without gux-avatar-group-items`, async () => {
      const html = `<gux-avatar-group-beta></gux-avatar-group-beta>`;
      await newSpecPage({ components, html });
      expect(logWarn).toHaveBeenCalled();
    });
  });
});

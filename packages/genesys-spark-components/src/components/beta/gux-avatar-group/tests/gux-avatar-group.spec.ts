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

    it('should log warning for invalid child elements', async () => {
      const html = `
        <gux-avatar-group-beta>
          <div>Invalid element</div>
        </gux-avatar-group-beta>
      `;
      await newSpecPage({ components, html });
      expect(logWarn).toHaveBeenCalledWith(
        expect.any(Object),
        'gux-avatar-group-beta: Invalid child element detected. All child elements must be either buttons, anchor tags or gux-avatar-beta components'
      );
    });
  });

  describe('overflow functionality', () => {
    it('should render overflow menu when items exceed quantity', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <gux-avatar-group-beta quantity="3">
            <gux-avatar-group-item-beta name="User 1"></gux-avatar-group-item-beta>
            <gux-avatar-group-item-beta name="User 2"></gux-avatar-group-item-beta>
            <gux-avatar-group-item-beta name="User 3"></gux-avatar-group-item-beta>
            <gux-avatar-group-item-beta name="User 4"></gux-avatar-group-item-beta>
            <gux-avatar-group-item-beta name="User 5"></gux-avatar-group-item-beta>
          </gux-avatar-group-beta>
        `
      });

      await page.waitForChanges();

      const overflowMenu = page.root.shadowRoot.querySelector(
        'gux-avatar-overflow-beta'
      );
      expect(overflowMenu).toBeTruthy();
    });

    it('should render add item in overflow when items exceed quantity', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <gux-avatar-group-beta quantity="3">
            <gux-avatar-group-item-beta name="User 1"></gux-avatar-group-item-beta>
            <gux-avatar-group-item-beta name="User 2"></gux-avatar-group-item-beta>
            <gux-avatar-group-item-beta name="User 3"></gux-avatar-group-item-beta>
            <gux-avatar-group-item-beta name="User 4"></gux-avatar-group-item-beta>
            <gux-avatar-group-add-item-beta></gux-avatar-group-add-item-beta>
          </gux-avatar-group-beta>
        `
      });

      await page.waitForChanges();

      const addItemOverflow = page.root.shadowRoot.querySelector(
        '.gux-add-item-overflow'
      );
      expect(addItemOverflow).toBeTruthy();
    });

    it('should not render overflow when items do not exceed quantity', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <gux-avatar-group-beta quantity="5">
            <gux-avatar-group-item-beta name="User 1"></gux-avatar-group-item-beta>
            <gux-avatar-group-item-beta name="User 2"></gux-avatar-group-item-beta>
          </gux-avatar-group-beta>
        `
      });

      await page.waitForChanges();

      const overflowMenu = page.root.shadowRoot.querySelector(
        'gux-avatar-overflow-beta'
      );
      expect(overflowMenu).toBeFalsy();
    });
  });
});

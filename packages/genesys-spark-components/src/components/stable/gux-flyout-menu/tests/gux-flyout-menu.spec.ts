import { newSpecPage } from '@test/specTestUtils';

import { GuxFlyoutMenu } from '../gux-flyout-menu';
import { GuxMenu } from '../gux-menu/gux-menu';
import { GuxSubmenu } from '../gux-menu/gux-submenu/gux-submenu';
import { GuxMenuOption } from '../gux-menu/gux-menu-option/gux-menu-option';
import { renderConfig } from './gux-flyout-menu.common';

const components = [GuxFlyoutMenu, GuxMenu, GuxSubmenu, GuxMenuOption];
const language = 'en';

describe('gux-flyout-menu', () => {
  describe('#render', () => {
    it(renderConfig.description, async () => {
      const page = await newSpecPage({
        components,
        html: renderConfig.html,
        language
      });

      expect(page.rootInstance).toBeInstanceOf(GuxFlyoutMenu);
      expect(page.root).toMatchSnapshot();
    });
  });
});

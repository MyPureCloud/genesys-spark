import {
  checkRenders,
  test,
  expect,
  setContent,
  AxeExclusion,
  E2EPage
} from '@test/playwrightTestUtils';
import { renderConfig } from './gux-flyout-menu.common';

const axeExclusions: AxeExclusion[] = [
  {
    issueId: 'aria-required-children',
    target: '#target-menu',
    exclusionReason:
      'Role menuitem is applied using ElementInternals which AxeTesting does not detect (https://github.com/dequelabs/axe-core/issues/4259). Manually confirmed to work.'
  },
  {
    issueId: 'aria-required-children',
    target:
      '#target-menu > gux-submenu[label="Submenu Two"],.gux-submenu-content[role="menu"]',
    exclusionReason:
      'Role menuitem is applied using ElementInternals which AxeTesting does not detect (https://github.com/dequelabs/axe-core/issues/4259). Manually confirmed to work.'
  }
];

test.describe('gux-flyout-menu', () => {
  test.describe('#render', () => {
    // No element specified here in order to see the menu in the screenshot
    checkRenders({
      renderConfigs: [renderConfig],
      axeExclusions,
      extraActions: async (page: E2EPage) => {
        await page.locator('gux-flyout-menu').hover();
      }
    });
  });

  test.describe('hover', () => {
    test('opens flyout menu', async ({ page }) => {
      await setContent(page, renderConfig.html);

      const element = page.locator('gux-flyout-menu');
      const menuWrapper = element.locator('.gux-flyout-menu-content');

      await expect(menuWrapper).not.toHaveClass(/gux-shown/);

      await element.hover();
      await page.waitForChanges();

      await expect(menuWrapper).toHaveClass(/gux-shown/);
    });

    test('opens submenus', async ({ page }) => {
      await setContent(page, renderConfig.html);

      const element = page.locator('gux-flyout-menu');
      await element.hover();
      await page.waitForChanges();

      const submenu = page.locator('gux-submenu').first();
      const submenuWrapper = submenu.locator('.gux-submenu-wrapper').first();

      await submenu.hover();
      await page.waitForChanges();

      await expect(submenuWrapper).toHaveClass(/gux-shown/);
    });
  });
});

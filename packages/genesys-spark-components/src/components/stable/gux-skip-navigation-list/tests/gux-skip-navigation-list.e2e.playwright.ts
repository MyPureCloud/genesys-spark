import { checkRenders, test, expect } from '@test/playwrightTestUtils';
import { renderConfig } from './gux-skip-navigation-list.common';

test.describe('gux-skip-navigation-list', () => {
  checkRenders({
    renderConfigs: [renderConfig],
    element: 'gux-skip-navigation-list'
  });

  test('should have proper aria-label', async ({ page }) => {
    await page.setContent(renderConfig.html);
    const nav = page.locator('gux-skip-navigation-list nav');
    await expect(nav).toHaveAttribute('aria-label', 'Skip links navigation');
  });

  test('should have listitem role on navigation items', async ({ page }) => {
    await page.setContent(renderConfig.html);
    const items = page.locator('gux-skip-navigation-item');
    await expect(items.first()).toHaveAttribute('role', 'listitem');
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.setContent(renderConfig.html);
    const firstLink = page.locator('gux-skip-navigation-item a').first();
    await firstLink.focus();
    await expect(firstLink).toBeFocused();
  });
});

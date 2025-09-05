import {
  checkRenders,
  expect,
  setContent,
  test
} from '@test/playwrightTestUtils';
import { renderConfig } from './gux-avatar-overflow.common';

test.describe('gux-avatar-overflow-beta', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs: [renderConfig],
      element: 'gux-avatar-group-beta'
    });
  });

  test.describe('interactions', () => {
    test('should open and close menu on button click', async ({ page }) => {
      const html = `
        <gux-avatar-overflow-beta>
          <gux-avatar-overflow-item-beta name="Joe Bloggs"></gux-avatar-overflow-item-beta>
        </gux-avatar-overflow-beta>
      `;
      await setContent(page, html);

      const avatarOverflow = page.locator('gux-avatar-overflow-beta');
      const button = avatarOverflow.locator('button').first();

      await expect(button).toHaveAttribute('aria-expanded', 'false');

      await avatarOverflow.click();
      await expect(button).toHaveAttribute('aria-expanded', 'true');

      await avatarOverflow.click();
      await expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    test('should focus on first item when menu opens', async ({ page }) => {
      const html = `
        <gux-avatar-overflow-beta>
          <gux-avatar-overflow-item-beta name="John Smith"></gux-avatar-overflow-item-beta>
          <gux-avatar-overflow-item-beta name="Tom Smith"></gux-avatar-overflow-item-beta>
          <gux-avatar-overflow-item-beta name="Mary Smith"></gux-avatar-overflow-item-beta>
        </gux-avatar-overflow-beta>
      `;
      await setContent(page, html);

      const avatarOverflow = page.locator('gux-avatar-overflow-beta');

      const activeElementNameBefore = await page.evaluate(() => {
        const activeElement =
          document.activeElement as HTMLGuxAvatarOverflowItemBetaElement;
        return activeElement?.name || '';
      });
      expect(activeElementNameBefore).not.toBe('John Smith');

      await avatarOverflow.click();
      await page.waitForChanges();

      const activeElementNameAfter = await page.evaluate(() => {
        const activeElement =
          document.activeElement as HTMLGuxAvatarOverflowItemBetaElement;
        return activeElement?.name || '';
      });

      expect(activeElementNameAfter).toBe('John Smith');
    });

    test('should handle close on escape key', async ({ page }) => {
      const html = `
        <gux-avatar-overflow-beta>
          <gux-avatar-overflow-item-beta name="John Smith"></gux-avatar-overflow-item-beta>
          <gux-avatar-overflow-item-beta name="Tom Smith"></gux-avatar-overflow-item-beta>
        </gux-avatar-overflow-beta>
      `;
      await setContent(page, html);

      const button = page.locator('gux-avatar-overflow-beta button').first();

      // Open menu
      await button.click();
      await expect(button).toHaveAttribute('aria-haspopup', 'true');
      await expect(button).toHaveAttribute('aria-expanded', 'true');

      // Press Escape to close menu
      await page.keyboard.press('Escape');
      await expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    test('should handle close on tab key', async ({ page }) => {
      const html = `
        <gux-avatar-overflow-beta>
          <gux-avatar-overflow-item-beta name="John Smith"></gux-avatar-overflow-item-beta>
          <gux-avatar-overflow-item-beta name="Tom Smith"></gux-avatar-overflow-item-beta>
        </gux-avatar-overflow-beta>
      `;
      await setContent(page, html);

      const button = page.locator('gux-avatar-overflow-beta button').first();

      // Open menu
      await button.click();
      await expect(button).toHaveAttribute('aria-expanded', 'true');

      // Press Tab to close menu
      await page.keyboard.press('Tab');
      await expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });
});

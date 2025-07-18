import { checkRenders, test, expect } from '@test/playwrightTestUtils';
import { renderConfig } from './gux-avatar-overflow-item.common';

test.describe('gux-avatar-beta-overflow-item-beta', () => {
  checkRenders({
    renderConfigs: [renderConfig],
    element: 'gux-avatar-overflow-item-beta'
  });

  test.describe('#interactions', () => {
    test('should focus on button when focus method is called', async ({
      page
    }) => {
      const html = `
        <div role="menu">
        <gux-avatar-overflow-item-beta name="John Doe">
        </gux-avatar-overflow-item-beta>
        <button></button>
        </div>
      `;
      await page.setContent(html);
      const element = page.locator('gux-avatar-overflow-item-beta');

      // Initially no element should be focused
      await expect(page.locator(':focus')).toHaveCount(0);

      // Call the focus method
      await element.evaluate((el: HTMLGuxAvatarOverflowItemBetaElement) =>
        el.focus()
      );
      await page.waitForChanges();

      // The avatar overflow item should be focused
      await expect(element).toBeFocused();
    });

    test('should handle keyboard navigation', async ({ page }) => {
      const getActiveElementLabel = async (): Promise<string> => {
        return page.evaluate(() => {
          const activeElement =
            document.activeElement?.shadowRoot?.querySelector(
              'button'
            ) as HTMLElement;
          return activeElement?.getAttribute('aria-label') || '';
        });
      };

      const html = `
          <div>
            <gux-avatar-overflow-item-beta name="John Doe">
            </gux-avatar-overflow-item-beta>
            <gux-avatar-overflow-item-beta name="Jane Smith">
            </gux-avatar-overflow-item-beta>
          </div>
        `;
      await page.setContent(html);

      // Focus the first button element inside the shadow root
      const firstButton = page
        .locator('gux-avatar-overflow-item-beta')
        .first()
        .locator('button');
      await firstButton.focus();
      await page.waitForChanges();

      // Test ArrowDown navigation
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();
      expect(await getActiveElementLabel()).toBe('Jane Smith');

      // Test ArrowDown wrapping to first item
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();
      expect(await getActiveElementLabel()).toBe('John Doe');

      // Test ArrowUp navigation
      await page.keyboard.press('ArrowUp');
      await page.waitForChanges();
      expect(await getActiveElementLabel()).toBe('Jane Smith');

      // Test Home key navigation
      await page.keyboard.press('Home');
      await page.waitForChanges();
      expect(await getActiveElementLabel()).toBe('John Doe');

      // Test End key navigation
      await page.keyboard.press('End');
      await page.waitForChanges();
      expect(await getActiveElementLabel()).toBe('Jane Smith');
    });
  });
});

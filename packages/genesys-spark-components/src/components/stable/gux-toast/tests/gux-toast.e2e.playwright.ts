import {
  checkRenders,
  expect,
  setContent,
  test
} from '@test/playwrightTestUtils';
import { renderConfig, renderConfigs } from './gux-toast.common';

test.describe('gux-toast', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-toast'
  });

  test.describe('dismiss', () => {
    test('click dismiss button', async ({ page }) => {
      const html = renderConfig.html;
      await setContent(page, html);
      const toast = page.locator('gux-toast');

      const guxdismissSpy = await page.spyOnEvent('guxdismiss');
      const clickSpy = await page.spyOnEvent('click');

      expect(guxdismissSpy).not.toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      await expect(toast).toBeVisible();

      await page.locator('gux-dismiss-button').locator('button').click();
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      await expect(toast).toHaveCount(0);
    });

    test('click dismiss button and prevent default', async ({ page }) => {
      const html = renderConfig.html;
      await setContent(page, html);
      const toast = page.locator('gux-toast');

      const guxdismissSpy = await page.spyOnEvent('guxdismiss');
      const clickSpy = await page.spyOnEvent('click');

      await page.evaluate(() => {
        document.addEventListener('guxdismiss', event => {
          event.preventDefault();
        });
      });

      expect(guxdismissSpy).not.toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      await expect(toast).toBeVisible();

      await page.locator('gux-dismiss-button').locator('button').click();
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      await expect(toast).toBeVisible();
    });
  });
});

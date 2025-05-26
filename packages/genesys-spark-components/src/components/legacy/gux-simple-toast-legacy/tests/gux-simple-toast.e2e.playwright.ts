import {
  checkRenders,
  expect,
  setContent,
  test
} from '@test/playwrightTestUtils';
import { renderConfig, renderConfigs } from './gux-simple-toast.common';

test.describe('gux-simple-toast-legacy', () => {
  test.describe('#render', () => {
    checkRenders({ renderConfigs, element: 'gux-simple-toast-legacy' });
  });

  test.describe('#interactions', () => {
    test('click dismiss button', async ({ page }) => {
      await setContent(page, renderConfig.html);

      const guxdismissSpy = await page.spyOnEvent('guxdismiss');
      const clickSpy = await page.spyOnEvent('click');

      expect(guxdismissSpy).not.toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      await expect(page.locator('gux-simple-toast-legacy')).toBeVisible();

      await page.locator('gux-dismiss-button').locator('button').click();
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      await expect(page.locator('gux-simple-toast-legacy')).not.toBeVisible();
    });

    test('click dismiss button and prevent default', async ({ page }) => {
      await setContent(page, renderConfig.html);

      const guxdismissSpy = await page.spyOnEvent('guxdismiss');
      const clickSpy = await page.spyOnEvent('click');

      await page.evaluate(() => {
        document.addEventListener('guxdismiss', event => {
          event.preventDefault();
        });
      });

      expect(guxdismissSpy).not.toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      await expect(page.locator('gux-simple-toast-legacy')).toBeVisible();

      await page.locator('gux-dismiss-button').locator('button').click();
      await page.waitForChanges();

      expect(guxdismissSpy).toHaveReceivedEvent();
      expect(clickSpy).not.toHaveReceivedEvent();
      await expect(page.locator('gux-simple-toast-legacy')).toBeVisible();
    });
  });
});

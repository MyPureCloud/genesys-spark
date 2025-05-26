import {
  checkRenders,
  expect,
  setContent,
  test
} from '@test/playwrightTestUtils';
import {
  closedRenderConfig,
  openRenderConfig,
  renderConfigs
} from './gux-disclosure-button.common';

test.describe('gux-disclosure-button-legacy', () => {
  test.describe('#render', () => {
    checkRenders({ renderConfigs, element: 'gux-disclosure-button-legacy' });
  });

  test.describe('#interactions', () => {
    test('should open when clicked', async ({ page }) => {
      await setContent(page, closedRenderConfig.html);

      await expect(page.locator('[slot="panel-content"]')).not.toBeVisible();

      await page.getByTestId('disclosure-button').click();
      await page.waitForChanges();

      await expect(page.locator('[slot="panel-content"]')).toBeVisible();
    });

    test('should close when clicked', async ({ page }) => {
      await setContent(page, openRenderConfig.html);

      await expect(page.locator('[slot="panel-content"]')).toBeVisible();

      await page.getByTestId('disclosure-button').click();
      await page.waitForChanges();

      await expect(page.locator('[slot="panel-content"]')).not.toBeVisible();
    });
  });
});

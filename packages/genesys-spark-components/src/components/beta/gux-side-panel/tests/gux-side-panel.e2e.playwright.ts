import {
  checkRenders,
  setContent,
  test,
  expect
} from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-side-panel.common';

test.describe('gux-side-panel-beta', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-side-panel-beta'
  });

  test.describe('User Interactions', () => {
    test('should fire sidePanelDismiss event when dismiss button is clicked', async ({
      page
    }) => {
      const html = `
        <gux-side-panel-beta>
          <gux-side-panel-heading slot="heading">Test Panel</gux-side-panel-heading>
          <div slot="content">Test content</div>
        </gux-side-panel-beta>
      `;
      await setContent(page, html);
      const dismissSpy = await page.spyOnEvent('sidePanelDismiss');
      const sidePanel = page.locator('gux-side-panel-beta');

      const dismissButton = sidePanel.locator('gux-dismiss-button >> button');
      await dismissButton.click();
      await page.waitForChanges();

      expect(dismissSpy).toHaveLength(1);
    });

    test('should have correct role attribute', async ({ page }) => {
      const html = `
        <gux-side-panel-beta>
          <gux-side-panel-heading slot="heading">Test Panel</gux-side-panel-heading>
          <div slot="content">Test content</div>
        </gux-side-panel-beta>
      `;
      await setContent(page, html);

      const sidePanel = page.locator('gux-side-panel-beta');
      await expect(sidePanel).toHaveAttribute('role', 'complementary');
    });

    test('should apply correct size class', async ({ page }) => {
      const html = `
        <gux-side-panel-beta size="large">
          <gux-side-panel-heading slot="heading">Large Panel</gux-side-panel-heading>
          <div slot="content">Test content</div>
        </gux-side-panel-beta>
      `;
      await setContent(page, html);

      const sidePanel = page.locator('gux-side-panel-beta');
      await expect(sidePanel).toHaveJSProperty('size', 'large');
    });

    test('should render description when slot is provided', async ({
      page
    }) => {
      const html = `
        <gux-side-panel-beta>
          <gux-side-panel-heading slot="heading">Test Panel</gux-side-panel-heading>
          <div slot="description">Test description</div>
          <div slot="content">Test content</div>
        </gux-side-panel-beta>
      `;
      await setContent(page, html);

      const description = page.locator('[slot="description"]');
      await expect(description).toBeVisible();
      await expect(description).toContainText('Test description');
    });

    test('should not render description when slot is not provided', async ({
      page
    }) => {
      const html = `
        <gux-side-panel-beta>
          <gux-side-panel-heading slot="heading">Test Panel</gux-side-panel-heading>
          <div slot="content">Test content</div>
        </gux-side-panel-beta>
      `;
      await setContent(page, html);

      const description = page.locator('[slot="description"]');
      await expect(description).toBeHidden();
    });
  });
});

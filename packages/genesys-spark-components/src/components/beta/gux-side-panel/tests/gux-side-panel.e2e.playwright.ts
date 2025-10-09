import {
  checkRenders,
  setContent,
  test,
  expect
} from '@test/playwrightTestUtils';
import {
  renderConfigs,
  minimalPanel,
  maximumPanel,
  expandablePanel
} from './gux-side-panel.common';

test.describe('gux-side-panel-beta', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-side-panel-beta'
  });

  test.describe('User Interactions', () => {
    test('should fire sidePanelDismiss event when dismiss button is clicked', async ({
      page
    }) => {
      const html = minimalPanel;
      await setContent(page, html);
      const dismissSpy = await page.spyOnEvent('sidePanelDismiss');
      const sidePanel = page.locator('gux-side-panel-beta');
      await page.pause();
      const dismissButton = sidePanel.locator('gux-dismiss-button >> button');
      await dismissButton.click();
      await page.waitForChanges();

      expect(dismissSpy).toHaveLength(1);
    });

    test('should apply correct size class', async ({ page }) => {
      const html = `
        <gux-side-panel-beta size="large">
          <div slot="content">Test content</div>
        </gux-side-panel-beta>
      `;
      await setContent(page, html);
      const sidePanel = page.locator('gux-side-panel-beta');
      await expect(sidePanel).toHaveJSProperty('size', 'large');
    });

    test('should render slots when provided', async ({ page }) => {
      const html = maximumPanel;
      await setContent(page, html);

      const slots = [
        'header',
        'title',
        'icon',
        'description',
        'badge',
        'tabs',
        'footer'
      ];
      for (const slot of slots) {
        const element = page.locator(`[slot="${slot}"]`);
        await expect(element).toBeVisible();
      }
    });

    test('should not render slots when not provided', async ({ page }) => {
      const html = minimalPanel;
      await setContent(page, html);

      const slots = [
        'header',
        'title',
        'icon',
        'description',
        'badge',
        'tabs',
        'footer'
      ];
      for (const slot of slots) {
        const element = page.locator(`[slot="${slot}"]`);
        await expect(element).toBeHidden();
      }
    });
  });

  test('should fire guxexpanded event when expand button is clicked', async ({
    page
  }) => {
    const html = expandablePanel;
    await setContent(page, html);
    const dismissSpy = await page.spyOnEvent('guxexpanded');
    const sidePanel = page.locator('gux-side-panel-beta');
    const header = sidePanel.locator('gux-side-panel-header');
    const expandedButton = header.locator('.gux-expand');
    await expandedButton.click();
    await page.waitForChanges();

    expect(dismissSpy).toHaveLength(1);
  });

  test('should fire guxcollapse event when collapse button is clicked', async ({
    page
  }) => {
    const html = expandablePanel;
    await setContent(page, html);
    const dismissSpy = await page.spyOnEvent('guxcollapsed');
    const sidePanel = page.locator('gux-side-panel-beta');
    const header = sidePanel.locator('gux-side-panel-header');
    const expandedButton = header.locator('.gux-expand');
    await expandedButton.click();
    await page.waitForChanges();

    const collapsedButton = header.locator('.gux-collapse');
    await collapsedButton.click();
    await page.waitForChanges();

    expect(dismissSpy).toHaveLength(1);
  });
});

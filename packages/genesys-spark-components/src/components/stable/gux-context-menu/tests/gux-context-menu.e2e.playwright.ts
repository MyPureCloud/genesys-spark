import {
  checkRenders,
  setContent,
  test,
  expect,
  runAxe
} from '@test/playwrightTestUtils';
import { renderConfig } from './gux-context-menu.common';

test.describe('gux-context-menu', () => {
  checkRenders({
    renderConfigs: [renderConfig],
    element: 'gux-context-menu'
  });

  test('should be a11y compliant when opened', async ({ page }) => {
    await setContent(page, renderConfig.html);
    const element = page.locator('gux-context-menu');

    await element.click();
    await page.waitForChanges();

    // Check accessibility after opening context menu
    const axeResultsAfter = await runAxe(page);
    expect(axeResultsAfter.violations).toHaveNoViolations({
      axeExclusions: [],
      axeScanContext: 'after opening context menu'
    });
  });

  test('should focus first item in list on click', async ({ page }) => {
    await setContent(page, renderConfig.html);
    const element = page.locator('gux-context-menu');
    const expectedElementWithFocus = page.locator(
      'gux-list-item:first-of-type'
    );
    const guxList = page.locator('gux-list');

    await element.click();
    await page.waitForChanges();
    const actualElementWithFocus = page.locator(':focus').first();

    await expect(guxList).toBeVisible();
    await expect(actualElementWithFocus).toHaveAttribute(
      'id',
      await expectedElementWithFocus.getAttribute('id')
    );
  });

  test('should focus last item in list on ArrowUp keypress', async ({
    page
  }) => {
    await setContent(page, renderConfig.html);
    const button = page.locator('gux-button-slot button');
    const expectedElementWithFocus = page.locator('gux-list-item:last-of-type');
    const guxList = page.locator('gux-list');

    await button.press('ArrowUp');
    await page.waitForChanges();

    const actualElementWithFocus = page.locator(':focus').first();

    await expect(guxList).toBeVisible();

    await expect(actualElementWithFocus).toHaveAttribute(
      'id',
      await expectedElementWithFocus.getAttribute('id')
    );
  });

  ['Enter', 'ArrowDown', ' '].forEach(key => {
    test(`should open menu and focus first item in list on keypress: ${key}`, async ({
      page
    }) => {
      await setContent(page, renderConfig.html);
      const button = page.locator('gux-button-slot button');
      const expectedElementWithFocus = page.locator(
        'gux-list-item:first-of-type'
      );
      const guxList = page.locator('gux-list');

      await button.press(key);
      await page.waitForChanges();

      const actualElementWithFocus = page.locator(':focus').first();
      await expect(guxList).toBeVisible();

      await expect(actualElementWithFocus).toHaveAttribute(
        'id',
        await expectedElementWithFocus.getAttribute('id')
      );
    });
  });

  test('should close menu and move focus to button on Escape', async ({
    page
  }) => {
    await setContent(page, renderConfig.html);
    const contextMenu = page.locator('gux-context-menu');
    const guxList = page.locator('gux-list');

    await contextMenu.click();
    await page.waitForChanges();

    await expect(guxList).toBeVisible();

    await guxList.press('Escape');
    await page.waitForChanges();

    const actualElementWithFocus = page.locator(':focus').first();
    const focusedElementTagName = await actualElementWithFocus.evaluate(
      el => el.tagName
    );

    await expect(guxList).toBeHidden();
    expect(focusedElementTagName).toEqual('GUX-CONTEXT-MENU');
  });

  test('should close menu on Tab keypress', async ({ page }) => {
    await setContent(page, renderConfig.html);
    const element = page.locator('gux-context-menu');
    const guxList = page.locator('gux-list');

    await element.click();
    await page.waitForChanges();

    await expect(guxList).toBeVisible();

    await element.press('Tab');
    await page.waitForChanges();

    await expect(guxList).toBeHidden();
  });
});

import {
  checkRenders,
  setContent,
  test,
  expect
} from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-tag.common';

test.describe('gux-tag', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-tag'
  });

  test.describe('User Interactions', () => {
    test('should fire guxdelete event when remove button is clicked', async ({
      page
    }) => {
      const html =
        '<gux-tag removable><span slot="content">Removable Tag</span></gux-tag>';
      await setContent(page, html);
      const deleteSpy = await page.spyOnEvent('guxdelete');

      const removeButton = page.locator('.gux-tag-remove-button');
      await removeButton.click();
      await page.waitForChanges();

      expect(deleteSpy).toHaveLength(1);
    });

    test('should not fire guxdelete event when disabled tag remove button is clicked', async ({
      page
    }) => {
      const html =
        '<gux-tag removable disabled><span slot="content">Disabled Removable Tag</span></gux-tag>';
      await setContent(page, html);
      const deleteSpy = await page.spyOnEvent('guxdelete');

      const removeButton = page.locator('.gux-tag-remove-button');
      // eslint-disable-next-line playwright/no-force-option
      await removeButton.click({ force: true });
      await page.waitForChanges();

      expect(deleteSpy).toHaveLength(0);
    });

    test('should have correct aria-disabled attribute when disabled', async ({
      page
    }) => {
      const html =
        '<gux-tag disabled><span slot="content">Disabled Tag</span></gux-tag>';
      await setContent(page, html);

      const tagContainer = page.locator('.gux-tag');
      await expect(tagContainer).toHaveAttribute('aria-disabled', 'true');
    });

    test('should have correct aria-disabled attribute when not disabled', async ({
      page
    }) => {
      const html = '<gux-tag><span slot="content">Normal Tag</span></gux-tag>';
      await setContent(page, html);

      const tagContainer = page.locator('.gux-tag');
      await expect(tagContainer).toHaveAttribute('aria-disabled', 'false');
    });

    test('should render remove button when removable', async ({ page }) => {
      const html =
        '<gux-tag removable><span slot="content">Removable Tag</span></gux-tag>';
      await setContent(page, html);

      const removeButton = page.locator('.gux-tag-remove-button');
      await expect(removeButton).toBeVisible();
    });

    test('should not render remove button when not removable', async ({
      page
    }) => {
      const html =
        '<gux-tag><span slot="content">Non-removable Tag</span></gux-tag>';
      await setContent(page, html);

      const removeButton = page.locator('.gux-tag-remove-button');
      await expect(removeButton).toBeHidden();
    });
  });
});

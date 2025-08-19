import {
  checkRenders,
  setContent,
  test,
  expect
} from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-pagination.common';

test.describe('gux-pagination', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-pagination'
  });

  test.describe('User Interactions', () => {
    test('should update current page property when page changes', async ({
      page
    }) => {
      const html =
        '<gux-pagination current-page="1" total-items="100"></gux-pagination>';
      await setContent(page, html);

      const pagination = page.locator('gux-pagination');
      await expect(pagination).toHaveJSProperty('currentPage', 1);

      const nextButton = page.locator(
        'gux-pagination-buttons button[title="Next page"]'
      );
      await nextButton.click();
      await page.waitForChanges();

      await expect(pagination).toHaveJSProperty('currentPage', 2);
    });

    test('should not fire events when disabled', async ({ page }) => {
      const html =
        '<gux-pagination disabled total-items="100"></gux-pagination>';
      await setContent(page, html);
      const changeSpy = await page.spyOnEvent('guxpaginationchange');

      const nextButton = page.locator(
        'gux-pagination-buttons button[title="Next page"]'
      );
      // eslint-disable-next-line playwright/no-force-option
      await nextButton.click({ force: true });
      await page.waitForChanges();

      expect(changeSpy).toHaveLength(0);
    });

    test('should display correct item counts', async ({ page }) => {
      const html =
        '<gux-pagination current-page="2" items-per-page="25" total-items="100"></gux-pagination>';
      await setContent(page, html);

      const itemCounts = page.locator('gux-pagination-item-counts');
      await expect(itemCounts).toContainText('26 - 50 of 100');
    });

    test('should not show items per page dropdown in simple layout', async ({
      page
    }) => {
      const html =
        '<gux-pagination layout="simple" total-items="100"></gux-pagination>';
      await setContent(page, html);

      const itemsPerPage = page.locator('gux-pagination-items-per-page');
      await expect(itemsPerPage).toBeHidden();
    });

    test('should handle single page scenario correctly', async ({ page }) => {
      const html =
        '<gux-pagination total-items="10" items-per-page="25"></gux-pagination>';
      await setContent(page, html);

      const prevButton = page.locator(
        'gux-pagination-buttons button[title="Previous page"]'
      );
      const nextButton = page.locator(
        'gux-pagination-buttons button[title="Next page"]'
      );

      await expect(prevButton).toBeDisabled();
      await expect(nextButton).toBeDisabled();
    });
  });
});

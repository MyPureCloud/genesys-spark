import { checkRenders, test, expect } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-month-picker.common';

test.describe('gux-month-picker-beta', () => {
  checkRenders({
    renderConfigs: renderConfigs,
    element: 'gux-month-picker-beta'
  });

  test.describe('gux-month-calendar year navigation', () => {
    test.beforeEach(async ({ page }) => {
      await page.setContent(
        '<gux-month-calendar value="2023-06"></gux-month-calendar>'
      );
      await expect(page.locator('[data-testid="year-label"]')).toBeVisible();
    });

    test('should increment year when clicking next year button', async ({
      page
    }) => {
      const yearLabel = page.locator('[data-testid="year-label"]');
      const nextYearBtn = page.locator('.gux-year-change').last();

      await expect(yearLabel).toHaveText('2023');
      await nextYearBtn.click();
      await expect(yearLabel).toHaveText('2024');
    });

    test('should decrement year when clicking previous year button', async ({
      page
    }) => {
      const yearLabel = page.locator('[data-testid="year-label"]');
      const prevYearBtn = page.locator('.gux-year-change').first();

      await expect(yearLabel).toHaveText('2023');
      await prevYearBtn.click();
      await expect(yearLabel).toHaveText('2022');
    });

    test('should handle multiple year changes', async ({ page }) => {
      const yearLabel = page.locator('[data-testid="year-label"]');
      const nextYearBtn = page.locator('.gux-year-change').last();
      const prevYearBtn = page.locator('.gux-year-change').first();

      await nextYearBtn.click();
      await nextYearBtn.click();
      await expect(yearLabel).toHaveText('2025');

      await prevYearBtn.click();
      await expect(yearLabel).toHaveText('2024');
    });
  });
});

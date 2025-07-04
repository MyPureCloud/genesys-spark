import { checkRenders, test, expect } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-month-picker.common';

test.describe('gux-month-picker-beta', () => {
  checkRenders({
    renderConfigs: renderConfigs,
    element: 'gux-month-picker-beta'
  });

  test.describe('gux-month-calendar year navigation', () => {
    test('should update year label when clicking year change buttons', async ({
      page
    }) => {
      await page.setContent(
        '<gux-month-calendar value="2023-06"></gux-month-calendar>'
      );

      let yearLabel = await page
        .locator('gux-month-calendar')
        .locator('[data-testid="year-label"]')
        .textContent();
      expect(yearLabel).toContain('2023');

      await page.locator('gux-month-calendar .gux-year-change').last().click();

      yearLabel = await page
        .locator('gux-month-calendar')
        .locator('[data-testid="year-label"]')
        .textContent();
      expect(yearLabel).toContain('2024');

      await page.locator('gux-month-calendar .gux-year-change').first().click();
      await page.locator('gux-month-calendar .gux-year-change').first().click();

      yearLabel = await page
        .locator('gux-month-calendar')
        .locator('[data-testid="year-label"]')
        .textContent();
      expect(yearLabel).toContain('2022');
    });
  });
});

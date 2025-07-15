import {
  checkRenders,
  expect,
  setContent,
  AxeExclusion,
  test
} from '@test/playwrightTestUtils';
import { renderConfig } from './gux-time-zone-picker.common';

test.describe('gux-time-zone-picker-beta', () => {
  const axeExclusions: AxeExclusion[] = [
    {
      issueId: 'target-size',
      target: 'gux-time-zone-picker-beta,gux-dropdown,button',
      exclusionReason:
        'COMUI-2944 Fix any of the following: Target has insufficient size (20px by 18px, should be at least 24px by 24px); Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 20px instead of at least 24px.'
    }
  ];

  checkRenders({
    renderConfigs: [renderConfig],
    element: 'gux-time-zone-picker-beta',
    axeExclusions
  });

  async function clickDropdownButton(page): Promise<void> {
    // eslint-disable-next-line playwright/no-force-option
    await page.locator('.gux-field').click({ force: true }); // https://github.com/microsoft/playwright/issues/13576
  }

  test('filters the list', async ({ page }) => {
    const html = '<gux-time-zone-picker-beta></gux-time-zone-picker-beta>';
    await setContent(page, html);

    await clickDropdownButton(page);

    await expect(
      page.locator('gux-dropdown gux-listbox gux-option:not(.gux-filtered)')
    ).toHaveCount(585);

    await page.keyboard.press('a');
    await page.keyboard.press('d');
    await page.keyboard.press('a');
    await page.keyboard.press('k');

    await expect(
      page.locator('gux-dropdown gux-listbox gux-option:not(.gux-filtered)')
    ).toHaveCount(1);
  });

  test('includes generic zones', async ({ page }) => {
    const html = '<gux-time-zone-picker-beta></gux-time-zone-picker-beta>';
    await setContent(page, html);

    await clickDropdownButton(page);
    let visibleItems = page.locator(
      'gux-dropdown gux-listbox gux-option:not(.gux-filtered)'
    );
    await expect(visibleItems).toHaveCount(585);

    await page.keyboard.type('e');
    await page.keyboard.type('t');
    await page.keyboard.type('c');
    await page.keyboard.type('/');

    visibleItems = page.locator(
      'gux-dropdown gux-listbox gux-option:not(.gux-filtered)'
    );

    await expect(visibleItems).toHaveCount(29);

    await expect(visibleItems.first()).toContainText('Etc/GMT (UTC+00:00)');
  });
});

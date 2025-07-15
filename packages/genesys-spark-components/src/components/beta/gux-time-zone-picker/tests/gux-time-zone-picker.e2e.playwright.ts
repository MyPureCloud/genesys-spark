import {
  checkRenders,
  expect,
  E2EPage,
  AxeExclusion,
  test
} from '@test/playwrightTestUtils';

test.describe('gux-time-zone-picker', () => {
  const html = `<gux-time-zone-picker-beta></gux-time-zone-picker-beta>`;

  const axeExclusions: AxeExclusion[] = [
    {
      issueId: 'target-size',
      target: 'gux-time-zone-picker-beta,gux-dropdown,button',
      exclusionReason:
        'COMUI-2944 Fix any of the following: Target has insufficient size (20px by 18px, should be at least 24px by 24px); Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 20px instead of at least 24px.'
    }
  ];

  checkRenders({
    renderConfigs: [{ html: html }],
    element: 'gux-time-zone-picker',
    axeExclusions
  });

  async function unfilteredOptions(page: E2EPage) {
    const element = page.getByTestId('dropdown');

    return element.locator('gux-listbox gux-option:not(.gux-filtered)');
  }

  async function clickDropdownButton(page: E2EPage): Promise<void> {
    // eslint-disable-next-line playwright/no-force-option
    await page.getByTestId('dropdown-button').click({ force: true }); // https://github.com/microsoft/playwright/issues/13576
  }

  test('filters the list', async ({ page }) => {
    await clickDropdownButton(page);
    let visibleItems = await unfilteredOptions(page);
    expect(visibleItems.all.length).toBe(585);

    await page.keyboard.press('a');
    await page.keyboard.press('d');
    await page.keyboard.press('a');
    await page.keyboard.press('k');

    await page.waitForChanges();
    visibleItems = await unfilteredOptions(page);

    expect(visibleItems.all.length).toBe(1);
  });

  test('includes generic zones', async ({ page }) => {
    await clickDropdownButton(page);
    let visibleItems = await unfilteredOptions(page);
    expect(visibleItems.all.length).toBe(585);

    await page.keyboard.press('e');
    await page.keyboard.press('t');
    await page.keyboard.press('c');
    await page.keyboard.press('/');

    await page.waitForChanges();
    visibleItems = await unfilteredOptions(page);

    expect(visibleItems.all.length).toBe(29);

    expect(visibleItems[0].textContent).toBe('Etc/GMT (UTC+00:00)');
  });
});

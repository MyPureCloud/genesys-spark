import {
  checkRenders,
  setContent,
  test,
  expect,
  AxeExclusion
} from '@test/playwrightTestUtils';

const axeExclusions: AxeExclusion[] = [
  {
    issueId: 'target-size',
    target: 'gux-datepicker,.gux-calendar-toggle-button',
    exclusionReason:
      'COMUI-2946 Fix any of the following: Target has insufficient size (16px by 18px, should be at least 24px by 24px); Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 16px instead of at least 24px.'
  },
  {
    issueId: 'target-size',
    target:
      'gux-datepicker,.gux-datepicker-field:nth-child(1) > .gux-datepicker-field-input > .gux-datepicker-field-text-input > .gux-calendar-toggle-button[aria-label="Toggle calendar view"]',
    exclusionReason:
      'COMUI-2946 Fix any of the following: Target has insufficient size (16px by 18px, should be at least 24px by 24px); Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 16px instead of at least 24px.'
  },
  {
    issueId: 'target-size',
    target:
      'gux-datepicker,.gux-datepicker-field:nth-child(2) > .gux-datepicker-field-input > .gux-datepicker-field-text-input > .gux-calendar-toggle-button[aria-label="Toggle calendar view"]',
    exclusionReason:
      'COMUI-2946 Fix any of the following: Target has insufficient size (16px by 18px, should be at least 24px by 24px); Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 16px instead of at least 24px.'
  }
];

const renderConfigs = [
  {
    description: 'should render basic datepicker',
    html: '<gux-datepicker lang="en" value="2025-07-31"></gux-datepicker>'
  },
  {
    description: 'renders a datepicker for range of dates',
    html: `<gux-datepicker
      mode="range"
      value="2019-11-25/2019-12-02"
      number-of-months="2"
    ></gux-datepicker>`
  }
];

test.describe('gux-datepicker', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-datepicker',
    axeExclusions
  });

  test("updates the text input state when the datepicker's value property is set", async ({
    page
  }) => {
    const html = '<gux-datepicker lang="en"></gux-datepicker>';
    await setContent(page, html);

    const element = page.locator('gux-datepicker');

    // Set the value property
    await element.evaluate((element: HTMLGuxDatepickerElement) => {
      element.value = '1985-12-01';
    });

    const input = page.locator('input');
    await expect(input).toHaveValue('12/01/1985');
  });

  test('opens the calendar when the input is clicked', async ({ page }) => {
    const html = '<gux-datepicker lang="en"></gux-datepicker>';
    await setContent(page, html);

    const input = page.locator('input');

    await input.click();

    const datepickerContainer = page.locator('.gux-datepicker');
    await expect(datepickerContainer).toHaveClass(/gux-active/);
  });

  test('opens and closes the calendar when the button is clicked', async ({
    page
  }) => {
    const html = '<gux-datepicker lang="en"></gux-datepicker>';
    await setContent(page, html);

    const input = page.locator('input');

    // First open the calendar
    await input.click();

    const datepickerContainer = page.locator('.gux-datepicker');
    await expect(datepickerContainer).toHaveClass(/gux-active/);

    // Then close it
    const button = page.locator('.gux-calendar-toggle-button');
    await button.click();

    await expect(datepickerContainer).not.toHaveClass(/gux-active/);
  });

  test('should not open the calendar when the input or button is clicked when disabled', async ({
    page
  }) => {
    const html = '<gux-datepicker lang="en" disabled></gux-datepicker>';
    await setContent(page, html);

    const datepickerContainer = page.locator('.gux-datepicker');
    const input = page.locator('input');

    await expect(input).toBeDisabled();

    // eslint-disable-next-line playwright/no-force-option
    await input.click({ force: true });
    await expect(datepickerContainer).not.toHaveClass(/gux-active/);

    const button = page.locator('.gux-calendar-toggle-button');

    // eslint-disable-next-line playwright/no-force-option
    await button.click({ force: true });
    await expect(datepickerContainer).not.toHaveClass(/gux-active/);
  });

  test('provides the correct label in single date mode', async ({ page }) => {
    const html = '<gux-datepicker lang="en"></gux-datepicker>';
    await setContent(page, html);

    const labels = page.locator('.gux-datepicker-field-label');
    await expect(labels).toHaveCount(1);

    const firstLabel = labels.first();
    await expect(firstLabel).toHaveText('Date');
    await expect(firstLabel).toHaveClass(/gux-sr-only/);

    const element = page.locator('gux-datepicker');
    await element.evaluate((element: HTMLGuxDatepickerElement) => {
      element.label = 'test';
    });
    await page.waitForChanges();

    await expect(firstLabel).toHaveText('test');
    await expect(firstLabel).not.toHaveClass(/gux-sr-only/);
  });

  test('provides the correct labels in date range mode', async ({ page }) => {
    const html = `<gux-datepicker
          mode="range"
          value="2019-11-25/2019-12-02"
          number-of-months="2"
        ></gux-datepicker>`;
    await setContent(page, html);

    await page.waitForChanges();

    const labels = page.locator('.gux-datepicker-field-label');
    await expect(labels).toHaveCount(2);

    const firstLabel = labels.first();
    const secondLabel = labels.nth(1);

    await expect(firstLabel).toHaveText('Start');
    await expect(firstLabel).not.toHaveClass(/gux-sr-only/);
    await expect(secondLabel).toHaveText('End');
  });
});

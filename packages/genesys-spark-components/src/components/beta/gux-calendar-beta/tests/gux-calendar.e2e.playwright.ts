/* eslint-disable playwright/expect-expect */
import { test, expect, setContent } from '@test/playwrightTestUtils';
import {
  validateHeaderMonth,
  goToNextMonth,
  goToPreviousMonth,
  validateSelectedDate,
  findDayElement,
  findSelectedDayElement,
  validateFocusedDay
} from './tests.service.playwright';

test.describe('gux-calendar-beta', () => {
  const MIN_DATE = '2023-04-15';
  const MAX_DATE = '2023-06-20';
  const defaultHtml = `
    <gux-calendar-beta>
      <input type="date" value="2023-05-19" min="${MIN_DATE}" max="${MAX_DATE}" />
    </gux-calendar-beta>
    `;

  test('renders', async ({ page }) => {
    await setContent(page, defaultHtml);
    const element = page.locator('gux-calendar-beta');
    await expect(element).toBeVisible();
  });

  test.describe('header', () => {
    test('calendar increments by one month after clicking the right arrow button', async ({
      page
    }) => {
      await setContent(page, defaultHtml);

      // Validate that the current month before clicking the right arrow is May, 2023
      await validateHeaderMonth(page, 'May 2023');

      await goToNextMonth(page);

      // Validate that the new month after clicking the right arrow is June, 2023
      await validateHeaderMonth(page, 'June 2023');
    });

    test('calendar decrements by one month after clicking the left arrow button', async ({
      page
    }) => {
      await setContent(page, defaultHtml);

      // Validate that the current month before clicking the left arrow is May, 2023
      await validateHeaderMonth(page, 'May 2023');

      await goToPreviousMonth(page);

      // Validate that the new month after clicking the left arrow is April, 2023
      await validateHeaderMonth(page, 'April 2023');
    });
  });

  test.describe('content', () => {
    test('selected date on page load is correct', async ({ page }) => {
      await setContent(page, defaultHtml);

      // Validate that the selected date on page load is May 19, 2023
      await validateSelectedDate(page, '2023-05-19');
    });

    test('clicking on a date in the current month causes the date to be selected', async ({
      page
    }) => {
      await setContent(page, defaultHtml);

      // Find May 10, 2023 in the calendar and click it so that it will be selected
      const contentDate = await findDayElement(page, '2023-05-10');
      await contentDate.click();
      await page.waitForChanges();

      // Validate that clicking on May 10, 2023 causes it to be selected
      await validateSelectedDate(page, '2023-05-10');
    });

    test('clicking on a date in the next month causes the date to be selected', async ({
      page
    }) => {
      await setContent(page, defaultHtml);

      // Find June 1, 2023 in the calendar and click it so that it will be selected
      const contentDate = await findDayElement(page, '2023-06-01');
      await contentDate.click();
      await page.waitForChanges();

      // Validate that clicking on June 1, 2023 causes it to be selected
      await validateSelectedDate(page, '2023-06-01');
    });

    test('clicking on a date in the previous month causes the date to be selected', async ({
      page
    }) => {
      await setContent(page, defaultHtml);

      // Find April 30, 2023 in the calendar and click it so that it will be selected
      const contentDate = await findDayElement(page, '2023-04-30');
      await contentDate.click();
      await page.waitForChanges();

      // Validate that clicking on April 30, 2023 causes it to be selected
      await validateSelectedDate(page, '2023-04-30');
    });

    test.describe('keyboard navigation', () => {
      test('pressing the down arrow key causes the focused date to increment by 1 week', async ({
        page
      }) => {
        await setContent(page, defaultHtml);

        // First click the selected date to get focus on the calendar
        const selectedDate = await findSelectedDayElement(page);
        await selectedDate.click();

        await page.keyboard.press('ArrowDown');
        await page.waitForChanges();

        await validateFocusedDay(page, '2023-05-26');
      });

      test('pressing the up arrow key causes the focused date to decrement by 1 week', async ({
        page
      }) => {
        await setContent(page, defaultHtml);

        // First click the selected date to get focus on the calendar
        const selectedDate = await findSelectedDayElement(page);
        await selectedDate.click();

        await page.keyboard.press('ArrowUp');
        await page.waitForChanges();

        await validateFocusedDay(page, '2023-05-12');
      });

      test('pressing the right arrow key causes the focused date to increment by 1 day', async ({
        page
      }) => {
        await setContent(page, defaultHtml);

        // First click the selected date to get focus on the calendar
        const selectedDate = await findSelectedDayElement(page);
        await selectedDate.click();

        await page.keyboard.press('ArrowRight');
        await page.waitForChanges();

        await validateFocusedDay(page, '2023-05-20');
      });

      test('pressing the left arrow key causes the focused date to decrement by 1 day', async ({
        page
      }) => {
        await setContent(page, defaultHtml);

        // First click the selected date to get focus on the calendar
        const selectedDate = await findSelectedDayElement(page);
        await selectedDate.click();

        await page.keyboard.press('ArrowLeft');
        await page.waitForChanges();

        await validateFocusedDay(page, '2023-05-18');
      });

      test('pressing the page down key causes the focused day to decrement by 1 month', async ({
        page
      }) => {
        await setContent(page, defaultHtml);

        // First click the selected date to get focus on the calendar
        const selectedDate = await findSelectedDayElement(page);
        await selectedDate.click();

        await page.keyboard.press('PageDown');
        await page.waitForChanges();

        await validateHeaderMonth(page, 'April 2023');
        await validateFocusedDay(page, '2023-04-19');
      });

      test('pressing the page up key causes the focused day to increment by 1 month', async ({
        page
      }) => {
        await setContent(page, defaultHtml);

        // First click the selected date to get focus on the calendar
        const selectedDate = await findSelectedDayElement(page);
        await selectedDate.click();

        await page.keyboard.press('PageUp');
        await page.waitForChanges();

        await validateFocusedDay(page, '2023-06-19');
      });

      test("won't go below the minimum date", async ({ page }) => {
        await setContent(page, defaultHtml);

        // First click the selected date to get focus on the calendar
        const selectedDate = await findSelectedDayElement(page);
        await selectedDate.click();

        await page.keyboard.press('PageDown');
        await page.waitForChanges();
        await page.keyboard.press('PageDown');
        await page.waitForChanges();

        await validateFocusedDay(page, MIN_DATE);
      });

      test("won't go above the maximum date", async ({ page }) => {
        await setContent(page, defaultHtml);

        // First click the selected date to get focus on the calendar
        const selectedDate = await findSelectedDayElement(page);
        await selectedDate.click();

        await page.keyboard.press('PageUp');
        await page.waitForChanges();
        await page.keyboard.press('PageUp');
        await page.waitForChanges();

        await validateFocusedDay(page, MAX_DATE);
      });
    });

    test('setting max prop causes an upper bound range to be implemented correctly', async ({
      page
    }) => {
      await setContent(page, defaultHtml);
      const input = page.locator('input');

      // Go to next month
      await goToNextMonth(page);

      const contentDate = await findDayElement(page, '2023-06-30');
      await contentDate.click();
      await expect(input).not.toHaveValue('2023-06-30');
    });

    test('setting min prop causes a lower bound range to be implemented correctly', async ({
      page
    }) => {
      await setContent(page, defaultHtml);
      const input = page.locator('input');

      await goToPreviousMonth(page);

      const contentDate = await findDayElement(page, '2023-04-01');
      await contentDate.click();
      await expect(input).not.toHaveValue('2023-04-01');
    });

    test('tab index is set to 0 for selected date and -1 for non-selected date', async ({
      page
    }) => {
      await setContent(page, defaultHtml);

      const selectedFocusTarget = page
        .locator('gux-day-beta[aria-current="true"]')
        .first();
      const nonSelectedFocusTarget = page
        .locator('gux-day-beta:not([aria-current="true"])')
        .first();

      await expect(selectedFocusTarget).toHaveAttribute('tabindex', '0');
      await expect(nonSelectedFocusTarget).toHaveAttribute('tabindex', '-1');
    });
  });
});

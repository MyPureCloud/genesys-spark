import { newSparkE2EPage } from '../../../../test/e2eTestUtils';
import {
  goToPreviousMonth,
  goToNextMonth,
  validateHeaderMonth,
  validateSelectedDate,
  findDayElement,
  findSelectedDayElement,
  validateFocusedDay
} from '../services/tests.service';

describe('gux-calendar', () => {
  const MIN_DATE = '2023-04-15';
  const MAX_DATE = '2023-06-20';
  const defaultHtml = `
    <gux-calendar-beta>
      <input type="date" value="2023-05-19" min="${MIN_DATE}" max="${MAX_DATE}" />
    </gux-calendar-beta>
    `;

  it('renders', async () => {
    const page = await newSparkE2EPage({
      html: defaultHtml
    });
    const element = await page.find('gux-calendar-beta');
    expect(element).toHaveAttribute('hydrated');
  });

  describe('header', () => {
    it('calendar increments by one month after clicking the right arrow button', async () => {
      const page = await newSparkE2EPage({
        html: defaultHtml
      });
      const element = await page.find('gux-calendar-beta');

      // Validate that the current month before clicking the right arrow is May, 2023
      await validateHeaderMonth(element, 'May 2023');

      await goToNextMonth(element, page);

      // Validate that the new month after clicking the right arrow is June, 2023
      await validateHeaderMonth(element, 'June 2023');
    });

    it('calendar decrements by one month after clicking the left arrow button', async () => {
      const page = await newSparkE2EPage({
        html: defaultHtml
      });
      const element = await page.find('gux-calendar-beta');

      // Validate that the current month before clicking the left arrow is May, 2023
      await validateHeaderMonth(element, 'May 2023');

      await goToPreviousMonth(element, page);

      // Validate that the new month after clicking the left arrow  is April, 2023
      await validateHeaderMonth(element, 'April 2023');
    });
  });

  describe('content', () => {
    it('selected date on page load is correct', async () => {
      const page = await newSparkE2EPage({
        html: defaultHtml
      });
      const element = await page.find('gux-calendar-beta');

      // Validate that the selected date on page load is May 19, 2023
      await validateSelectedDate(element, '2023-05-19');
    });

    it('clicking on a date in the current month causes the date to be selected', async () => {
      const page = await newSparkE2EPage({
        html: defaultHtml
      });

      // Find May 10, 2023 in the calendar and click it so that it will be selected
      const element = await page.find('gux-calendar-beta');
      const contentDate = await findDayElement(element, '2023-05-10');
      await contentDate.click();
      await page.waitForChanges();

      // Validate that clicking on May 10, 2023 causes it to be selected
      await validateSelectedDate(element, '2023-05-10');
    });

    it('clicking on a date in the next month causes the date to be selected', async () => {
      const page = await newSparkE2EPage({
        html: defaultHtml
      });

      // Find June 1, 2023 in the calendar and click it so that it will be selected
      const element = await page.find('gux-calendar-beta');
      const contentDate = await findDayElement(element, '2023-06-01');
      await contentDate.click();
      await page.waitForChanges();

      // Validate that clicking on June 1, 2023 causes it to be selected
      await validateSelectedDate(element, '2023-06-01');
    });

    it('clicking on a date in the previous month causes the date to be selected', async () => {
      const page = await newSparkE2EPage({
        html: defaultHtml
      });

      // Find April 30, 2023 in the calendar and click it so that it will be selected
      const element = await page.find('gux-calendar-beta');
      const contentDate = await findDayElement(element, '2023-04-30');
      await contentDate.click();
      await page.waitForChanges();

      // Validate that clicking on April 30, 2023 causes it to be selected
      await validateSelectedDate(element, '2023-04-30');
    });

    describe('keyboard navigation', () => {
      it('pressing the down arrow key causes the focused date to increment by 1 week', async () => {
        const page = await newSparkE2EPage({
          html: defaultHtml
        });
        const element = await page.find('gux-calendar-beta');

        // First click the selected date to get focus on the calendar
        const selectedDate = await findSelectedDayElement(element);
        await selectedDate.click();

        await page.keyboard.press('ArrowDown');
        await page.waitForChanges();

        await validateFocusedDay(element, '2023-05-26');
      });

      it('pressing the up arrow key causes the focused date to decrement by 1 week', async () => {
        const page = await newSparkE2EPage({
          html: defaultHtml
        });
        const element = await page.find('gux-calendar-beta');

        // First click the selected date to get focus on the calendar
        const selectedDate = await findSelectedDayElement(element);
        await selectedDate.click();

        await page.keyboard.press('ArrowUp');
        await page.waitForChanges();

        await validateFocusedDay(element, '2023-05-12');
      });

      it('pressing the right arrow key causes the focused date to increment by 1 day', async () => {
        const page = await newSparkE2EPage({
          html: defaultHtml
        });
        const element = await page.find('gux-calendar-beta');

        // First click the selected date to get focus on the calendar
        const selectedDate = await findSelectedDayElement(element);
        await selectedDate.click();

        await page.keyboard.press('ArrowRight');
        await page.waitForChanges();

        await validateFocusedDay(element, '2023-05-20');
      });

      it('pressing the left arrow key causes the focused date to decrement by 1 day', async () => {
        const page = await newSparkE2EPage({
          html: defaultHtml
        });
        const element = await page.find('gux-calendar-beta');

        // First click the selected date to get focus on the calendar
        const selectedDate = await findSelectedDayElement(element);
        await selectedDate.click();

        await page.keyboard.press('ArrowLeft');
        await page.waitForChanges();

        await validateFocusedDay(element, '2023-05-18');
      });

      it('pressing the page down key causes the focused day to decrement by 1 month', async () => {
        const page = await newSparkE2EPage({
          html: defaultHtml
        });
        const element = await page.find('gux-calendar-beta');

        // First click the selected date to get focus on the calendar
        const selectedDate = await findSelectedDayElement(element);
        await selectedDate.click();

        await page.keyboard.press('PageDown');
        await page.waitForChanges();

        await validateHeaderMonth(element, 'April 2023');
        await validateFocusedDay(element, '2023-04-19');
      });

      it('pressing the page up key causes the focused day to increment by 1 month', async () => {
        const page = await newSparkE2EPage({
          html: defaultHtml
        });
        const element = await page.find('gux-calendar-beta');

        // First click the selected date to get focus on the calendar
        const selectedDate = await findSelectedDayElement(element);
        await selectedDate.click();

        await page.keyboard.press('PageUp');
        await page.waitForChanges();

        await validateFocusedDay(element, '2023-06-19');
      });

      it("won't go below the minimum date", async () => {
        const page = await newSparkE2EPage({
          html: defaultHtml
        });
        const element = await page.find('gux-calendar-beta');

        // First click the selected date to get focus on the calendar
        const selectedDate = await findSelectedDayElement(element);
        await selectedDate.click();

        await page.keyboard.press('PageDown');
        await page.waitForChanges();
        await page.keyboard.press('PageDown');
        await page.waitForChanges();

        await validateFocusedDay(element, MIN_DATE);
      });

      it("won't go above the maximum date", async () => {
        const page = await newSparkE2EPage({
          html: defaultHtml
        });
        const element = await page.find('gux-calendar-beta');

        // First click the selected date to get focus on the calendar
        const selectedDate = await findSelectedDayElement(element);
        await selectedDate.click();

        await page.keyboard.press('PageUp');
        await page.waitForChanges();
        await page.keyboard.press('PageUp');
        await page.waitForChanges();

        await validateFocusedDay(element, MAX_DATE);
      });
    });

    it('setting max prop causes an upper bound range to be implemented correctly', async () => {
      const page = await newSparkE2EPage({
        html: defaultHtml
      });
      const element = await page.find('gux-calendar-beta');
      const input = await element.find('input');

      // Go to next month
      await goToNextMonth(element, page);

      const contentDate = await findDayElement(element, '2023-06-30');
      await contentDate.click();
      const value = await input.getProperty('value');
      expect(value).not.toBe('2023-06-30');
    });

    it('setting min prop causes a lower bound range to be implemented correctly', async () => {
      const page = await newSparkE2EPage({
        html: defaultHtml
      });
      const element = await page.find('gux-calendar-beta');
      const input = await element.find('input');

      await goToPreviousMonth(element, page);

      const contentDate = await findDayElement(element, '2023-04-01');
      await contentDate.click();
      const value = await input.getProperty('value');
      expect(value).not.toBe('2023-04-01');
    });

    it('tab index is set to 0 for selected date and -1 for non-selected date', async () => {
      const page = await newSparkE2EPage({
        html: defaultHtml
      });
      const element = await page.find('gux-calendar-beta');

      const selectedFocusProxy = await element.find(
        'pierce/gux-focus-proxy[aria-current="true"]'
      );
      const nonSelectedFocusProxy = await element.find(
        'pierce/gux-focus-proxy:not([aria-current="true"])'
      );
      expect(selectedFocusProxy.tabIndex).toBe(0);
      expect(nonSelectedFocusProxy.tabIndex).toBe(-1);
    });
  });
});

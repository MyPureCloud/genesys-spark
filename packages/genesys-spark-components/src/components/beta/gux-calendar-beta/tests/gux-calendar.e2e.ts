import { newSparkE2EPage } from '../../../../test/e2eTestUtils';
import {
  goToPreviousMonth,
  goToNextMonth,
  validateHeaderMonth,
  validateSelectedDate,
  getContentDateElement
} from '../services/tests.service';

describe('gux-calendar', () => {
  const defaultHtml = `
    <gux-calendar-beta>
      <input type="date" value="2023-05-19" min="2023-04-28" max="2023-06-18" />
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
      // await a11yCheck(page);

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
      await validateSelectedDate(element, 'May 2023', '19');
    });

    it('clicking on a date in the current month causes the date to be selected', async () => {
      const page = await newSparkE2EPage({
        html: defaultHtml
      });

      // Find May 10, 2023 in the calendar and click it so that it will be selected
      const element = await page.find('gux-calendar-beta');
      const contentDate = await getContentDateElement(element, 'May 10, 2023');
      await contentDate.click();
      await page.waitForChanges();

      // Validate that clicking on May 10, 2023 causes it to be selected
      await validateSelectedDate(element, 'May 2023', '10');
    });

    it('clicking on a date in the next month causes the date to be selected', async () => {
      const page = await newSparkE2EPage({
        html: defaultHtml
      });

      // Find June 1, 2023 in the calendar and click it so that it will be selected
      const element = await page.find('gux-calendar-beta');
      const contentDate = await getContentDateElement(element, 'June 1, 2023');
      await contentDate.click();
      await page.waitForChanges();

      // Validate that clicking on June 1, 2023 causes it to be selected
      await validateSelectedDate(element, 'June 2023', '1');
    });

    it('clicking on a date in the previous month causes the date to be selected', async () => {
      const page = await newSparkE2EPage({
        html: defaultHtml
      });

      // Find April 30, 2023 in the calendar and click it so that it will be selected
      const element = await page.find('gux-calendar-beta');
      const contentDate = await getContentDateElement(
        element,
        'April 30, 2023'
      );
      await contentDate.click();
      await page.waitForChanges();

      // Validate that clicking on April 30, 2023 causes it to be selected
      await validateSelectedDate(element, 'April 2023', '30');
    });

    describe('arrow key and page up/down navigation', () => {
      it('pressing the down arrow key and then the enter key cause the selected date to increment by 1 week', async () => {
        const page = await newSparkE2EPage({
          html: defaultHtml
        });
        const element = await page.find('gux-calendar-beta');

        // First click the selected date to get focus on the calendar
        const selectedDate = await element.find('pierce/.gux-selected');
        await selectedDate.click();

        // Press the down arrow key and then the enter key
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await page.waitForChanges();

        await validateSelectedDate(element, 'May 2023', '26');
      });

      it('pressing the up arrow key and then the enter key cause the selected date to decrement by 1 week', async () => {
        const page = await newSparkE2EPage({
          html: defaultHtml
        });
        const element = await page.find('gux-calendar-beta');

        // First click the selected date to get focus on the calendar
        const selectedDate = await element.find('pierce/.gux-selected');
        await selectedDate.click();

        // Press the up arrow key and then the enter key
        await page.keyboard.press('ArrowUp');
        await page.keyboard.press('Enter');
        await page.waitForChanges();

        await validateSelectedDate(element, 'May 2023', '12');
      });

      it('pressing the right arrow key and then the enter key cause the selected date to increment by 1 day', async () => {
        const page = await newSparkE2EPage({
          html: defaultHtml
        });
        const element = await page.find('gux-calendar-beta');

        // First click the selected date to get focus on the calendar
        const selectedDate = await element.find('pierce/.gux-selected');
        await selectedDate.click();

        // Press the right arrow key and then the enter key
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('Enter');
        await page.waitForChanges();

        await validateSelectedDate(element, 'May 2023', '20');
      });

      it('pressing the left arrow key and then the enter key cause the selected date to decrement by 1 day', async () => {
        const page = await newSparkE2EPage({
          html: defaultHtml
        });
        const element = await page.find('gux-calendar-beta');

        // First click the selected date to get focus on the calendar
        const selectedDate = await element.find('pierce/.gux-selected');
        await selectedDate.click();

        // Press the left arrow key and then the enter key
        await page.keyboard.press('ArrowLeft');
        await page.keyboard.press('Enter');
        await page.waitForChanges();

        await validateSelectedDate(element, 'May 2023', '18');
      });

      it('pressing the page down key causes the current month to decrement by 1 month', async () => {
        const page = await newSparkE2EPage({
          html: defaultHtml
        });
        const element = await page.find('gux-calendar-beta');

        // First click the selected date to get focus on the calendar
        const selectedDate = await element.find('pierce/.gux-selected');
        await selectedDate.click();

        // Press the left arrow key and then the enter key
        await page.keyboard.press('PageDown');
        await page.keyboard.press('Enter');
        await page.waitForChanges();

        await validateHeaderMonth(element, 'April 2023');
      });

      it('pressing the page up key causes the current month to increment by 1 month', async () => {
        const page = await newSparkE2EPage({
          html: defaultHtml
        });
        const element = await page.find('gux-calendar-beta');

        // First click the selected date to get focus on the calendar
        const selectedDate = await element.find('pierce/.gux-selected');
        await selectedDate.click();

        // Press the left arrow key and then the enter key
        await page.keyboard.press('PageUp');
        await page.keyboard.press('Enter');
        await page.waitForChanges();

        await validateHeaderMonth(element, 'June 2023');
      });
    });

    it('setting max prop causes an upper bound range to be implemented correctly', async () => {
      const page = await newSparkE2EPage({
        html: defaultHtml
      });
      const element = await page.find('gux-calendar-beta');

      // Go to next month
      await goToNextMonth(element, page);

      const contentDate = await getContentDateElement(element, 'June 19, 2023');
      expect(contentDate.className).toContain('gux-disabled');
    });

    it('setting min prop causes a lower bound range to be implemented correctly', async () => {
      const page = await newSparkE2EPage({
        html: defaultHtml
      });
      const element = await page.find('gux-calendar-beta');

      await goToPreviousMonth(element, page);

      const contentDate = await getContentDateElement(
        element,
        'April 27, 2023'
      );
      expect(contentDate.className).toContain('gux-disabled');
    });

    it('tab index is set to 0 for selected date and -1 for non-selected date', async () => {
      const page = await newSparkE2EPage({
        html: defaultHtml
      });
      const element = await page.find('gux-calendar-beta');

      const selectedDate = await getContentDateElement(element, 'May 19, 2023');
      const nonSelectedDate = await getContentDateElement(
        element,
        'May 20, 2023'
      );
      expect(selectedDate.tabIndex).toBe(0);
      expect(nonSelectedDate.tabIndex).toBe(-1);
    });
  });
});

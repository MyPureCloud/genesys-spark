import {
  checkRenders,
  setContent,
  test,
  expect
} from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-toggle.common';

test.describe('gux-toggle', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-toggle'
  });

  test.describe('User Interactions', () => {
    test('should not fire a check event when an enabled toggle is disabled and clicked', async ({
      page
    }) => {
      const html = '<gux-toggle lang="en" disabled label="On"</gux-toggle>';
      await setContent(page, html);
      const checkSpy = await page.spyOnEvent('check');

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      // eslint-disable-next-line playwright/no-force-option
      await slider.click({ force: true });
      await page.waitForChanges();

      expect(checkSpy).toHaveLength(0);
    });

    test('should fire a check event when an enabled toggle is clicked', async ({
      page
    }) => {
      const html = '<gux-toggle lang="en" label="On"></gux-toggle>';
      await setContent(page, html);
      const checkSpy = await page.spyOnEvent('check');

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      await slider.click();
      await page.waitForChanges();

      expect(checkSpy).toHaveLength(1);
    });

    test('should check an unchecked toggle when clicked', async ({ page }) => {
      const html = '<gux-toggle lang="en" label="On"></gux-toggle>';
      await setContent(page, html);

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      await expect(toggle).toHaveJSProperty('checked', false);

      await slider.click();
      await page.waitForChanges();

      await expect(toggle).toHaveJSProperty('checked', true);
    });

    test('should uncheck a checked toggle when clicked', async ({ page }) => {
      const html = '<gux-toggle lang="en" checked label="On"></gux-toggle>';
      await setContent(page, html);

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      await expect(toggle).toHaveJSProperty('checked', true);

      await slider.click();
      await page.waitForChanges();

      await expect(toggle).toHaveJSProperty('checked', false);
    });

    test('should not check an unchecked toggle when disabled and clicked', async ({
      page
    }) => {
      const html = '<gux-toggle lang="en" disabled label="On"></gux-toggle>';
      await setContent(page, html);

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      await expect(toggle).toHaveJSProperty('checked', false);

      // eslint-disable-next-line playwright/no-force-option
      await slider.click({ force: true });
      await page.waitForChanges();

      await expect(toggle).toHaveJSProperty('checked', false);
    });

    test('should not uncheck a checked toggle when disabled and clicked', async ({
      page
    }) => {
      const html =
        '<gux-toggle lang="en" checked disabled label="On"></gux-toggle>';
      await setContent(page, html);

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      await expect(toggle).toHaveJSProperty('checked', true);

      // eslint-disable-next-line playwright/no-force-option
      await slider.click({ force: true });
      await page.waitForChanges();

      await expect(toggle).toHaveJSProperty('checked', true);
    });

    test('should not check the toggle if preventDefault is called on the event', async ({
      page
    }) => {
      const html = '<gux-toggle lang="en" label="On"></gux-toggle>';
      await setContent(page, html);

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      await page.evaluate(() => {
        document.addEventListener('check', event => {
          event.preventDefault();
        });
      });

      await expect(toggle).toHaveJSProperty('checked', false);

      await slider.click();
      await page.waitForChanges();

      await expect(toggle).toHaveJSProperty('checked', false);
    });
  });

  test.describe('User Interactions (deprecated checked-label and unchecked-label)', () => {
    test('should not fire a check event when an enabled toggle is disabled and clicked', async ({
      page
    }) => {
      const html =
        '<gux-toggle lang="en" disabled checked-label="On" unchecked-label="Off"</gux-toggle>';
      await setContent(page, html);
      const checkSpy = await page.spyOnEvent('check');

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      // eslint-disable-next-line playwright/no-force-option
      await slider.click({ force: true });
      await page.waitForChanges();

      expect(checkSpy).toHaveLength(0);
    });

    test('should fire a check event when an enabled toggle is clicked', async ({
      page
    }) => {
      const html =
        '<gux-toggle lang="en" checked-label="On" unchecked-label="Off"></gux-toggle>';
      await setContent(page, html);
      const checkSpy = await page.spyOnEvent('check');

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      await slider.click();
      await page.waitForChanges();

      expect(checkSpy).toHaveLength(1);
    });

    test('should check an unchecked toggle when clicked', async ({ page }) => {
      const html =
        '<gux-toggle lang="en" checked-label="On" unchecked-label="Off"></gux-toggle>';
      await setContent(page, html);

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      await expect(toggle).toHaveJSProperty('checked', false);

      await slider.click();
      await page.waitForChanges();

      await expect(toggle).toHaveJSProperty('checked', true);
    });

    test('should uncheck a checked toggle when clicked', async ({ page }) => {
      const html =
        '<gux-toggle lang="en" checked checked-label="On" unchecked-label="Off"></gux-toggle>';
      await setContent(page, html);

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      await expect(toggle).toHaveJSProperty('checked', true);

      await slider.click();
      await page.waitForChanges();

      await expect(toggle).toHaveJSProperty('checked', false);
    });

    test('should not check an unchecked toggle when disabled and clicked', async ({
      page
    }) => {
      const html =
        '<gux-toggle lang="en" disabled checked-label="On" unchecked-label="Off"></gux-toggle>';
      await setContent(page, html);

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      await expect(toggle).toHaveJSProperty('checked', false);

      // eslint-disable-next-line playwright/no-force-option
      await slider.click({ force: true });
      await page.waitForChanges();

      await expect(toggle).toHaveJSProperty('checked', false);
    });

    test('should not uncheck a checked toggle when disabled and clicked', async ({
      page
    }) => {
      const html =
        '<gux-toggle lang="en" checked disabled checked-label="On" unchecked-label="Off"></gux-toggle>';
      await setContent(page, html);

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      await expect(toggle).toHaveJSProperty('checked', true);

      // eslint-disable-next-line playwright/no-force-option
      await slider.click({ force: true });
      await page.waitForChanges();

      await expect(toggle).toHaveJSProperty('checked', true);
    });

    test('should not check the toggle if preventDefault is called on the event', async ({
      page
    }) => {
      const html =
        '<gux-toggle lang="en" checked-label="On" unchecked-label="Off"></gux-toggle>';
      await setContent(page, html);

      const toggle = page.locator('gux-toggle');
      const slider = toggle.locator('gux-toggle-slider');

      await page.evaluate(() => {
        document.addEventListener('check', event => {
          event.preventDefault();
        });
      });

      await expect(toggle).toHaveJSProperty('checked', false);

      await slider.click();
      await page.waitForChanges();

      await expect(toggle).toHaveJSProperty('checked', false);
    });
  });

  test.describe('Regression tests', () => {
    checkRenders({
      renderConfigs: [
        {
          description: 'COMUI-3436: TargetSize Violation for toggles in tables',
          html: `
          <gux-table compact>
            <table slot="data">
              <thead>
                <tr>
                  <th data-column-name="first-name">First name</th>
                  <th data-column-name="last-name">Last name</th>
                  <th data-column-name="toggle">Toggle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John</td>
                  <td>Doe</td>
                  <td><gux-toggle></gux-toggle></td>
                </tr>
                <tr>
                  <td>Jane</td>
                  <td>Doe</td>
                  <td><gux-toggle></gux-toggle></td>
                </tr>
              </tbody>
            </table>
          </gux-table>`
        }
      ],
      element: 'gux-table'
    });
  });
});

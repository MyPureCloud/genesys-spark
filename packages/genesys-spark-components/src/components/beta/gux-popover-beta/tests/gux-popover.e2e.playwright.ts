import {
  checkRenders,
  test,
  setContent,
  expect
} from '@test/playwrightTestUtils';
import { renderConfig } from './gux-popover.common';

test.describe('gux-popover-beta', () => {
  checkRenders({
    renderConfigs: [renderConfig],
    element: 'gux-popover-beta'
  });

  test('should trigger guxdismiss event on popover dismiss button click', async ({
    page
  }) => {
    await setContent(
      page,
      `<div lang="en">
        <button id="popover-target">
          Example Element
        </button>
        <gux-popover-beta position="top" for="popover-target" display-dismiss-button is-open>
          <div>popover content</div>
        </gux-popover-beta>
      </div>`
    );

    const component = page.locator('gux-popover-beta');
    const guxdismiss = await page.spyOnEvent('guxdismiss');
    const button = component.locator('gux-dismiss-button');

    // eslint-disable-next-line playwright/no-force-option
    await button.click({ force: true });

    expect(guxdismiss).toHaveReceivedEvent();
  });

  test('Supports hiding the close button', async ({ page }) => {
    await setContent(
      page,
      `<div lang="en">
        <div id="popover-target">
          Example Element
        </div>
        <gux-popover-beta position="top" for="popover-target" display-dismiss-button="false">
          <div>popover content</div>
        </gux-popover-beta>
      </div>`
    );

    await expect(page.locator('gux-dismiss-button')).toBeHidden();
  });
});

import {
  checkRenders,
  test,
  setContent,
  expect
} from '@test/playwrightTestUtils';
import { renderConfig } from './gux-popover.common';

test.describe('gux-popover', () => {
  checkRenders({
    renderConfigs: [{ html: renderConfig.html }],
    element: 'gux-popover'
  });

  test('should trigger guxdismiss event on popover dismiss button click', async ({
    page
  }) => {
    await setContent(
      page,
      `<div lang="en">
      <div id="popover-target">
        Example Element
      </div>
      <gux-popover position="top" for="popover-target" display-dismiss-button is-open>
        <div>popover content</div>
      </gux-popover>
    </div>`
    );

    const component = page.locator('gux-popover');
    const guxdismiss = await page.spyOnEvent('guxdismiss');
    const button = component.locator('gux-dismiss-button');

    // eslint-disable-next-line playwright/no-force-option
    await button.click({ force: true });

    expect(guxdismiss).toHaveReceivedEvent();
  });

  test('should trigger one guxdismiss event when click outside causes focus out', async ({
    page
  }) => {
    await setContent(
      page,
      `<div lang="en">
      <button id="focusable-element" data-testid="focusable-element">
        Example Focusable
      </button>
      <div id="popover-target">
        Example Element
      </div>
      <gux-popover position="top" for="popover-target" display-dismiss-button close-on-click-outside is-open>
        <div>
          <button id="popover-content" data-testid="popover-content">
            popover content
          </button>
        </div>
      </gux-popover>
    </div>`
    );

    const guxdismiss = await page.spyOnEvent('guxdismiss');
    const component = page.locator('gux-popover');
    await component
      .getByTestId('popover-content')
      .evaluate(element => element.focus());
    const button = page.getByTestId('focusable-element');

    // eslint-disable-next-line playwright/no-force-option
    await button.click({ force: true }); // https://github.com/microsoft/playwright/issues/13576

    expect(guxdismiss).toHaveReceivedEventTimes(1);
  });

  test('Supports hiding the close button', async ({ page }) => {
    await setContent(
      page,
      `<div lang="en">
      <div id="popover-target">
        Example Element
      </div>
      <gux-popover position="top" for="popover-target" display-dismiss-button="false" is-open>
        <div>popover content</div>
      </gux-popover>
    </div>`
    );

    await expect(page.locator('gux-dismiss-button')).toBeHidden();
  });
});

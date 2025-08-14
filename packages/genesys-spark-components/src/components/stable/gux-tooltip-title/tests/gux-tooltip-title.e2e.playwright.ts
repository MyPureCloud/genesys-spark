import {
  checkRenders,
  test,
  setContent,
  expect
} from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-tooltip-title.common';

test.describe('gux-tooltip-title', () => {
  checkRenders({
    renderConfigs: renderConfigs,
    element: 'gux-tooltip-title'
  });

  test('should render a tooltip if the component text width is greater than the parent container', async ({
    page
  }) => {
    await setContent(
      page,
      `<div style="max-width: 40px">
          <gux-tooltip-title>
              <span>
              <slot aria-hidden="true" onSlotchange={this.onSlotChange.bind(this)}>Some long text to truncate and use a tooltip</slot>
              </span>
          </gux-tooltip-title>
      </div>`
    );

    const tooltipElement = page.locator('gux-tooltip');

    expect(tooltipElement).toBeDefined();
  });

  test('should not render a tooltip if the component text width is less than the parent container', async ({
    page
  }) => {
    await setContent(
      page,
      `<div lang='en'>
          <gux-tooltip-title>
              <span>Some short text</span>
          </gux-tooltip-title>
      </div>`
    );

    const component = page.locator('gux-tooltip-title');
    const tooltipElement = component.locator('gux-tooltip');

    expect(await tooltipElement.count()).toBe(0);
  });

  test('should truncate title text if tooltip is rendered', async ({
    page
  }) => {
    await setContent(
      page,
      `<div style="max-width: 40px">
            <gux-tooltip-title>
                <span>
                <slot aria-hidden="true" onSlotchange={this.onSlotChange.bind(this)}>Some long text to truncate and use a tooltip</slot>
                </span>
            </gux-tooltip-title>
        </div>`
    );

    const element = page.locator('gux-tooltip-title');
    await expect(element).toHaveClass('gux-overflow-hidden');
  });

  test('Tooltip title text should match screenreader text if gux-icon is being used and no title text is set', async ({
    page
  }) => {
    await setContent(
      page,
      `<div style="max-width: 40px">
            <gux-tooltip-title>
              <span>
                <gux-icon icon-name="unknown" decorative screenreader-text="test screenreader text"></gux-icon>
              </span>
            </gux-tooltip-title>
        </div>`
    );

    const tooltipElement = page.locator('gux-tooltip');
    await expect(tooltipElement).toHaveText('test screenreader text');
  });
});

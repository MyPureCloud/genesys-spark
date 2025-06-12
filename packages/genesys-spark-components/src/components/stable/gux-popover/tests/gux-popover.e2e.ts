import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';
import { renderConfig } from './gux-popover.common';

describe('gux-popover', () => {
  it(renderConfig.description, async () => {
    const page = await newSparkE2EPage({
      html: renderConfig.html
    });

    const element = await page.find('gux-popover');
    await a11yCheck(page);
    expect(element).toHaveAttribute('hydrated');
  });

  it('should trigger guxdismiss event on popover dismiss button click', async () => {
    const page = await newSparkE2EPage({
      html: `
      <div lang="en">
        <div id="popover-target">
          Example Element
        </div>
        <gux-popover position="top" for="popover-target" display-dismiss-button is-open>
          <div>popover content</div>
        </gux-popover>
      </div>
      `
    });

    const component = await page.find('gux-popover');
    const guxdismiss = await component.spyOnEvent('guxdismiss');
    const button = await component.find('pierce/gux-dismiss-button');
    await button.click();
    expect(guxdismiss).toHaveReceivedEvent();
  });

  it('should trigger one guxdismiss event when click outside causes focus out', async () => {
    const page = await newSparkE2EPage({
      html: `
      <div lang="en">
        <button id="focusable-element">
          Example Focusable
        </button>
        <div id="popover-target">
          Example Element
        </div>
        <gux-popover position="top" for="popover-target" display-dismiss-button close-on-click-outside is-open>
          <div>
            <button id="popover-content">
              popover content
            </button>
          </div>
        </gux-popover>
      </div>
      `
    });

    const component = await page.find('gux-popover');
    const guxdismiss = await component.spyOnEvent('guxdismiss');
    const content = await page.find('#popover-content');
    content.focus();
    const button = await page.find('#focusable-element');
    await button.click();
    expect(guxdismiss).toHaveReceivedEventTimes(1);
  });

  it('Supports hiding the close button', async () => {
    const page = await newSparkE2EPage({
      html: `
      <div lang="en">
        <div id="popover-target">
          Example Element
        </div>
        <gux-popover position="top" for="popover-target">
          <div>popover content</div>
        </gux-popover>
      </div>
      `
    });

    const component = await page.find('gux-popover');
    component.setProperty('displayDismissDutton', false);
    await page.waitForChanges();
    const button = await page.find('pierce/gux-dismiss-button');
    await a11yCheck(page);
    expect(button).toBeNull();
  });
});

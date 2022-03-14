import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

describe('gux-popover-list', () => {
  it('renders', async () => {
    const page = await newSparkE2EPage({
      html: `
      <div lang="en">
        <div id="popover-target">
          Example Element
        </div>
        <gux-popover-list position="top" for="popover-target">
          <div>popover content</div>
        </gux-popover-list>
      </div>
      `
    });

    const element = await page.find('gux-popover-list');
    await a11yCheck(page);
    expect(element).toHaveClass('hydrated');
  });

  it('should trigger guxdismiss event on popover dismiss button click', async () => {
    const page = await newSparkE2EPage({
      html: `
      <div lang="en">
        <div id="popover-target">
          Example Element
        </div>
        <gux-popover-list position="top" for="popover-target" display-dismiss-button>
          <div>popover content</div>
        </gux-popover-list>
      </div>
      `
    });

    const component = await page.find('gux-popover-list');
    const guxdismiss = await component.spyOnEvent('guxdismiss');
    const button = await page.find('pierce/gux-dismiss-button');
    await button.click();
    expect(guxdismiss).toHaveReceivedEvent();
  });

  it('Supports hiding the close button', async () => {
    const page = await newSparkE2EPage({
      html: `
      <div lang="en">
        <div id="popover-target">
          Example Element
        </div>
        <gux-popover-list position="top" for="popover-target">
          <div>popover content</div>
        </gux-popover-list>
      </div>
      `
    });

    const component = await page.find('gux-popover-list');
    component.setProperty('displayDismissDutton', false);
    await page.waitForChanges();
    const button = await page.find('pierce/gux-dismiss-button');
    await a11yCheck(page);
    expect(button).toBeNull();
  });
});

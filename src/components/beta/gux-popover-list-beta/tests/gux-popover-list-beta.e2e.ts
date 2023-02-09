import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-popover-list-beta', () => {
  it('renders', async () => {
    const page = await newSparkE2EPage({
      html: `
      <div lang="en">
        <div id="popover-target">
          Example Element
        </div>
        <gux-popover-list-beta position="top" for="popover-target" is-open>
          <div>popover content</div>
        </gux-popover-list-beta>
      </div>
      `
    });

    const element = await page.find('gux-popover-list-beta');
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
        <gux-popover-list-beta position="top" for="popover-target" display-dismiss-button is-open>
          <div>popover content</div>
        </gux-popover-list-beta>
      </div>
      `
    });

    const component = await page.find('gux-popover-list-beta');
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
        <gux-popover-list-beta position="top" for="popover-target">
          <div>popover content</div>
        </gux-popover-list-beta>
      </div>
      `
    });

    const component = await page.find('gux-popover-list-beta');
    component.setProperty('displayDismissDutton', false);
    await page.waitForChanges();
    const button = await page.find('pierce/gux-dismiss-button');
    await a11yCheck(page);
    expect(button).toBeNull();
  });
});

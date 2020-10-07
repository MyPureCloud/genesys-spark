import { newE2EPage } from '@stencil/core/testing';

describe('gux-popover', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <div lang="en">
        <div id="popover-target">
          Example Element
        </div>
        <gux-popover position="top" for="popover-target">
          <div>popover content</div>
        </gux-popover>
      </div>
    `);
    const element = await page.find('gux-popover');
    expect(element).toHaveClass('hydrated');
  });

  it('Should trigger guxdismiss event on popover dismiss button click', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <div lang="en">
        <div id="popover-target">
          Example Element
        </div>
        <gux-popover position="top" for="popover-target" display-dismiss-button>
          <div>popover content</div>
        </gux-popover>
      </div>
    `);
    const component = await page.find('gux-popover');
    const guxdismiss = await component.spyOnEvent('guxdismiss');
    const button = await page.find('.gux-dismiss');
    await button.click();
    expect(guxdismiss).toHaveReceivedEvent();
  });

  it('Supports hiding the close button', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <div lang="en">
        <div id="popover-target">
          Example Element
        </div>
        <gux-popover position="top" for="popover-target">
          <div>popover content</div>
        </gux-popover>
      </div>
    `);
    const component = await page.find('gux-popover');
    component.setProperty('displayDismissDutton', false);
    await page.waitForChanges();
    const button = await page.find('.gux-dismiss');
    expect(button).toBeNull();
  });
});

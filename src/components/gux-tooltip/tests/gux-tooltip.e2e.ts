import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('gux-tooltip', () => {
  let page: E2EPage;
  let element: E2EElement;
  beforeEach(async () => {
    page = await newE2EPage();
  });
  it('renders', async () => {
    await page.setContent('<gux-tooltip></gux-tooltip>');
    element = await page.find('gux-tooltip');
    expect(element).toHaveClass('hydrated');
  });
  it('shows/hides the tooltip', async () => {
    await page.setContent(`
    <div>
      <button>Button</button>
      <gux-tooltip
        for="for"
        text='Tooltip content'
        delay='0'>
      </gux-tooltip>
    </div>
    `);
    element = await page.find('gux-tooltip');
    const shownSpy = await element.spyOnEvent('shown');
    const hiddenSpy = await element.spyOnEvent('hidden');
    element.callMethod('show');
    await page.waitForChanges();
    expect(shownSpy).toHaveReceivedEvent();
    await element.callMethod('hide');
    page.waitForChanges();
    expect(hiddenSpy).toHaveReceivedEvent();
  });
});

import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing'

describe('genesys-tooltip', () => {
  let page: E2EPage;
  let element: E2EElement;
  beforeEach(async () => {
    page = await newE2EPage();
  });
  it('renders', async () => {
    await page.setContent('<genesys-tooltip></genesys-tooltip>');
    element = await page.find('genesys-tooltip');
    expect(element).toHaveClass('hydrated');
  });
  it('shows/hides the tooltip', async () => {
    await page.setContent(`
    <div>
      <button>Button</button>
      <genesys-tooltip
        for="for"
        text='Tooltip content'
        delay='0'>
      </genesys-tooltip>
    </div>
    `);
    element = await page.find('genesys-tooltip');
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

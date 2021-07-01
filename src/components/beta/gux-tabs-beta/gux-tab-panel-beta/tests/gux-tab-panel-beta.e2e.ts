import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('gux-tab-panel-beta', () => {
  let page: E2EPage;
  let element: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  it('renders', async () => {
    await page.setContent(`
    <gux-tab-panel-beta></gux-tab-panel-beta>
    `);
    element = await page.find('gux-tab-panel-beta');
    expect(element).toHaveClass('hydrated');
  });
});

import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('gux-tab-beta', () => {
  let page: E2EPage;
  let element: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  it('renders', async () => {
    await page.setContent(`
    <gux-tab-beta></gux-tab-beta>
    `);
    element = await page.find('gux-tab-beta');
    expect(element).toHaveClass('hydrated');
  });
});

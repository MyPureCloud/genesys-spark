import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('gux-tab-list-beta', () => {
  let page: E2EPage;
  let element: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  it('renders', async () => {
    await page.setContent(`
    <gux-tab-list-beta></gux-tab-list-beta>
    `);
    element = await page.find('gux-tab-list-beta');
    expect(element).toHaveClass('hydrated');
  });
});

import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('gux-dropdown', () => {
  let page: E2EPage;
  let element: E2EElement;
  beforeEach(async () => {
    page = await newE2EPage();
  });
  it('renders', async () => {
    await page.setContent(`
    <gux-dropdown></gux-dropdown>
    `);
    element = await page.find('gux-dropdown');
    expect(element).toHaveClass('hydrated');
  });
});

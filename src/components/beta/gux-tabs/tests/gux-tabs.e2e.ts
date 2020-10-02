import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('gux-tabs', () => {
  let page: E2EPage;
  let element: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  it('renders', async () => {
    await page.setContent(`
    <gux-tabs-beta lang="en"></gux-tabs-beta>
    `);
    element = await page.find('gux-tabs-beta');
    expect(element).toHaveClass('hydrated');
  });
});

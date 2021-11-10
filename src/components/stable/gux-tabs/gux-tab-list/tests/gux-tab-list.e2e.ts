import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('gux-tab-list', () => {
  let page: E2EPage;
  let element: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  it('renders', async () => {
    await page.setContent(`
    <gux-tab-list lang="en"></gux-tab-list>
    `);
    element = await page.find('gux-tab-list');
    expect(element).toHaveClass('hydrated');
  });
});

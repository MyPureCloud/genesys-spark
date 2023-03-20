import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('gux-tab-panel', () => {
  let page: E2EPage;
  let element: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  it('renders', async () => {
    await page.setContent(`
    <gux-tab-panel></gux-tab-panel>
    `);
    element = await page.find('gux-tab-panel');
    expect(element).toHaveAttribute('hydrated');
  });
});

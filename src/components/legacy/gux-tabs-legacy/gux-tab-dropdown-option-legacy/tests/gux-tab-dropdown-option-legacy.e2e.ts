import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('gux-tab-dropdown-option-legacy', () => {
  let page: E2EPage;
  let element: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  it('renders', async () => {
    await page.setContent(`
    <gux-tab-dropdown-option-legacy></gux-tab-dropdown-option-legacy>
    `);
    element = await page.find('gux-tab-dropdown-option-legacy');
    expect(element).toHaveClass('hydrated');
  });
});

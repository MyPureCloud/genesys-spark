import { newE2EPage } from '@stencil/core/testing';

describe('gux-search', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-search></gux-search>');
    const element = await page.find('gux-search');
    expect(element).toHaveClass('hydrated');
  });
});

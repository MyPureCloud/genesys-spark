import { newE2EPage } from '@stencil/core/testing';

describe('gux-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-list></gux-list>');
    const element = await page.find('gux-list');
    expect(element).toHaveClass('hydrated');
  });
});

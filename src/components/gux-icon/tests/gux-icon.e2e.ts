import { newE2EPage } from '@stencil/core/testing';

describe('gux-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-icon decorative="true"></gux-icon>');
    const element = await page.find('gux-icon');
    expect(element).toHaveClass('hydrated');
  });
});

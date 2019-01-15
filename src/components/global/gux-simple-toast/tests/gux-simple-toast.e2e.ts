import { newE2EPage } from '@stencil/core/testing';

describe('gux-simple-toast', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-simple-toast></gux-simple-toast>');
    const element = await page.find('gux-simple-toast');
    expect(element).toHaveClass('hydrated');
  });
});

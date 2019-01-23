import { newE2EPage } from '@stencil/core/testing';

describe('gux-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gux-button></gux-button>');
    const element = await page.find('gux-button');
    expect(element).toHaveClass('hydrated');
  });
});

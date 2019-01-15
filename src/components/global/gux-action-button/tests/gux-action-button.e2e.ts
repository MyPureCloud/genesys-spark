import { newE2EPage } from '@stencil/core/testing';

describe('gux-action-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-action-button></gux-action-button>');
    const element = await page.find('gux-action-button');
    expect(element).toHaveClass('hydrated');
  });
});

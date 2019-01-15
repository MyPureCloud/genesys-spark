import { newE2EPage } from '@stencil/core/testing';

describe('gux-action-toast', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-action-toast></gux-action-toast>');
    const element = await page.find('gux-action-toast');
    expect(element).toHaveClass('hydrated');
  });
});

import { newE2EPage } from '@stencil/core/testing'

describe('gux-loading-spinner', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-loading-spinner></gux-loading-spinner>');
    const element = await page.find('gux-loading-spinner');
    expect(element).toHaveClass('hydrated');
  });
});

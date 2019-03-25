import { newE2EPage } from '@stencil/core/testing'

describe('gux-spinner', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-spinner></gux-spinner>');
    const element = await page.find('gux-spinner');
    expect(element).toHaveClass('hydrated');
  });
});

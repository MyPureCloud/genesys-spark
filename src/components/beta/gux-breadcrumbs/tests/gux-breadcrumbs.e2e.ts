import { newE2EPage } from '@stencil/core/testing';

describe('gux-breadcrumbs', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-breadcrumbs></gux-breadcrumbs>');
    const element = await page.find('gux-breadcrumbs');
    expect(element).toHaveClass('hydrated');
  });
});

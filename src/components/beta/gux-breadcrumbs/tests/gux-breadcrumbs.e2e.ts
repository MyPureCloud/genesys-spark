import { newE2EPage } from '@stencil/core/testing';

describe('gux-breadcrumbs', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-breadcrumbs-beta></gux-breadcrumbs-beta>');
    const element = await page.find('gux-breadcrumbs-beta');
    expect(element).toHaveClass('hydrated');
  });
});

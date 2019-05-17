import { newE2EPage } from '@stencil/core/testing';

describe('gux-advanced-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-advanced-dropdown></gux-advanced-dropdown>');
    const element = await page.find('gux-advanced-dropdown');
    expect(element).toHaveClass('hydrated');
  });

  it('focuses search field when opening dropdown', async () => {
    const page = await newE2EPage();
  });
});

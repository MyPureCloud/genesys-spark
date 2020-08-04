import { newE2EPage } from '@stencil/core/testing';

describe('gux-switch', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-switch-beta></gux-switch-beta>');
    const element = await page.find('gux-switch-beta');
    expect(element).toHaveClass('hydrated');
  });
});

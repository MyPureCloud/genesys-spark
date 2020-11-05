import { newE2EPage } from '@stencil/core/testing';

describe('gux-switch', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-switch-legacy></gux-switch-legacy>');
    const element = await page.find('gux-switch-legacy');
    expect(element).toHaveClass('hydrated');
  });
});

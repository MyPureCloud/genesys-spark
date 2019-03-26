import { newE2EPage } from '@stencil/core/testing'

describe('gux-panel-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-panel-header></gux-panel-header>');
    const element = await page.find('gux-panel-header');
    expect(element).toHaveClass('hydrated');
  });
});

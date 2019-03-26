import { newE2EPage } from '@stencil/core/testing'

describe('gux-panel-footer', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-panel-footer></gux-panel-footer>');
    const element = await page.find('gux-panel-footer');
    expect(element).toHaveClass('hydrated');
  });
});

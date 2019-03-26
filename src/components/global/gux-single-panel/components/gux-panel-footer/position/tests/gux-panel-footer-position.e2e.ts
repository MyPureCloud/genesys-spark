import { newE2EPage } from '@stencil/core/testing'

describe('gux-panel-footer-position', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-panel-footer-position></gux-panel-footer-position>');
    const element = await page.find('gux-panel-footer-position');
    expect(element).toHaveClass('hydrated');
  });
});

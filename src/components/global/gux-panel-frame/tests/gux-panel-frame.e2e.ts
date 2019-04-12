import { newE2EPage } from '@stencil/core/testing'

describe('gux-panel-frame', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-panel-frame></gux-panel-frame>');
    const element = await page.find('gux-panel-frame');
    expect(element).toHaveClass('hydrated');
  });
});

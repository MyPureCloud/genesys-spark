import { newE2EPage } from '@stencil/core/testing'

describe('gux-panel-body', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-panel-body></gux-panel-body>');
    const element = await page.find('gux-panel-body');
    expect(element).toHaveClass('hydrated');
  });
});

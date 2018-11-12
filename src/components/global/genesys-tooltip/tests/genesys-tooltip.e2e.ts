import { newE2EPage } from '@stencil/core/testing'

describe('genesys-tooltip', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<genesys-tooltip></genesys-tooltip>');
    const element = await page.find('genesys-tooltip');
    expect(element).toHaveClass('hydrated');
  });
});

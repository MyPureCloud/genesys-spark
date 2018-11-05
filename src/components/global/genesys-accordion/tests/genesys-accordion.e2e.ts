import { newE2EPage } from '@stencil/core/testing'

describe('genesys-accordion', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<genesys-accordion></genesys-accordion>');
    const element = await page.find('genesys-accordion');
    expect(element).toHaveClass('hydrated');
  });
});

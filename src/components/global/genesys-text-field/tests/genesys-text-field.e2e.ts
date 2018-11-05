import { newE2EPage } from '@stencil/core/testing'

describe('genesys-text-field', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<genesys-text-field></genesys-text-field>');
    const element = await page.find('genesys-text-field');
    expect(element).toHaveClass('hydrated');
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('genesys-pagination', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<genesys-pagination></genesys-pagination>');
    const element = await page.find('genesys-pagination');
    expect(element).toHaveClass('hydrated');
  });
});

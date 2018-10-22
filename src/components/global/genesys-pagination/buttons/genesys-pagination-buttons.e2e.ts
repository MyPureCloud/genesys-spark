import { newE2EPage } from '@stencil/core/testing';

describe('genesys-pagination-buttons', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<genesys-pagination-buttons></genesys-pagination-buttons>'
    );
    const element = await page.find('genesys-pagination-buttons');
    expect(element).toHaveClass('hydrated');
  });
});

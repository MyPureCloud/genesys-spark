import { newE2EPage } from '@stencil/core/testing';

describe('genesys-pagination-item-counts', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<genesys-pagination-item-counts></genesys-pagination-item-counts>'
    );
    const element = await page.find('genesys-pagination-item-counts');
    expect(element).toHaveClass('hydrated');
  });
});

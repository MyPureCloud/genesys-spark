import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('genesys-accordion', () => {
  let page: E2EPage;
  let element: E2EElement;
  beforeEach(async () => {
    page = await newE2EPage();
  });
  it('renders', async () => {
    await page.setContent(`
    <genesys-accordion></genesys-accordion>
    `);
    element = await page.find('genesys-accordion');
    expect(element).toHaveClass('hydrated');
  });
});

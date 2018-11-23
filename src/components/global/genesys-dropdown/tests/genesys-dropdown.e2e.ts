import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing'

describe('genesys-dropdown', () => {
  let page: E2EPage;
  let element: E2EElement;
  beforeEach(async () => {
    page = await newE2EPage();
  });
  it('renders', async () => {
    await page.setContent(`
    <genesys-dropdown></genesys-dropdown>
    `);
    element = await page.find('genesys-dropdown');
    expect(element).toHaveClass('hydrated');
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('genesys-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<genesys-list></genesys-list>');
    const element = await page.find('genesys-list');
    expect(element).toHaveClass('hydrated');
  });
});

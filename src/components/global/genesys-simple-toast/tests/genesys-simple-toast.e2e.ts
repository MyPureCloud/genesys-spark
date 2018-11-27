import { newE2EPage } from '@stencil/core/testing';

describe('genesys-simple-toast', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<genesys-simple-toast></genesys-simple-toast>');
    const element = await page.find('genesys-simple-toast');
    expect(element).toHaveClass('hydrated');
  });
});

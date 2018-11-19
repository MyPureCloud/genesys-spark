import { newE2EPage } from '@stencil/core/testing';

describe('genesys-action-toast', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<genesys-action-toast></genesys-action-toast>');
    const element = await page.find('genesys-action-toast');
    expect(element).toHaveClass('hydrated');
  });
});

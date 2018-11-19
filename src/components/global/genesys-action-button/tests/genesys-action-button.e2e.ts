import { newE2EPage } from '@stencil/core/testing';

describe('genesys-action-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<genesys-action-button></genesys-action-button>');
    const element = await page.find('genesys-action-button');
    expect(element).toHaveClass('hydrated');
  });
});

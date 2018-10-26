import { newE2EPage } from '@stencil/core/testing';

describe('genesys-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<genesys-button></genesys-button>');
    const element = await page.find('genesys-button');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();
    await page.setContent('<genesys-button></genesys-button>');
    const element = await page.findAll('genesys-button >>> button');
    expect(element.length).toEqual(1);
  });
});

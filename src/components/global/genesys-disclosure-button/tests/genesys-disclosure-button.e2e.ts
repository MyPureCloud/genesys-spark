import { newE2EPage } from '@stencil/core/testing';

describe('genesys-disclosure-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<genesys-disclosure-button></genesys-disclosure-button>'
    );
    const element = await page.find('genesys-disclosure-button');
    expect(element).toHaveClass('hydrated');
  });

  it('renders panel when button pressed', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<genesys-disclosure-button></genesys-disclosure-button>'
    );
    const component = await page.find('genesys-disclosure-button');
    const button = await page.find('.disclosure-button');
    const panel = await page.find('.disclosure-panel');
    await button.click();
    expect(panel).toHaveClass('active');
  });
});

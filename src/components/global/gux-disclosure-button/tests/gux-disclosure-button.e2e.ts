import { newE2EPage } from '@stencil/core/testing';

describe('gux-disclosure-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-disclosure-button></gux-disclosure-button>');
    const element = await page.find('gux-disclosure-button');
    expect(element).toHaveClass('hydrated');
  });

  it('renders panel when button pressed', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-disclosure-button></gux-disclosure-button>');
    const component = await page.find('gux-disclosure-button');
    const button = await page.find('.disclosure-button');
    const panel = await page.find('.disclosure-panel');
    await button.click();
    expect(panel).toHaveClass('active');
  });
});

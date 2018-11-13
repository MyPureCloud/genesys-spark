import { newE2EPage } from '@stencil/core/testing'

describe('genesys-slider', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<genesys-slider></genesys-slider>');
    const element = await page.find('genesys-slider');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes when value is changed', async () => {
    const page = await newE2EPage();

    await page.setContent('<genesys-slider></genesys-slider>');
    const component = await page.find('genesys-slider');
    const input = await page.find('genesys-slider input');
    expect(input).toHaveClass('range-input');
    expect(input.getAttribute('value')).toEqual(0);
    component.setProperty('value', 5);
    expect(input.getAttribute('value')).toEqual(5);
  });
});

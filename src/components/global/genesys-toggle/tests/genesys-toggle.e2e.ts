import { newE2EPage } from '@stencil/core/testing';

describe('genesys-toggle', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<genesys-toggle></genesys-toggle>');
    const element = await page.find('genesys-toggle');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes if checked prop change', async () => {
    const page = await newE2EPage();

    await page.setContent('<genesys-toggle></genesys-toggle>');
    const component = await page.find('genesys-toggle');
    const element = await page.find('genesys-toggle > div');
    const input = await page.find('genesys-toggle input');
    expect(element.className).toEqual(``);
    expect(input.getAttribute('type')).toEqual(`checkbox`);
    let inputCheckedProperty = await input.getProperty('checked');
    expect(inputCheckedProperty).toBeFalsy();
    component.setProperty('checked', true);
    await page.waitForChanges();
    expect(element.className).toEqual(`genesys-checked`);
    inputCheckedProperty = await input.getProperty('checked');
    expect(inputCheckedProperty).toEqual(true);
  });
});

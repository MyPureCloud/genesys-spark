import { newE2EPage } from '@stencil/core/testing';

describe('gux-color-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-color-select></gux-color-select>');
    const element = await page.find('gux-color-select');
    expect(element).toHaveClass('hydrated');
  });

  it('should switch activeColor on click', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-color-select></gux-color-select>');
    const element = await page.find('button');

    await element.click();
    await page.waitForChanges();
    expect(element).toHaveClass('gux-color-option-active');
  });

  it('should display blank tiles to fill out rows', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<gux-color-select><gux-color-option value="#FFFFFF"></gux-color-option></gux-color-select>'
    );
    const matrix = await page.find('.gux-color-matrix');
    const activeOptions = await matrix.findAll('button[value]');
    const blankOptions = await matrix.findAll('button[disabled]');
    expect(activeOptions.length).toBe(11);
    expect(blankOptions.length).toBe(4);
  });
});

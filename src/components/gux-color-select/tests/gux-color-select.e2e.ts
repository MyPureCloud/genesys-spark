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
    expect(element).toHaveClass('gux-color-tile-active');
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('gux-color-picker', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-color-picker></gux-color-picker>');
    const element = await page.find('gux-color-picker');
    expect(element).toHaveClass('hydrated');
  });

  it('should open dropdown when clicked', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-color-picker></gux-color-picker>');
    const element = await page.find('.gux-color-picker-main-element');
    expect(await page.find('.gux-color-picker-color-select')).toBeFalsy();
    await element.click();
    await page.waitForChanges();
    expect(await page.find('.gux-color-picker-color-select')).toBeTruthy();
  });
});

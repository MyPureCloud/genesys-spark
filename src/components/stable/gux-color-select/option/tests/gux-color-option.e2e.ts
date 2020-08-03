import { newE2EPage } from '@stencil/core/testing';

describe('gux-color-option', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-color-option></gux-color-option>');
    const element = await page.find('gux-color-option');
    expect(element).toHaveClass('hydrated');
  });

  it('should be active', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-color-option active></gux-color-option>');
    const component = await page.find('gux-color-option');
    expect(await page.find('.gux-color-option-active')).toBeTruthy();

    component.setProperty('active', false);
    await page.waitForChanges();
    expect(await page.find('.gux-color-option-active')).toBeFalsy();
  });
});

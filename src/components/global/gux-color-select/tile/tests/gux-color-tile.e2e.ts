import { newE2EPage } from '@stencil/core/testing'

describe('gux-color-tile', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-color-tile></gux-color-tile>');
    const element = await page.find('gux-color-tile');
    expect(element).toHaveClass('hydrated');
  });

  it('should be active', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-color-tile active></gux-color-tile>');
    const component = await page.find('gux-color-tile');
    expect(await page.find('.gux-color-tile-active')).toBeTruthy();

    component.setProperty('active', false);
    await page.waitForChanges();
    expect(await page.find('.gux-color-tile-active')).toBeFalsy();
  });
});

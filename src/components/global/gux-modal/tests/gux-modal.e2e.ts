import { newE2EPage } from '@stencil/core/testing';

describe('gux-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-modal></gux-modal>');
    const element = await page.find('gux-modal');
    expect(element).toHaveClass('hydrated');
  });

  it('active modal is hidden when close icon is selected', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-modal></gux-modal>');
    const component = await page.find('gux-modal');
    const modal = await page.find('.modal');
    component.setProperty('active', true);
    await page.waitForChanges();
    expect(modal).toHaveClass('modal');
    expect(modal).toHaveClass('active');
    const button = await page.find('.cancel-button');
    await button.click();
    expect(modal).toHaveClass('hidden');
  });
});

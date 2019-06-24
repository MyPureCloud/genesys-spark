import { newE2EPage } from '@stencil/core/testing';

describe('gux-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-modal></gux-modal>');
    const element = await page.find('gux-modal');
    expect(element).toHaveClass('hydrated');
  });

  it('Should trigger close event on modal cancel button click', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-modal></gux-modal>');
    const component = await page.find('gux-modal');
    const onClose = await component.spyOnEvent('close');
    component.setProperty('active', true);
    await page.waitForChanges();
    const button = await page.find('.cancel-button');
    await button.click();
    expect(onClose).toHaveReceivedEventTimes(1);
  });
});

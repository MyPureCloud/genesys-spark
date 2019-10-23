import { newE2EPage } from '@stencil/core/testing';

describe('gux-notification-toast', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-notification-toast></gux-notification-toast>');
    const element = await page.find('gux-notification-toast');
    expect(element).toHaveClass('hydrated');
  });
});

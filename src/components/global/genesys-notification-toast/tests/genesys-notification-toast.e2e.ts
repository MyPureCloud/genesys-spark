import { newE2EPage } from '@stencil/core/testing';

describe('genesys-notification-toast', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<genesys-notification-toast></genesys-notification-toast>'
    );
    const element = await page.find('genesys-notification-toast');
    expect(element).toHaveClass('hydrated');
  });
});

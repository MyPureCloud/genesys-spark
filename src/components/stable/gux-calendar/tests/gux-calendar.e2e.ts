import { newE2EPage } from '@stencil/core/testing';

describe('gux-calendar', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-calendar lang="en"></gux-calendar>');
    const element = await page.find('gux-calendar');
    expect(element).toHaveClass('hydrated');
  });
});

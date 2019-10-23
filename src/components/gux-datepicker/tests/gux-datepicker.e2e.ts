import { newE2EPage } from '@stencil/core/testing';

describe('gux-datepicker', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-datepicker></gux-datepicker>');
    const element = await page.find('gux-datepicker');
    expect(element).toHaveClass('hydrated');
  });
});

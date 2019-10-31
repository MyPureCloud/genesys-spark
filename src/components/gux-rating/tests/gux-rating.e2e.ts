import { newE2EPage } from '@stencil/core/testing';

describe('gux-rating', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-rating></gux-rating>');
    const element = await page.find('gux-rating');
    expect(element).toHaveClass('hydrated');
  });

  it('renders should create stars', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-rating></gux-rating>');
    const components = await page.findAll('svg');
    expect(components.length).toBe(5);
  });
});

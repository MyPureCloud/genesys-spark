import { newE2EPage } from '@stencil/core/testing';

describe('gux-slider', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-slider lang="en"></gux-slider>');
    const element = await page.find('gux-slider');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes when value is incremented', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-slider lang="en"></gux-slider>');
    const component = await page.find('gux-slider');
    const input = await page.find('gux-slider input');
    expect(input).toHaveClass('gux-range-input');
    let val = await input.getProperty('value');
    expect(val).toBe('0');
    await input.press('ArrowRight');
    val = await input.getProperty('value');
    expect(val).toBe('1');
  });

  it('renders changes when value is incremented using step property', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-slider lang="en" step=1.5></gux-slider>');
    const component = await page.find('gux-slider');
    const input = await page.find('gux-slider input');
    expect(input).toHaveClass('gux-range-input');
    let val = await input.getProperty('value');
    expect(val).toBe('0');
    await input.press('ArrowRight');
    val = await input.getProperty('value');
    expect(val).toBe('1.5');
  });

  it('disable inputs when component is disabled', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<gux-slider lang="en" disabled="true"></gux-slider>'
    );
    const input = await page.find('gux-slider input');
    expect(input).toHaveClass('gux-range-input');
    const val = await input.getProperty('disabled');
    expect(val).toBe(true);
  });
});

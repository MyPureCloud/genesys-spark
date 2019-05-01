import { newE2EPage } from '@stencil/core/testing';

describe('gux-radio', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-radio></gux-radio>');
    const element = await page.find('gux-radio');
    expect(element).toHaveClass('hydrated');
  });

  it('switches between states when clicking different radios', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-radio>test label</gux-radio>');

    const radio = await page.find('gux-radio');
    const input = await radio.find('input');

    expect(await radio.getProperty('checked')).toEqual(false);

    await input.click();
    await page.waitForChanges();
    expect(await radio.getProperty('checked')).toEqual(true);
  });

  it('should render the assigned label', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<gux-radio>my label is so cool</gux-radio>'
    );
    const component = await page.find('gux-radio');
    const label = await component.find('label');

    expect(label.textContent).toContain('my label is so cool');
  });
});

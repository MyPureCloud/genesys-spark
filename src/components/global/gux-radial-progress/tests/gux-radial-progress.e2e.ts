import { newE2EPage } from '@stencil/core/testing'

describe('gux-radial-progress', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-radial-progress></gux-radial-progress>');
    const element = await page.find('gux-radial-progress');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the percentage data', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-radial-progress percentage=0 ></gux-radial-progress>');
    const component = await page.find('gux-radial-progress');
    const element = await page.find('gux-radial-progress');
    expect(element.textContent).toEqual(`0%`);

    component.setProperty('percentage', 30);
    await page.waitForChanges();
    expect(element.textContent).toEqual(`30%`);
  });

  it('renders a spinner if no percentage', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-radial-progress></gux-radial-progress>');
    const element = await page.find('.gux-spinner');
    expect(element).toBeTruthy();
  });
});

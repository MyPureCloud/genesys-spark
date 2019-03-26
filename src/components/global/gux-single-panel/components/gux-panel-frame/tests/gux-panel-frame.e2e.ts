import { newE2EPage } from '@stencil/core/testing'

describe('gux-panel-frame', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-panel-frame></gux-panel-frame>');
    const element = await page.find('gux-panel-frame');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-panel-frame></gux-panel-frame>');
    const component = await page.find('gux-panel-frame');
    const element = await page.find('gux-panel-frame >>> div');
    expect(element.textContent).toEqual(`Hello, World! I'm `);

    component.setProperty('first', 'James');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James`);

    component.setProperty('last', 'Quincy');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);

    component.setProperty('middle', 'Earl');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
  });
});

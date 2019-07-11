import { newE2EPage } from '@stencil/core/testing';

describe('gux-command-palette', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-command-palette></gux-command-palette>');
    const element = await page.find('gux-command-palette');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-command-palette></gux-command-palette>');
    const component = await page.find('gux-command-palette');
    const element = await page.find('gux-command-palette >>> div');
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

import { newE2EPage } from '@stencil/core/testing'

describe('genesys-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<genesys-dropdown></genesys-dropdown>');
    const element = await page.find('genesys-dropdown');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<genesys-dropdown></genesys-dropdown>');
    const component = await page.find('genesys-dropdown');
    const element = await page.find('genesys-dropdown >>> div');
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

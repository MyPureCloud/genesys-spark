import { newE2EPage } from '@stencil/core/testing';

describe('gux-list-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-list-item text="testing" value="testing"/>');
    const element = await page.find('gux-list-item');
    expect(element).toHaveClass('hydrated');
  });

  it('should have the correct display', async () => {
    const page = await newE2EPage();
    await page.setContent('<gux-list-item text="testing" value="testing"/>');

    const component = await page.find('gux-list-item');

    expect(component.getAttribute('role')).toBe('listitem');
    expect(component.innerText).toBe('testing');
  });

  it('should correctly slot elements', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<gux-list-item value="testing"><button id="custom">Test button</button></gux-list-item>'
    );

    const custom = await page.find('#custom');

    expect(custom.innerText).toBe('Test button');
  });

  it('should trigger an action when clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<gux-list-item text="testing" value="testing" tabindex="0"/>'
    );

    const component = await page.find('gux-list-item');
    const spy = await component.spyOnEvent('press');

    await component.click();
    await page.waitForChanges();

    expect(spy).toHaveReceivedEventDetail('testing');
  });

  it('should trigger an action when enter pressed', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<gux-list-item text="testing" value="testing" tabindex="0"/>'
    );

    const component = await page.find('gux-list-item');
    const spy = await component.spyOnEvent('press');

    await component.press('Enter');
    await page.waitForChanges();

    expect(spy).toHaveReceivedEventDetail('testing');
  });

  it('should trigger an action when space pressed', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<gux-list-item text="testing" value="testing" tabindex="0"/>'
    );

    const component = await page.find('gux-list-item');
    const spy = await component.spyOnEvent('press');

    await component.press('Space');
    await page.waitForChanges();

    expect(spy).toHaveReceivedEventDetail('testing');
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('gux-list-item-legacy', () => {
  it('renders', async () => {
    const page = await newE2EPage({
      html: '<gux-list-item-legacy text="testing" value="testing"/>'
    });

    const element = await page.find('gux-list-item-legacy');

    expect(element).toHaveAttribute('hydrated');
  });

  it('should have the correct display', async () => {
    const page = await newE2EPage({
      html: '<gux-list-item-legacy text="testing" value="testing"/>'
    });

    const component = await page.find('gux-list-item-legacy');
    const shadowDom = component.shadowRoot.querySelector('*');

    expect(component.getAttribute('role')).toBe('listitem');
    expect(shadowDom.textContent).toBe('testing');
  });

  it('should correctly slot elements', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<gux-list-item-legacy value="testing"><button id="custom">Test button</button></gux-list-item-legacy>'
    );

    const custom = await page.find('#custom');

    expect(custom.innerText).toBe('Test button');
  });

  it('should trigger an action when clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<gux-list-item-legacy text="testing" value="testing" tabindex="0"/>'
    );

    const component = await page.find('gux-list-item-legacy');
    const spy = await component.spyOnEvent('press');

    await component.click();
    await page.waitForChanges();

    expect(spy).toHaveReceivedEventDetail('testing');
  });

  it('should trigger an action when enter pressed', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<gux-list-item-legacy text="testing" value="testing" tabindex="0"/>'
    );

    const component = await page.find('gux-list-item-legacy');
    const spy = await component.spyOnEvent('press');

    await component.press('Enter');
    await page.waitForChanges();

    expect(spy).toHaveReceivedEventDetail('testing');
  });

  it('should trigger an action when space pressed', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<gux-list-item-legacy text="testing" value="testing" tabindex="0"/>'
    );

    const component = await page.find('gux-list-item-legacy');
    const spy = await component.spyOnEvent('press');

    await component.press('Space');
    await page.waitForChanges();

    expect(spy).toHaveReceivedEventDetail('testing');
  });
});

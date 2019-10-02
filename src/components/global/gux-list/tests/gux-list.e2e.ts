import { newE2EPage } from '@stencil/core/testing';
const focusedElementSelector = '[tabindex]:not([tabindex="-1"])';

describe('gux-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-list></gux-list>');
    const element = await page.find('gux-list');
    expect(element).toHaveClass('hydrated');
  });

  it('should select the next item on down arrow', async () => {
    const page = await newE2EPage();

    await page.setContent(`<gux-list>
      <gux-list-item value="test" text="first"/>
      <gux-list-item value="test2" text="test2"/>
    </gux-list>`);

    const element = await page.find('gux-list');
    await page.waitForChanges();

    await element.press('ArrowDown');
    await page.waitForChanges();

    const focused = await element.find(focusedElementSelector);
    expect(focused.innerText).toContain('test2');
  });

  it('should not select dividers on arrow down.', async () => {
    const page = await newE2EPage();

    await page.setContent(`<gux-list>
      <gux-list-item value="test" text="first"/>
      <gux-list-divider/>
      <gux-list-item value="test2" text="test2"/>
    </gux-list>`);

    const element = await page.find('gux-list');
    await page.waitForChanges();

    await element.press('ArrowDown');
    await page.waitForChanges();

    const focused = await element.find(focusedElementSelector);
    expect(focused.innerText).toContain('test2');
  });

  it('should not select disabled elements on arrow down.', async () => {
    const page = await newE2EPage();

    await page.setContent(`<gux-list>
      <gux-list-item value="test" text="first"/>
      <gux-list-item value="distest" text="disabled test" disabled="true" />
      <gux-list-item value="test2" text="test2"/>
    </gux-list>`);

    const element = await page.find('gux-list');
    await page.waitForChanges();

    await element.press('ArrowDown');
    await page.waitForChanges();

    const focused = await element.find(focusedElementSelector);
    expect(focused.innerText).toContain('test2');
  });

  it('should select the last item on end.', async () => {
    const page = await newE2EPage();

    await page.setContent(`<gux-list>
      <gux-list-item value="test" text="first"/>
      <gux-list-item value="test2" text="test2"/>
      <gux-list-item value="test3" text="test3"/>
    </gux-list>`);

    const element = await page.find('gux-list');
    await page.waitForChanges();

    await element.press('End');
    await page.waitForChanges();

    const focused = await element.find(focusedElementSelector);
    expect(focused.innerText).toContain('test3');
  });

  it('should select the previous item on arrow up.', async () => {
    const page = await newE2EPage();

    await page.setContent(`<gux-list>
      <gux-list-item value="test" text="first"/>
      <gux-list-item value="test2" text="test2"/>
      <gux-list-item value="test3" text="test3"/>
    </gux-list>`);

    const element = await page.find('gux-list');
    await page.waitForChanges();

    await element.press('ArrowDown');
    await page.waitForChanges();

    await element.press('ArrowUp');
    await page.waitForChanges();

    const focused = await element.find(focusedElementSelector);
    expect(focused.innerText).toContain('first');

    const firstSelected = await element.callMethod('isFirstItemSelected');
    expect(firstSelected).toBeTruthy();
  });

  it('should select the first item on home pressed.', async () => {
    const page = await newE2EPage();

    await page.setContent(`<gux-list>
      <gux-list-item value="test" text="first"/>
      <gux-list-item value="test2" text="test2"/>
      <gux-list-item value="test3" text="test3"/>
    </gux-list>`);

    const element = await page.find('gux-list');
    await page.waitForChanges();

    await element.press('ArrowDown');
    await page.waitForChanges();

    await element.press('Home');
    await page.waitForChanges();

    const focused = await element.find(focusedElementSelector);
    expect(focused.innerText).toContain('first');
  });

  it('should set focus to first item when requested', async () => {
    const page = await newE2EPage();

    await page.setContent(`<gux-list>
      <gux-list-item value="test" text="first"/>
      <gux-list-item value="test2" text="test2"/>
    </gux-list>`);

    const element = await page.find('gux-list');
    await page.waitForChanges();

    await element.callMethod('setFocusOnFirstItem');
    await page.waitForChanges();

    const firstSelected = await element.callMethod('isFirstItemSelected');
    expect(firstSelected).toBeTruthy();

    const focused = await element.find(focusedElementSelector);
    expect(focused.innerText).toContain('first');
  });

  it('should set focus to last item when requested', async () => {
    const page = await newE2EPage();

    await page.setContent(`<gux-list>
      <gux-list-item value="test" text="first"/>
      <gux-list-item value="test2" text="test2"/>
    </gux-list>`);

    const element = await page.find('gux-list');
    await page.waitForChanges();

    await element.callMethod('setFocusOnLastItem');
    await page.waitForChanges();

    const lastSelected = await element.callMethod('isLastItemSelected');
    expect(lastSelected).toBeTruthy();

    const focused = await element.find(focusedElementSelector);
    expect(focused.innerText).toContain('test2');
  });
});

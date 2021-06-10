import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('gux-command-palette', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<gux-command-palette-beta lang="en"></gux-command-palette-beta>'
    );
    const element = await page.find('gux-command-palette-beta');
    expect(element).toHaveClass('hydrated');
  });

  it('shows the palette when opened', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <gux-command-palette-beta lang="en">
      <gux-command-action text="test"></gux-command-action>
    </gux-command-palette-beta>`);

    await page.waitForChanges();
    let component = await page.find('gux-command-palette-beta');

    await component.callMethod('open');

    await page.waitForChanges();
    component = await page.find('gux-command-palette-beta');
    expect(component.classList.contains('hidden')).toBeFalsy();
  });

  it('shows recent items if available', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <gux-command-palette-beta lang="en">
      <gux-command-action text="test" recent></gux-command-action>
    </gux-command-palette-beta>`);

    await page.waitForChanges();

    const component = await page.find('gux-command-palette-beta');
    await component.callMethod('open');
    await page.waitForChanges();

    const lists = await page.findAll('gux-list');

    expect(lists.length).toBe(1);
    const items = await page.findAll('gux-list-item');

    expect(items.length).toBe(1);
    expect(items[0].innerText).toBe('test');

    const header = await page.find('strong');
    expect(header.innerText).toBe('Recently Searched:');
  });

  it('shows common items if available', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <gux-command-palette-beta lang="en">
      <gux-command-action text="test" common></gux-command-action>
    </gux-command-palette-beta>`);

    await page.waitForChanges();

    const component = await page.find('gux-command-palette-beta');
    await component.callMethod('open');
    await page.waitForChanges();

    const lists = await page.findAll('gux-list');

    expect(lists.length).toBe(1);
    const items = await page.findAll('gux-list-item');

    expect(items.length).toBe(1);
    expect(items[0].innerText).toBe('test');

    const header = await page.find('strong');
    expect(header.innerText).toBe('Common Searches:');
  });

  it('shows common and recent items if available', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <gux-command-palette-beta lang="en">
      <gux-command-action text="test" common></gux-command-action>
      <gux-command-action text="test2" recent></gux-command-action>
    </gux-command-palette-beta>`);

    await page.waitForChanges();

    const component = await page.find('gux-command-palette-beta');
    await component.callMethod('open');
    await page.waitForChanges();

    const lists = await page.findAll('gux-list');

    expect(lists.length).toBe(2);
    const items = await page.findAll('gux-list-item');

    expect(items.length).toBe(2);
    expect(items[0].innerText).toBe('test2');
    expect(items[1].innerText).toBe('test');

    const headers = await page.findAll('strong');
    expect(headers[0].innerText).toBe('Recently Searched:');
    expect(headers[1].innerText).toBe('Common Searches:');
  });

  it('shows all items if command and recent are not available', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <gux-command-palette-beta lang="en">
      <gux-command-action text="test"></gux-command-action>
      <gux-command-action text="test2"></gux-command-action>
    </gux-command-palette-beta>`);

    await page.waitForChanges();

    const component = await page.find('gux-command-palette-beta');
    await component.callMethod('open');
    await page.waitForChanges();

    const lists = await page.findAll('gux-list');

    expect(lists.length).toBe(1);
    const items = await page.findAll('gux-list-item');

    expect(items.length).toBe(2);
    expect(items[0].innerText).toBe('test');
    expect(items[1].innerText).toBe('test2');

    const headers = await page.findAll('strong');
    expect(headers.length).toBe(0);
  });

  it('filters all commands', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <gux-command-palette-beta lang="en">
      <gux-command-action text="test" common></gux-command-action>
      <gux-command-action text="test2"></gux-command-action>
      <gux-command-action text="test3" recent></gux-command-action>
    </gux-command-palette-beta>`);

    await page.waitForChanges();

    const component = await page.find('gux-command-palette-beta');
    await component.callMethod('open');
    await page.waitForChanges();

    const search = await component.find('input');
    await search.press('KeyT');
    await page.waitForChanges();

    const lists = await page.findAll('gux-list');

    expect(lists.length).toBe(2);
    const items = await page.findAll('gux-list-item');

    expect(items.length).toBe(4);
    expect(items[0].innerText).toBe('test3');
    expect(items[1].innerText).toBe('test');
    expect(items[2].innerText).toBe('test2');
  });

  it('should not show common search on exact match', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <gux-command-palette-beta lang="en">
      <gux-command-action text="apple" common></gux-command-action>
      <gux-command-action text="orange"></gux-command-action>
      <gux-command-action text="pear" recent></gux-command-action>
    </gux-command-palette-beta>`);

    await page.waitForChanges();

    const component = await page.find('gux-command-palette-beta');
    await component.callMethod('open');
    await page.waitForChanges();

    const search = await component.find('input');
    await search.press('KeyO');
    await search.press('KeyR');
    await page.waitForChanges();

    const lists = await page.findAll('gux-list');

    expect(lists.length).toBe(1);
    const items = await page.findAll('gux-list-item');

    expect(items.length).toBe(1);
    expect(items[0].innerText).toBe('orange');
  });

  it('shows limit when there are too many items.', async () => {
    const page = await newE2EPage();

    function buildItems(count: number) {
      let retVal = '';
      for (let i = 0; i < count; i++) {
        retVal += `
          <gux-command-action text="test${i}"></gux-command-action>
        `;
      }

      return retVal;
    }

    await page.setContent(`
    <gux-command-palette-beta lang="en">
      <gux-command-action text="apple" common></gux-command-action>
      <gux-command-action text="pear" recent></gux-command-action>
      ${buildItems(60)}
    </gux-command-palette-beta>`);

    await page.waitForChanges();

    const component = await page.find('gux-command-palette-beta');
    await component.callMethod('open');
    await page.waitForChanges();

    const search = await component.find('input');
    await search.press('KeyT');
    await page.waitForChanges();

    const limit = await page.find('.gux-limit');

    expect(limit.innerText).toBe(
      'Results limited, refine your search for more commands.'
    );
  });

  describe('keyboard navigation', () => {
    let page: E2EPage;
    let commandPallete: E2EElement;
    beforeEach(async () => {
      page = await newE2EPage();

      await page.setContent(`
      <gux-command-palette-beta lang="en">
        <gux-command-action text="common" common></gux-command-action>
        <gux-command-action text="recent" recent></gux-command-action>
      </gux-command-palette-beta>`);

      await page.waitForChanges();

      commandPallete = await page.find('gux-command-palette-beta');
      await commandPallete.callMethod('open');
      await page.waitForChanges();
      await page.waitFor(500);
    });

    it('should navigate to recent list on key down', async () => {
      await commandPallete.press('ArrowDown');
      await page.waitForChanges();

      const focusedELement = await page.find(':focus');
      expect(focusedELement.outerHTML).toContain('recent');
    });

    it('should navigate to common list on key downs', async () => {
      await commandPallete.press('ArrowDown');
      await page.waitForChanges();
      await commandPallete.press('ArrowDown');
      await page.waitForChanges();

      const focusedELement = await page.find(':focus');
      expect(focusedELement.outerHTML).toContain('common');
    });

    it('should navigate back to search on key up', async () => {
      await commandPallete.press('ArrowDown');
      await page.waitForChanges();
      await commandPallete.press('ArrowDown');
      await page.waitForChanges();
      await commandPallete.press('ArrowUp');
      await page.waitForChanges();
      await commandPallete.press('ArrowUp');
      await page.waitForChanges();

      const focusedELement = await page.find(':focus');
      expect(focusedELement.nodeName).toBe('INPUT');
    });
  });
});

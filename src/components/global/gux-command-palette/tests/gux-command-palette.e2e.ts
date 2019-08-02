import { newE2EPage } from '@stencil/core/testing';

describe('gux-command-palette', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-command-palette></gux-command-palette>');
    const element = await page.find('gux-command-palette');
    expect(element).toHaveClass('hydrated');
  });

  it('shows the palette when opened', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <gux-command-palette>
      <gux-command-action text="test"></gux-command-action>
    </gux-command-palette>`);

    await page.waitForChanges();
    let component = await page.find('gux-command-palette');

    await component.callMethod('open');

    await page.waitForChanges();
    component = await page.find('gux-command-palette');
    expect(component.classList.contains('hidden')).toBeFalsy();
  });

  it('shows recent items if available', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <gux-command-palette>
      <gux-command-action text="test" recent></gux-command-action>
    </gux-command-palette>`);

    await page.waitForChanges();

    const component = await page.find('gux-command-palette');
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
    <gux-command-palette>
      <gux-command-action text="test" common></gux-command-action>
    </gux-command-palette>`);

    await page.waitForChanges();

    const component = await page.find('gux-command-palette');
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
    <gux-command-palette>
      <gux-command-action text="test" common></gux-command-action>
      <gux-command-action text="test2" recent></gux-command-action>
    </gux-command-palette>`);

    await page.waitForChanges();

    const component = await page.find('gux-command-palette');
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
    <gux-command-palette>
      <gux-command-action text="test"></gux-command-action>
      <gux-command-action text="test2"></gux-command-action>
    </gux-command-palette>`);

    await page.waitForChanges();

    const component = await page.find('gux-command-palette');
    await component.callMethod('open');
    await page.waitForChanges();

    const lists = await page.findAll('gux-list');

    expect(lists.length).toBe(1);
    const items = await page.findAll('gux-list-item');

    expect(items.length).toBe(2);
    expect(items[0].innerText).toBe('test2');
    expect(items[1].innerText).toBe('test');

    const headers = await page.findAll('strong');
    expect(headers.length).toBe(0);
  });

  it('filters all commands', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <gux-command-palette>
      <gux-command-action text="test" common></gux-command-action>
      <gux-command-action text="test2"></gux-command-action>
      <gux-command-action text="test3" recent></gux-command-action>
    </gux-command-palette>`);

    await page.waitForChanges();

    const component = await page.find('gux-command-palette');
    await component.callMethod('open');
    await page.waitForChanges();

    const search = await (await page.find('gux-search')).find('input');
    await search.press('KeyT');
    await page.waitForChanges();

    const lists = await page.findAll('gux-list');

    expect(lists.length).toBe(1);
    const items = await page.findAll('gux-list-item');

    expect(items.length).toBe(3);
    expect(items[0].innerText).toBe('test');
    expect(items[1].innerText).toBe('test2');
    expect(items[2].innerText).toBe('test3');
  });

  it('shows common search on exact match', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <gux-command-palette>
      <gux-command-action text="apple" common></gux-command-action>
      <gux-command-action text="orange"></gux-command-action>
      <gux-command-action text="pear" recent></gux-command-action>
    </gux-command-palette>`);

    await page.waitForChanges();

    const component = await page.find('gux-command-palette');
    await component.callMethod('open');
    await page.waitForChanges();

    const search = await (await page.find('gux-search')).find('input');
    await search.press('KeyO');
    await search.press('KeyR');
    await page.waitForChanges();

    const lists = await page.findAll('gux-list');

    expect(lists.length).toBe(2);
    const items = await page.findAll('gux-list-item');

    expect(items.length).toBe(2);
    expect(items[0].innerText).toBe('orange');
    expect(items[1].innerText).toBe('apple');

    const headers = await page.findAll('strong');
    expect(headers.length).toBe(2);
    expect(headers[1].innerText).toBe('Common Searches:');
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
    <gux-command-palette>
      <gux-command-action text="apple" common></gux-command-action>
      <gux-command-action text="pear" recent></gux-command-action>
      ${buildItems(60)}
    </gux-command-palette>`);

    await page.waitForChanges();

    const component = await page.find('gux-command-palette');
    await component.callMethod('open');
    await page.waitForChanges();

    const search = await (await page.find('gux-search')).find('input');
    await search.press('KeyT');
    await page.waitForChanges();

    const limit = await page.find('.limit');

    expect(limit.innerText).toBe(
      'Results limited, refine your search for more commands.'
    );
  });
});

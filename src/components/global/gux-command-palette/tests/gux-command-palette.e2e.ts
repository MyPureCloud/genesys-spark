import { newE2EPage } from '@stencil/core/testing';

describe('gux-command-palette', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-command-palette></gux-command-palette>');
    const element = await page.find('gux-command-palette');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the commands data', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-command-palette></gux-command-palette>');
    const component = await page.find('gux-command-palette');

    component.setAttribute('recentItems', [
      {
        callback: i => {
          alert('test:' + JSON.stringify(i));
        },
        text: 'test'
      }
    ]);

    component.setAttribute('allItems', [
      {
        callback: i => {
          alert('test:' + JSON.stringify(i));
        },
        shortcut: '⌘ T',
        text: 'test'
      },
      {
        callback: i => {
          alert('test2:' + JSON.stringify(i));
        },
        text: 'apple'
      },
      {
        callback: i => {
          alert('test3:' + JSON.stringify(i));
        },
        text: 'bannana'
      }
    ]);

    page.waitForChanges();
    const items = page.find('gux-command-palette > gux-list');
    expect(items).not.toBeUndefined();
  });
});

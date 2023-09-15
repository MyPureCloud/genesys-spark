import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { GuxList } from 'components/stable/gux-list/gux-list';
import { GuxListItem } from 'components/stable/gux-list/gux-list-item/gux-list-item';
import { GuxButton } from '../../../stable/gux-button/gux-button';
import { GuxContextMenu } from '../gux-context-menu';

const components = [GuxContextMenu, GuxButton, GuxList, GuxListItem];
const html = `
<gux-context-menu>
  <gux-list-item onclick="notify(event)">Test 1</gux-list-item>
  <gux-list-item onclick="notify(event)">Test 2</gux-list-item>
  <gux-list-item onclick="notify(event)">Test 3</gux-list-item>
</gux-context-menu>
`;

describe('gux-context-menu', () => {
  let page: SpecPage;
  let component: GuxContextMenu;

  beforeEach(async () => {
    page = await newSpecPage({
      components,
      html,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxContextMenu);
  });

  it('renders', async () => {
    expect(page.root).toMatchSnapshot();
  });

  // Mouse events
  it('should display the menu and focus on first list item on click', () => {
    const focusFirstListItemSpy = jest.spyOn(
      component as any,
      'focusFirstListItem'
    );
    expect((component as any).isOpen).toBe(false);

    (component as any).button.click();

    expect(focusFirstListItemSpy).toHaveBeenCalledTimes(1);
    expect((component as any).isOpen).toBe(true);
  });

  it('should hide on click outside the component', () => {
    (component as any).button.click();
    page.body.click();

    expect((component as any).isOpen).toBe(false);
  });
});

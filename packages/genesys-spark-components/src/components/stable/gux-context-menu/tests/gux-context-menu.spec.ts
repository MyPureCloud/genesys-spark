import { newSpecPage } from '@stencil/core/testing';
import { GuxList } from '@components/stable/gux-list/gux-list';
import { GuxListItem } from '@components/stable/gux-list/gux-list-item/gux-list-item';
import { GuxButton } from '@components/stable/gux-button/gux-button';
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
  it('should build', async () => {
    const page = await newSpecPage({
      components,
      html,
      language: 'en'
    });

    expect(page.rootInstance).toBeInstanceOf(GuxContextMenu);
  });

  it('renders', async () => {
    const page = await newSpecPage({
      components,
      html,
      language: 'en'
    });

    expect(page.root).toMatchSnapshot();
  });
});

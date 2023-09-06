import { newSpecPage } from '@stencil/core/testing';
import { GuxTableSelectMenu } from '../gux-table-select-menu';

const components = [GuxTableSelectMenu];
const language = 'en';

describe('gux-table-select-menu', () => {
  it('should build', async () => {
    const html = `
      <gux-table-select-menu>
        <gux-all-row-select></gux-all-row-select>
        <gux-list slot="select-menu-options">
          <gux-list-item onclick="notify(event)">
            All on page
          </gux-list-item>
          <gux-list-item onclick="notify(event)"> None </gux-list-item>
          <gux-list-item onclick="notify(event)">
            Bring selected to top
          </gux-list-item>
        </gux-list>
      </gux-table-select-menu>
    `;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxTableSelectMenu);
  });
});

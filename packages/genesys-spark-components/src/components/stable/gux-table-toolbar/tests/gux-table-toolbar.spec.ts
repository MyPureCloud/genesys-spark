jest.mock('../../../../utils/decorator/on-resize', () => ({
  __esModule: true,
  OnResize: jest.fn()
}));

import { newSpecPage } from '@stencil/core/testing';
import { GuxTableToolbar } from '../gux-table-toolbar';
import { GuxTableToolbarAction } from '../gux-table-toolbar-action/gux-table-toolbar-action';
import { GuxTableToolbarMenuButton } from '../gux-table-toolbar-menu-button/gux-table-toolbar-menu-button';
import MutationObserver from 'mutation-observer';
import { GuxTableToolbarCustomAction } from '../gux-table-toolbar-custom-action/gux-table-toolbar-custom-action';

const components = [
  GuxTableToolbar,
  GuxTableToolbarAction,
  GuxTableToolbarCustomAction,
  GuxTableToolbarMenuButton
];
const language = 'en';

beforeEach(async () => {
  global.MutationObserver = MutationObserver;
});

const html = `<gux-table-toolbar-beta>
<div slot="search-and-filter">
  <gux-form-field-search label-position="screenreader">
    <input slot="input" type="search" name="a-3" placeholder="Enter search" />
    <label slot="label">Toolbar Search</label>
  </gux-form-field-search>
  <gux-table-toolbar-custom-action>
    <span slot="text">Filter</span>
    <gux-icon slot="icon" icon-name="filter" decorative></gux-icon>
  </gux-table-toolbar-custom-action>
</div>

<div slot="contextual-actions">
  <gux-table-toolbar-action action="delete"></gux-table-toolbar-action>
</div>

<div slot="permanent-actions">
  <gux-table-toolbar-action action="export"></gux-table-toolbar-action>
  <gux-table-toolbar-action action="refresh"></gux-table-toolbar-action>
  <gux-table-toolbar-action action="revert"></gux-table-toolbar-action>
  <gux-table-toolbar-action action="import"></gux-table-toolbar-action>
</div>

<div slot="menu-actions">
  <gux-table-toolbar-action action="export"></gux-table-toolbar-action>
  <gux-table-toolbar-action action="refresh"></gux-table-toolbar-action>
</div>

<gux-table-toolbar-custom-action slot="primary" accent="primary">
  <span slot="text">Add</span>
  <gux-icon slot="icon" icon-name="add" decorative></gux-icon>
</gux-table-toolbar-custom-action>
</gux-table-toolbar-beta>
`;

describe('gux-table-toolbar-beta', () => {
  describe('#render', () => {
    it(`should render table toolbar as expected`, async () => {
      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxTableToolbar);
      expect(page.root).toMatchSnapshot();
    });
  });
});

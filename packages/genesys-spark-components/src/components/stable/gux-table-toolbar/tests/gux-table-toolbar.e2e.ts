import { a11yCheck, newSparkE2EPage } from '../../../../test/e2eTestUtils';

describe('gux-table-toolbar', () => {
  const html = `<gux-table-toolbar>
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
</gux-table-toolbar>

    `;
  describe('#render', () => {
    it('renders', async () => {
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-table-toolbar');

      await a11yCheck(page);

      expect(element).toHaveAttribute('hydrated');
    });
  });
});

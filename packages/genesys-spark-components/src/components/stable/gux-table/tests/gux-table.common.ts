const tableContent = `
    <table slot="data">
      <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th data-cell-numeric>Age</th>
          <th data-cell-action>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John</td>
          <td>Doe</td>
          <td data-cell-numeric>25</td>
          <td data-cell-action>Delete</td>
        </tr>
        <tr>
          <td>Jane</td>
          <td>Doe</td>
          <td data-cell-numeric>23</td>
          <td data-cell-action>Delete</td>
        </tr>
        <tr>
          <td>Jane</td>
          <td>Doe</td>
          <td data-cell-numeric>21</td>
          <td data-cell-action>Delete</td>
        </tr>
        <tr>
          <td>Jane</td>
          <td>Doe</td>
          <td data-cell-numeric>23</td>
          <td data-cell-action>Delete</td>
        </tr>
      </tbody>
    </table>
  `;

export const emptyTableRenderConfig = {
  description: 'empty table',
  html: `
        <gux-table>
          <table slot="data">
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th data-cell-numeric>Age</th>
                <th data-cell-action>Action</th>
              </tr>
            </thead>
          </table>
        </gux-table>
        `
};

export const selectableTableRenderConfig = {
  description: 'should render a gux-table-select menu',
  html: `
          <gux-table>
            <table slot="data">
              <thead>
                <tr data-row-id="head">
                  <th>
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

                  </th>
                  <th data-column-name="first-name">First name</th>
                  <th data-column-name="last-name">Last name</th>
                  <th data-column-name="age" data-cell-numeric>Age</th>
                  <th data-column-name="action" data-cell-action>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr data-row-id="person-id-1">
                  <td><gux-row-select disabled></gux-row-select></td>
                  <td>John</td>
                  <td>Doe</td>
                  <td data-cell-numeric>25</td>
                  <td data-cell-action>Delete</td>
                </tr>
                <tr data-row-id="person-id-2">
                  <td><gux-row-select></gux-row-select></td>
                  <td>Jane</td>
                  <td>Doe</td>
                  <td data-cell-numeric>23</td>
                  <td data-cell-action>Delete</td>
                </tr>
                <tr data-row-id="person-id-3">
                  <td><gux-row-select disabled></gux-row-select></td>
                  <td>Jane</td>
                  <td>Doe</td>
                  <td data-cell-numeric>21</td>
                  <td data-cell-action>Delete</td>
                </tr>
                <tr data-row-id="person-id-4">
                  <td><gux-row-select></gux-row-select></td>
                  <td>Jane</td>
                  <td>Doe</td>
                  <td data-cell-numeric>23</td>
                  <td data-cell-action>Delete</td>
                </tr>
              </tbody>
            </table>
          </gux-table>
        `
};

export const renderConfigs = [
  emptyTableRenderConfig,
  selectableTableRenderConfig,
  {
    description: 'should render data table',
    html: `<gux-table>${tableContent}</gux-table>`
  },
  {
    description: 'should render compact data table',
    html: `<gux-table compact>${tableContent}</gux-table>`
  },
  {
    description: 'should render object table',
    html: `<gux-table object-table>${tableContent}</gux-table>`
  },

  {
    description: 'should render table with vertical scroll',
    html: `<gux-table style="height: 150px">${tableContent}</gux-table>`
  },
  {
    description: 'should render table with horizontal scroll',
    html: `<gux-table style="width: 300px">${tableContent}</gux-table>`
  },
  {
    description: 'should render table with rows selection',
    html: `<gux-table object-table selectable-rows>${tableContent}</gux-table>`
  },
  {
    description: 'should render empty table with rows selection',
    html: `
          <gux-table object-table selectable-rows>
            <table slot="data">
              <thead>
                <tr>
                  <th>First name</th>
                  <th>Last name</th>
                  <th data-cell-numeric>Age</th>
                  <th data-cell-action>Action</th>
                </tr>
              </thead>
            </table>
          </gux-table>
        `
  }
];

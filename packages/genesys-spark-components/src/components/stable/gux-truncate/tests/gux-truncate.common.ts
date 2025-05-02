export const renderConfigs = [
  {
    description: 'should truncate slotted text node',
    html: '<gux-truncate style="inline-size: 100px">Some text to truncate</gux-truncate>'
  },
  {
    description: 'should truncate slotted span',
    html: '<gux-truncate style="inline-size: 100px"><span>Some text to truncate in a span</span></gux-truncate>'
  },
  {
    description: 'should truncate slotted div',
    html: '<gux-truncate style="inline-size: 100px"><div>Div <span>with a span</span> inside</div></gux-truncate>'
  },
  {
    description: 'should truncate after max lines displayed',
    html: `
      <div style="inline-size: 100px; padding: 1px; border: 1px solid black">
        <gux-truncate max-lines="3">
          This is a long text that should be truncated after three lines of wrapped
          text
        </gux-truncate>
      </div>
    `
  },
  {
    description:
      'should not truncate slotted text node if it is not overflowing',
    html: '<gux-truncate>Some text to truncate</gux-truncate>'
  },
  {
    description: 'should not truncate slotted span if it is not overflowing',
    html: '<gux-truncate><span>Some text to truncate in a span</span></gux-truncate>'
  },
  {
    description: 'should not truncate slotted div if it is not overflowing',
    html: '<gux-truncate><div>Div <span>with a span</span> inside</div></gux-truncate>'
  },
  {
    description: 'should truncate in a table cell',
    html: `
      <gux-table>
        <table style="inline-size: 100%; table-layout: fixed" slot="data">
          <thead>
            <tr>
              <th data-column-name="first-name">First name</th>
              <th data-column-name="last-name">Last name</th>
              <th data-colum-name="summary">Summary</th>
              <th data-column-name="age" data-cell-numeric>Age</th>
              <th data-column-name="action" data-cell-action>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John</td>
              <td>Doe</td>
              <td>
                <gux-truncate
                  >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.</gux-truncate
                >
              </td>
              <td data-cell-numeric>25</td>
              <td data-cell-action>Delete</td>
            </tr>
          </tbody>
        </table>
      </gux-table>
    `
  }
];

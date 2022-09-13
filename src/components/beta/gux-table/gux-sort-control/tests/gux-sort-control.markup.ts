export default {
  notSorted: {
    description: 'Not sorted',
    html: `
      <gux-table-beta>
      <table slot="data">
        <thead>
          <tr>
            <th data-column-name="c1">Column Header 1 <gux-sort-control /></th>
            <th data-column-name="c2">Column Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Column 1, Row 1</td>
            <td>Column 2, Row 1</td>
          </tr>
        </tbody>
      </table>
      </gux-table-beta>
    `,
    onclickSortDirection: 'ascending'
  },
  sortedAscending: {
    description: 'Sorted ascending',
    html: `
    <gux-table-beta>
      <table slot="data">
        <thead>
          <tr>
            <th data-column-name="c1" aria-sort="ascending">Column Header 1 <gux-sort-control /></th>
            <th data-column-name="c2">Column Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Column 1, Row 1</td>
            <td>Column 2, Row 1</td>
          </tr>
        </tbody>
      </table>
      </gux-table-beta>
    `,
    onclickSortDirection: 'descending'
  },
  sortedDescending: {
    description: 'Sorted descending',
    html: `
    <gux-table-beta>
      <table slot="data">
        <thead>
          <tr>
            <th data-column-name="c1" aria-sort="descending">Column Header 1 <gux-sort-control /></th>
            <th data-column-name="c2">Column Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Column 1, Row 1</td>
            <td>Column 2, Row 1</td>
          </tr>
        </tbody>
      </table>
      </gux-table-beta>
    `,
    onclickSortDirection: 'ascending'
  },
  sortedDescendingUnsortedAllowed: {
    description: 'Sorted descending, unsorted allowed',
    html: `
    <gux-table-beta>
      <table slot="data">
        <thead>
          <tr>
            <th data-column-name="c1" aria-sort="descending">Column Header 1 <gux-sort-control include-unsorted/></th>
            <th data-column-name="c2">Column Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Column 1, Row 1</td>
            <td>Column 2, Row 1</td>
          </tr>
        </tbody>
      </table>
      </gux-table-beta>
    `,
    onclickSortDirection: 'none'
  },
  resizableNoDataCell: {
    description: 'Resizable no data cell, icon is aligned to the right',
    html: `
    <gux-table-beta resizable-columns>
      <table slot="data">
        <thead>
          <tr>
            <th data-column-name="c1" aria-sort="ascending">Column Header 1 <gux-sort-control />
            <span aria-hidden="true" style="padding-left:24px"></span>
            </th>
            <th data-column-name="c2">Column Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Column 1, Row 1</td>
            <td>Column 2, Row 1</td>
          </tr>
        </tbody>
      </table>
      </gux-table-beta>
    `,
    onclickSortDirection: 'descending'
  },
  resizableDataCellAction: {
    description: 'Resizable data cell action, icon is aligned to the left',
    html: `
    <gux-table-beta resizable-columns>
      <table slot="data">
        <thead>
          <tr>
            <th data-column-name="c1" data-cell-action aria-sort="ascending">Column Header 1 <gux-sort-control />
            <span aria-hidden="true" style="float:left;padding-right:42px"></span>
            </th>
            <th data-column-name="c2">Column Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Column 1, Row 1</td>
            <td>Column 2, Row 1</td>
          </tr>
        </tbody>
      </table>
      </gux-table-beta>
    `,
    onclickSortDirection: 'descending'
  },
  resizableDataCellNumeric: {
    description: 'Resizable data cell numeric, icon is aligned to the left',
    html: `
    <gux-table-beta resizable-columns>
      <table slot="data">
        <thead>
          <tr>
            <th data-column-name="c1" data-cell-numeric aria-sort="ascending">Column Header 1 <gux-sort-control />
            <span aria-hidden="true" style="float:left;padding-right:42px"></span>
            </th>
            <th data-column-name="c2">Column Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Column 1, Row 1</td>
            <td>Column 2, Row 1</td>
          </tr>
        </tbody>
      </table>
      </gux-table-beta>
    `,
    onclickSortDirection: 'descending'
  }
};

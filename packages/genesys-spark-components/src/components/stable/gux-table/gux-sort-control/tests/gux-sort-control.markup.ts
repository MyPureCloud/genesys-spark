export default {
  notSorted: {
    description: 'Not sorted',
    html: `
      <table>
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
    `,
    onclickSortDirection: 'ascending'
  },
  sortedAscending: {
    description: 'Sorted ascending',
    html: `
      <table>
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
    `,
    onclickSortDirection: 'descending'
  },
  sortedDescending: {
    description: 'Sorted descending',
    html: `
      <table>
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
    `,
    onclickSortDirection: 'ascending'
  },
  sortedDescendingUnsortedAllowed: {
    description: 'Sorted descending, unsorted allowed',
    html: `
      <table>
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
    `,
    onclickSortDirection: 'none'
  }
};

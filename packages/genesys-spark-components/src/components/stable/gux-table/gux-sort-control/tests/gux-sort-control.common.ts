export const renderConfigs = [
  {
    description: 'should render sort control in unsorted state',
    html: `
<gux-table resizable-columns id="sortable-table">
  <table slot="data">
    <thead>
      <tr>
        <th data-column-name="name">Name <gux-sort-control /></th>
        <th data-column-name="last-name">
          Last name
        </th>
        <th data-column-name="age" data-cell-numeric>
          Age
        </th>
        <th data-column-name="action" data-cell-action>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Adam</td>
        <td>Ant</td>
        <td data-cell-numeric>25</td>
        <td data-cell-action>Delete</td>
      </tr>
      <tr>
        <td>Billy</td>
        <td>Bat</td>
        <td data-cell-numeric>28</td>
        <td data-cell-action>Delete</td>
      </tr>
      <tr>
        <td>Cathy</td>
        <td>Cat</td>
        <td data-cell-numeric>31</td>
        <td data-cell-action>Delete</td>
      </tr>
      <tr>
        <td>Debbie</td>
        <td>Dog</td>
        <td data-cell-numeric>33</td>
        <td data-cell-action>Delete</td>
      </tr>
    </tbody>
  </table>
</gux-table>
    `
  },
  {
    description: 'should render sort control in ascending state',
    html: `
<gux-table resizable-columns id="sortable-table">
  <table slot="data">
    <thead>
      <tr>
        <th data-column-name="name" aria-sort="ascending">Name <gux-sort-control /></th>
        <th data-column-name="last-name">
          Last name
        </th>
        <th data-column-name="age" data-cell-numeric>
          Age
        </th>
        <th data-column-name="action" data-cell-action>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Adam</td>
        <td>Ant</td>
        <td data-cell-numeric>25</td>
        <td data-cell-action>Delete</td>
      </tr>
      <tr>
        <td>Billy</td>
        <td>Bat</td>
        <td data-cell-numeric>28</td>
        <td data-cell-action>Delete</td>
      </tr>
      <tr>
        <td>Cathy</td>
        <td>Cat</td>
        <td data-cell-numeric>31</td>
        <td data-cell-action>Delete</td>
      </tr>
      <tr>
        <td>Debbie</td>
        <td>Dog</td>
        <td data-cell-numeric>33</td>
        <td data-cell-action>Delete</td>
      </tr>
    </tbody>
  </table>
</gux-table>
    `
  },
  {
    description: 'should render sort control in descending state',
    html: `
<gux-table resizable-columns id="sortable-table">
  <table slot="data">
    <thead>
      <tr>
        <th data-column-name="name" aria-sort="descending">Name <gux-sort-control /></th>
        <th data-column-name="last-name">
          Last name
        </th>
        <th data-column-name="age" data-cell-numeric>
          Age
        </th>
        <th data-column-name="action" data-cell-action>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Adam</td>
        <td>Ant</td>
        <td data-cell-numeric>25</td>
        <td data-cell-action>Delete</td>
      </tr>
      <tr>
        <td>Billy</td>
        <td>Bat</td>
        <td data-cell-numeric>28</td>
        <td data-cell-action>Delete</td>
      </tr>
      <tr>
        <td>Cathy</td>
        <td>Cat</td>
        <td data-cell-numeric>31</td>
        <td data-cell-action>Delete</td>
      </tr>
      <tr>
        <td>Debbie</td>
        <td>Dog</td>
        <td data-cell-numeric>33</td>
        <td data-cell-action>Delete</td>
      </tr>
    </tbody>
  </table>
</gux-table>
    `
  },
  {
    description: 'should render sort control with include-unsorted enabled',
    html: `
<gux-table resizable-columns id="sortable-table">
  <table slot="data">
    <thead>
      <tr>
          <th data-column-name="name">Name <gux-sort-control include-unsorted /></th>
        <th data-column-name="last-name">
          Last name
        </th>
        <th data-column-name="age" data-cell-numeric>
          Age
        </th>
        <th data-column-name="action" data-cell-action>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Adam</td>
        <td>Ant</td>
        <td data-cell-numeric>25</td>
        <td data-cell-action>Delete</td>
      </tr>
      <tr>
        <td>Billy</td>
        <td>Bat</td>
        <td data-cell-numeric>28</td>
        <td data-cell-action>Delete</td>
      </tr>
      <tr>
        <td>Cathy</td>
        <td>Cat</td>
        <td data-cell-numeric>31</td>
        <td data-cell-action>Delete</td>
      </tr>
      <tr>
        <td>Debbie</td>
        <td>Dog</td>
        <td data-cell-numeric>33</td>
        <td data-cell-action>Delete</td>
      </tr>
    </tbody>
  </table>
</gux-table>
    `
  },
  {
    description: 'should render sort control in numeric column',
    html: `
<gux-table resizable-columns id="sortable-table">
  <table slot="data">
    <thead>
      <tr>
         <th data-column-name="age" data-cell-numeric>Age <gux-sort-control /></th>
        <th data-column-name="last-name">
          Last name
        </th>
        <th data-column-name="age" data-cell-numeric>
          Age
        </th>
        <th data-column-name="action" data-cell-action>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Adam</td>
        <td>Ant</td>
        <td data-cell-numeric>25</td>
        <td data-cell-action>Delete</td>
      </tr>
      <tr>
        <td>Billy</td>
        <td>Bat</td>
        <td data-cell-numeric>28</td>
        <td data-cell-action>Delete</td>
      </tr>
      <tr>
        <td>Cathy</td>
        <td>Cat</td>
        <td data-cell-numeric>31</td>
        <td data-cell-action>Delete</td>
      </tr>
      <tr>
        <td>Debbie</td>
        <td>Dog</td>
        <td data-cell-numeric>33</td>
        <td data-cell-action>Delete</td>
      </tr>
    </tbody>
  </table>
</gux-table>
    `
  },
  {
    description: 'should render sort control in action column',
    html: `
<gux-table resizable-columns id="sortable-table">
  <table slot="data">
    <thead>
      <tr>
        <th data-column-name="actions" data-cell-action>Actions <gux-sort-control /></th>
        <th data-column-name="last-name">
          Last name
        </th>
        <th data-column-name="age" data-cell-numeric>
          Age
        </th>
        <th data-column-name="action" data-cell-action>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Adam</td>
        <td>Ant</td>
        <td data-cell-numeric>25</td>
        <td data-cell-action>Delete</td>
      </tr>
      <tr>
        <td>Billy</td>
        <td>Bat</td>
        <td data-cell-numeric>28</td>
        <td data-cell-action>Delete</td>
      </tr>
      <tr>
        <td>Cathy</td>
        <td>Cat</td>
        <td data-cell-numeric>31</td>
        <td data-cell-action>Delete</td>
      </tr>
      <tr>
        <td>Debbie</td>
        <td>Dog</td>
        <td data-cell-numeric>33</td>
        <td data-cell-action>Delete</td>
      </tr>
    </tbody>
  </table>
</gux-table>
    `
  }
];

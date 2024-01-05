# gux-table

## Breaking Changes during the beta period

### Sorting API Change
To improve the accessibility of the table sorting functionality we needed
to make an API change. To make a table sortable by a particular column you now
need to use a `gux-sort-control` component in that columns `<th>` element.
Previously you needed to add a `data-sortable` attribute in that columns `<th>`
element.

#### Migration Example

Before:
```
<gux-table>
  <table slot="data">
    <thead>
      <tr>
        <th data-sortable data-column-name="c1" aria-sort="ascending">Column 1 Header</th>
        <th data-sortable data-column-name="c2">Column 2 Header</th>
        <th>Column 3 Header</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Column 1, Row 1</td>
        <td>Column 2, Row 1</td>
        <td>Column 3, Row 1</td>
      </tr>
    </tbody>
  </table>
</gux-table>
```

After:
```
<gux-table>
  <table slot="data">
    <thead>
      <tr>
        <th data-column-name="c1" aria-sort="ascending">Column 1 Header <gux-sort-control /></th>
        <th data-column-name="c2">Column 2 Header <gux-sort-control /></th>
        <th>Column 3 Header</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Column 1, Row 1</td>
        <td>Column 2, Row 1</td>
        <td>Column 3, Row 1</td>
      </tr>
    </tbody>
  </table>
</gux-table>
```

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description                                                                                            | Type      | Default     |
| ------------------ | -------------------- | ------------------------------------------------------------------------------------------------------ | --------- | ----------- |
| `compact`          | `compact`            | Indicates table row density style                                                                      | `boolean` | `false`     |
| `emptyMessage`     | `empty-message`      | Represents info message that should be displayed for empty table                                       | `string`  | `undefined` |
| `fixedFirstColumn` | `fixed-first-column` | Indicates if the tables first column is fixed and will stay in place even when scrolling horizontally. | `boolean` | `false`     |
| `objectTable`      | `object-table`       | Indicates that object table specific styles should be applied                                          | `boolean` | `false`     |
| `resizableColumns` | `resizable-columns`  | Indicates that table should have resizable columns                                                     | `boolean` | `undefined` |


## Events

| Event                 | Description                                               | Type                                 |
| --------------------- | --------------------------------------------------------- | ------------------------------------ |
| `guxselectionchanged` | Triggers when table row was selected/unselected           | `CustomEvent<GuxTableSelectedState>` |
| `guxsortchanged`      | Triggers when the sorting of the table column is changed. | `CustomEvent<GuxTableSortState>`     |


## Methods

### `getSelected() => Promise<GuxTableSelectedState>`

Returns the selected rows Ids.

#### Returns

Type: `Promise<GuxTableSelectedState>`




## Slots

| Slot     | Description            |
| -------- | ---------------------- |
| `"data"` | Slot for table element |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

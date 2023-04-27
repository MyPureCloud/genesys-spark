const emptyMessage = "No data available";
const scrollLeft = "Scroll Left";
const scrollRight = "Scroll Right";
const selectAllTableRows = "Select All Table Rows";
const selectTableRow = "Select Table Row";
const sortAsc = "Sorted Ascending";
const sortDesc = "Sorted Descending";
const tableOptions = "Table Options";
const noColumnSort = "{headerContent}. The table is not currently sorted by this column. Click the column header to sort the table by this column in ascending order";
const ascendingColumnSort = "{headerContent}. The table is currently sorted by this column in ascending order. Click the column header to sort the table by this column in descending order";
const descendingColumnSort = "{headerContent}. The table is currently sorted by this column in descending order. Click the column header to sort the table by this column in ascending order";
const descendingColumnSortIncludeUnsorted = "{headerContent}. The table is currently sorted by this column in descending order. Click the column header to not sort the table by this column";
const tableResources = {
	emptyMessage: emptyMessage,
	scrollLeft: scrollLeft,
	scrollRight: scrollRight,
	selectAllTableRows: selectAllTableRows,
	selectTableRow: selectTableRow,
	sortAsc: sortAsc,
	sortDesc: sortDesc,
	tableOptions: tableOptions,
	noColumnSort: noColumnSort,
	ascendingColumnSort: ascendingColumnSort,
	descendingColumnSort: descendingColumnSort,
	descendingColumnSortIncludeUnsorted: descendingColumnSortIncludeUnsorted
};

export { tableResources as t };

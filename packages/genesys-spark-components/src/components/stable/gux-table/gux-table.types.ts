export interface GuxTableColumnResizeState {
  resizableColumn: HTMLElement;
  resizableColumnInitialWidth: number;
  columnResizeMouseStartX: number;
}

export type GuxTableSortDirection = 'ascending' | 'descending' | 'none';

export interface GuxTableSortState {
  columnName: string;
  sortDirection: GuxTableSortDirection;
}

export interface GuxTableSelectedState {
  selectedRowIds: string[];
}

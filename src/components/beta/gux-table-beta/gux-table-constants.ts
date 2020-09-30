export interface IColumnResizeState {
  resizableColumn: HTMLElement;
  resizableColumnInitialWidth: number;
  columnResizeMouseStartX: number;
}

export interface ISortState {
  columnName: string;
  sortDirection: string;
}

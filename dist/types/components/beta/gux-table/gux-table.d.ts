import { EventEmitter, JSX } from '../../../stencil-public-runtime';
import { GuxTableSortState, GuxTableSelectedState } from './gux-table.types';
/**
 * @slot data - Slot for table element
 */
export declare class GuxTable {
  root: HTMLElement;
  private resizeObserver;
  private slotObserver;
  private i18n;
  private columnResizeState;
  private tableId;
  private columnsWidths;
  private tableWidth;
  /**
   * Indicates that vertical scroll is presented for table
   */
  private isVerticalScroll;
  /**
   * Indicates that horizontal scroll is presented for table
   */
  private isHorizontalScroll;
  /**
   * Indicates that table content scrolled to it's last column
   */
  private isScrolledToFirstCell;
  /**
   * Indicates that table content scrolled to it's first column
   */
  private isScrolledToLastCell;
  /**
   * Indicates if the mouse is in a position that supports starting resize
   */
  private columnResizeHover;
  /**
   * Indicates table row density style
   */
  compact: boolean;
  /**
   * Indicates that object table specific styles should be applied
   */
  objectTable: boolean;
  /**
   * Represents info message that should be displayed for empty table
   */
  emptyMessage: string;
  /**
   * Triggers when table row was selected/unselected
   */
  guxselectionchanged: EventEmitter<GuxTableSelectedState>;
  /**
   * Triggers when the sorting of the table column is changed.
   */
  guxsortchanged: EventEmitter<GuxTableSortState>;
  /**
   * Indicates that table should have resizable columns
   */
  resizableColumns: boolean;
  /******************************* Lifecycle Hooks *******************************/
  componentWillLoad(): Promise<void>;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  /******************************* Event Listeners *******************************/
  onScroll(): void;
  onInternalAllRowSelectChange(event: CustomEvent): void;
  onInternalRowSelectChange(event: CustomEvent): void;
  onMouseMove(event: MouseEvent): void;
  onMouseDown(event: MouseEvent): void;
  onMouseUp(): void;
  /******************************* Element Getters *******************************/
  private get tableContainer();
  private get slottedTable();
  private get tableRows();
  private get tableColumns();
  private get rowCheckboxes();
  private get selectAllCheckbox();
  /******************************* Row Selection *******************************/
  /**
   * Returns the selected rows Ids.
   */
  getSelected(): Promise<GuxTableSelectedState>;
  private getSelectedInternal;
  private prepareSelectableRows;
  private updateSelectAllBoxState;
  private handleSelectAllRows;
  private handleRowSelection;
  private emitSelectionEvent;
  private updateRowSelection;
  /******************************* Scrolling *******************************/
  private nextColumn;
  private previousColumn;
  updateScrollState(): void;
  private checkHorizontalScroll;
  private checkVerticalScroll;
  private get tableScrollbarConstant();
  /******************************* Resizable Columns *******************************/
  private prepareResizableColumns;
  /** Scale column pixel widths equal when a resize is observed */
  private scaleColumnWidths;
  private calcScaledColWidth;
  private updateResizeState;
  private maybeStartResizing;
  private stopResizing;
  private isInResizeZone;
  private getElementComputedWidth;
  /** Calculates column width minus padding in pixels */
  private calculateColumnWidths;
  private setResizableColumnsStyles;
  /******************************* Rendering *******************************/
  private get isTableEmpty();
  private get tableContainerClasses();
  render(): JSX.Element;
}

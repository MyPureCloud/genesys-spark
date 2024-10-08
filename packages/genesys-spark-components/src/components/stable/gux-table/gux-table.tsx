import {
  Component,
  Host,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Listen,
  Method,
  Prop,
  readTask,
  forceUpdate,
  State
} from '@stencil/core';

import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import { whenEventIsFrom } from '@utils/dom/when-event-is-from';
import { randomHTMLId } from '@utils/dom/random-html-id';
import { trackComponent } from '@utils/tracking/usage';

import tableResources from './i18n/en.json';
import {
  GuxTableColumnResizeState,
  GuxTableSortState,
  GuxTableSelectedState
} from './gux-table.types';

const COL_RESIZE_HANDLE_WIDTH = 3;

/**
 * @slot data - Slot for table element
 */

@Component({
  styleUrl: 'gux-table.scss',
  tag: 'gux-table',
  shadow: true
})
export class GuxTable {
  @Element()
  root: HTMLElement;

  private resizeObserver: ResizeObserver;
  private slotObserver: MutationObserver = new MutationObserver(() =>
    forceUpdate(this)
  );
  private i18n: GetI18nValue;
  private columnResizeState: GuxTableColumnResizeState | null;
  private tableId: string = randomHTMLId('gux-table');
  private columnsWidths: object = {};
  /**
   * Indicates that vertical scroll is presented for table
   */
  @State()
  private isVerticalScroll: boolean = false;

  /**
   * Indicates if the mouse is in a position that supports starting resize
   */
  @State()
  private columnResizeHover: boolean = false;

  /**
   * Indicates table row density style
   */
  @Prop()
  compact: boolean = false;

  /**
   * Indicates that object table specific styles should be applied
   */
  @Prop()
  objectTable: boolean = false;

  /**
   * Represents info message that should be displayed for empty table
   */
  @Prop()
  emptyMessage: string;

  /**
   * Triggers when table row was selected/unselected
   */
  @Event() guxselectionchanged: EventEmitter<GuxTableSelectedState>;

  /**
   * Triggers when the sorting of the table column is changed.
   */
  @Event() guxsortchanged: EventEmitter<GuxTableSortState>;

  /**
   * Indicates that table should have resizable columns
   */
  @Prop()
  resizableColumns: boolean;

  /******************************* Lifecycle Hooks *******************************/

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, tableResources);
  }

  componentDidLoad() {
    if (this.resizableColumns) {
      this.prepareResizableColumns();
    }

    this.prepareSelectableRows();
    readTask(() => {
      this.checkVerticalScroll();
    });

    if (!this.resizeObserver && window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        readTask(() => {
          this.checkVerticalScroll();
        });
      });
    }

    if (this.resizeObserver) {
      this.resizeObserver.observe(this.tableContainer);
      this.resizeObserver.observe(this.slottedTable);
    }

    this.slotObserver.observe(this.slottedTable, {
      subtree: true,
      childList: true
    });
  }

  private checkVerticalScroll(): void {
    const tableContainerElement = this.tableContainer;
    this.isVerticalScroll =
      tableContainerElement.scrollHeight > tableContainerElement.clientHeight;
  }

  disconnectedCallback(): void {
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.tableContainer);
      this.resizeObserver.unobserve(this.slottedTable);
    }

    if (this.resizableColumns) {
      document.getElementById(`${this.tableId}-resizable-styles`).remove();
    }
  }

  /******************************* Event Listeners *******************************/

  @Listen('internalallrowselectchange')
  onInternalAllRowSelectChange(event: CustomEvent): void {
    event.stopPropagation();
    this.handleSelectAllRows(event.detail as boolean);
  }

  @Listen('internalrowselectchange')
  onInternalRowSelectChange(event: CustomEvent): void {
    event.stopPropagation();
    const rowCheckbox: HTMLGuxRowSelectElement =
      event.target as HTMLGuxRowSelectElement;
    rowCheckbox.selected = event.detail;
    this.handleRowSelection(rowCheckbox);
  }

  @Listen('mousemove', { capture: true })
  onMouseMove(event: MouseEvent): void {
    if (this.resizableColumns) {
      this.updateResizeState(event);
    }
  }

  @Listen('mousedown')
  onMouseDown(event: MouseEvent): void {
    if (this.resizableColumns) {
      this.maybeStartResizing(event);
    }
  }

  @Listen('mouseup', { capture: true })
  onMouseUp(): void {
    if (this.resizableColumns) {
      this.stopResizing();
    }
  }

  /******************************* Element Getters *******************************/
  // Add new query selectors here with meaningful names

  private get tableContainer(): HTMLElement {
    return this.root.shadowRoot.querySelector('.gux-table-container');
  }

  private get slottedTable(): HTMLElement {
    return this.root.querySelector('table[slot="data"]');
  }

  private get tableRows(): Array<HTMLElement> {
    return Array.from(this.slottedTable.querySelectorAll('tbody tr'));
  }

  private get tableColumns(): Array<HTMLElement> {
    return Array.from(this.slottedTable.querySelectorAll('thead th'));
  }

  private get rowCheckboxes(): Array<HTMLGuxRowSelectElement> {
    return Array.from(
      this.slottedTable.querySelectorAll('tbody tr td gux-row-select')
    );
  }

  private get selectAllCheckbox(): HTMLGuxAllRowSelectElement {
    return this.slottedTable.querySelector('thead tr th gux-all-row-select');
  }

  /******************************* Row Selection *******************************/

  /**
   * Returns the selected rows Ids.
   */
  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async getSelected(): Promise<GuxTableSelectedState> {
    return this.getSelectedInternal();
  }

  // Internal synchronous method for getting currently selected rows
  // The public method is forced to be async by Stencil's lazy-loading.
  private getSelectedInternal(): GuxTableSelectedState {
    const rowCheckboxes = Array.from(this.rowCheckboxes);
    const selectedRowIds = rowCheckboxes
      .filter(box => box.selected)
      .map(box => box.closest('tr').getAttribute('data-row-id'));

    return { selectedRowIds };
  }

  // Set up initial selectable row states
  private prepareSelectableRows(): void {
    const rowCheckboxes = this.rowCheckboxes;
    rowCheckboxes.forEach(rowCheckbox => {
      this.updateRowSelection(rowCheckbox);
    });

    this.updateSelectAllBoxState();
  }

  // Update the checked/indeterminate state of the select all checkbox
  private updateSelectAllBoxState(): void {
    const selectAllCheckbox = this.selectAllCheckbox;

    if (selectAllCheckbox) {
      const rowCheckboxes = this.rowCheckboxes;
      const filterDisabled = rowCheckboxes.filter(rowBox => !rowBox.disabled);
      const selectedRows = filterDisabled.filter(box => box.selected);
      const hasRows = Boolean(rowCheckboxes.length);
      const allSelected = selectedRows.length === filterDisabled.length;
      const noneSelected = selectedRows.length === 0;

      selectAllCheckbox.selected = hasRows && allSelected;

      void selectAllCheckbox.setIndeterminate(
        hasRows && !allSelected && !noneSelected
      );
    }
  }

  // Handle a change in state of the select all checkbox
  private handleSelectAllRows(selected: boolean): void {
    const selectAllCheckbox = this.selectAllCheckbox;
    const rowCheckboxes = this.rowCheckboxes;

    rowCheckboxes.forEach(rowBox => {
      selectAllCheckbox.selected = selected;
      if (!rowBox.disabled) {
        rowBox.selected = selected;
        this.updateRowSelection(rowBox);
      }
    });

    this.emitSelectionEvent();
  }

  // Handle a change in state of an individual row selection checkbox
  private handleRowSelection(rowCheckbox: HTMLGuxRowSelectElement): void {
    this.updateRowSelection(rowCheckbox);
    this.updateSelectAllBoxState();
    this.emitSelectionEvent();
  }

  private emitSelectionEvent(): void {
    this.guxselectionchanged.emit(this.getSelectedInternal());
  }

  // Make sure a selected row is tagged/displayed correctly at the row level
  private updateRowSelection(dataRowSelectbox: HTMLGuxRowSelectElement): void {
    const tableRow = dataRowSelectbox.closest('tr');
    if (dataRowSelectbox.selected) {
      tableRow.setAttribute('data-selected-row', '');
    } else {
      tableRow.removeAttribute('data-selected-row');
    }
  }

  /******************************* Resizable Columns *******************************/

  private prepareResizableColumns(): void {
    const styleElement = document.createElement('style');
    styleElement.id = `${this.tableId}-resizable-styles`;
    document.querySelector('head').appendChild(styleElement);

    const columnWidths = this.calculateColumnWidths(this.tableColumns);

    columnWidths
      // Exclude the last column to allow it to fill the remaining space naturally
      .slice(0, -1)
      .forEach(c => (this.columnsWidths[c.name] = c.width));

    this.setResizableColumnsStyles();
  }

  private updateResizeState(event: MouseEvent): void {
    if (this.columnResizeState) {
      const minimumWidth = 1;
      const columnName =
        this.columnResizeState.resizableColumn.dataset.columnName;
      const delta =
        event.pageX - this.columnResizeState.columnResizeMouseStartX;
      const initialWidth = this.columnResizeState.resizableColumnInitialWidth;
      const proposedWidth = initialWidth + delta;

      const columnWidth = Math.max(proposedWidth, minimumWidth);
      const columnWidths = this.calculateColumnWidths(this.tableColumns).map(
        c => {
          if (c.name === columnName) {
            return { ...c, width: columnWidth };
          }
          return c;
        }
      );

      this.columnsWidths[columnName] = columnWidths.find(
        c => c.name === columnName
      ).width;

      this.setResizableColumnsStyles();
    } else {
      this.columnResizeHover = false;
      whenEventIsFrom('th', event, (th: HTMLTableCellElement) => {
        const columnsLength = this.tableColumns.length;
        const isLastColumn = columnsLength - 1 === th.cellIndex;

        if (!isLastColumn && this.isInResizeZone(event, th)) {
          this.columnResizeHover = true;
        }
      });
    }
  }

  private maybeStartResizing(event: MouseEvent): void {
    whenEventIsFrom('th', event, th => {
      if (this.isInResizeZone(event, th)) {
        const resizableColumn = th;

        this.columnResizeState = {
          resizableColumn,
          columnResizeMouseStartX: event.pageX,
          resizableColumnInitialWidth: resizableColumn.clientWidth
        };
      }
    });
  }

  private stopResizing(): void {
    if (this.columnResizeState) {
      this.columnResizeState = null;
    }
  }

  private isInResizeZone(event: MouseEvent, header: HTMLElement): boolean {
    return (
      header.getBoundingClientRect().right - event.clientX <
      COL_RESIZE_HANDLE_WIDTH
    );
  }

  /** Calculates column width minus padding in pixels */
  private calculateColumnWidths(
    columns: HTMLElement[]
  ): { name: string; width: number }[] {
    return columns.map(c => ({
      name: c.dataset.columnName,
      width: c.clientWidth
    }));
  }

  private setResizableColumnsStyles(): void {
    const styleElement = document.getElementById(
      `${this.tableId}-resizable-styles`
    );
    let columnsStyles = '';

    Object.keys(this.columnsWidths).forEach((column: string) => {
      columnsStyles += `[gs-table-id=${
        this.tableId
      }] th[data-column-name="${column}"]{
        width:${String(this.columnsWidths[column])}px;
        min-width:${String(this.columnsWidths[column])}px;
      }`;
    });

    styleElement.innerHTML = columnsStyles;
  }

  /******************************* Rendering *******************************/

  private get isTableEmpty(): boolean {
    return !this.root.children[0] || this.tableRows.length < 1;
  }

  private get tableContainerClasses(): { [k: string]: boolean } {
    return {
      'gux-table-container': true,
      'gux-column-resizing': Boolean(this.columnResizeState),
      'gux-column-resizing-hover': this.columnResizeHover
    };
  }

  render(): JSX.Element {
    return (
      <Host
        gs-table-id={this.tableId}
        gs-obj-table={this.objectTable}
        gs-compact={this.compact}
      >
        <div class="gux-table">
          <div
            tabindex={this.isVerticalScroll ? '0' : '-1'}
            id={this.tableId}
            class={this.tableContainerClasses}
          >
            <slot name="data" />
          </div>
          {this.isTableEmpty && (
            <div class="gux-empty-table">
              {this.emptyMessage || this.i18n('emptyMessage')}
            </div>
          )}
        </div>
      </Host>
    ) as JSX.Element;
  }
}

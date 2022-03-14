import {
  Component,
  Host,
  Element,
  Event,
  EventEmitter,
  getAssetPath,
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
import { whenEventIsFrom } from '../../../utils/dom/when-event-is-from';
import { randomHTMLId } from '../../../utils/dom/random-html-id';
import { trackComponent } from '../../../usage-tracking';

import tableResources from './i18n/en.json';
import {
  GuxTableColumnResizeState,
  GuxTableSortState,
  GuxTableSelectedState
} from './gux-table.types';

const COL_RESIZE_HANDLE_WIDTH = 3;

@Component({
  styleUrl: 'gux-table.less',
  tag: 'gux-table-beta',
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
   * Indicates that horizontal scroll is presented for table
   */
  @State()
  private isHorizontalScroll: boolean = false;

  /**
   * Indicates that table content scrolled to it's last column
   */
  @State()
  private isScrolledToFirstCell: boolean = true;

  /**
   * Indicates that table content scrolled to it's first column
   */
  @State()
  private isScrolledToLastCell: boolean = false;

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

  /******************************* Lifcycle Hooks *******************************/

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, tableResources);
  }

  componentDidLoad() {
    if (this.resizableColumns) {
      this.prepareResizableColumns();
    }

    this.prepareSortableColumns();
    this.prepareSelectableRows();
    this.checkHorizontalScroll();
    this.checkVerticalScroll();

    if (!this.resizeObserver && window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        readTask(() => {
          this.checkHorizontalScroll();
          this.checkVerticalScroll();
          this.updateScrollState();
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

  @Listen('scroll', { capture: true })
  onScroll(): void {
    this.updateScrollState();
  }

  @Listen('internalallrowselectchange')
  onInternalAllRowSelectChange(event: CustomEvent): void {
    event.stopPropagation();
    this.handleSelectAllRows();
  }

  @Listen('internalrowselectchange')
  onInternalRowSelectChange(event: CustomEvent): void {
    event.stopPropagation();
    this.handleRowSelection(event.target);
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
  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
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

  // Update the checked/interminate state of the select all checkbox
  private updateSelectAllBoxState(): void {
    const selectAllCheckbox = this.selectAllCheckbox;

    if (selectAllCheckbox) {
      const rowCheckboxes = this.rowCheckboxes;
      const selectedRows = rowCheckboxes.filter(box => box.selected);

      const hasRows = Boolean(rowCheckboxes.length);
      const allSelected = selectedRows.length === rowCheckboxes.length;
      const noneSelected = selectedRows.length === 0;

      selectAllCheckbox.selected = hasRows && allSelected;

      void selectAllCheckbox.setIndeterminate(
        hasRows && !allSelected && !noneSelected
      );
    }
  }

  // Handle a change in state of the select all checkbox
  private handleSelectAllRows(): void {
    const selectAllCheckbox = this.selectAllCheckbox;
    const rowCheckboxes = this.rowCheckboxes;

    rowCheckboxes.forEach(rowBox => {
      rowBox.selected = selectAllCheckbox.selected;
      this.updateRowSelection(rowBox);
    });

    this.emitSelectionEvent();
  }

  // Handle a change in state of an individual row selection checkbox
  private handleRowSelection(rowCheckbox: EventTarget): void {
    this.updateRowSelection(rowCheckbox as HTMLGuxRowSelectElement);
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

  /******************************* Scrolling *******************************/

  private nextColumn(): void {
    const columns = this.tableColumns;
    const viewportBounds = this.tableContainer.getBoundingClientRect();

    // The last column who's right side is out of the viewport
    // or the last element if we can't find one.
    const lastVisibleColumn =
      columns.find(
        col => col.getBoundingClientRect().right > viewportBounds.right
      ) || columns[columns.length - 1];

    const lastColumnBounds = lastVisibleColumn.getBoundingClientRect();
    let distanceToScroll = lastColumnBounds.right - viewportBounds.right;

    // Don't scroll the whole viewport away if there is a very long column
    if (distanceToScroll > viewportBounds.width) {
      distanceToScroll = viewportBounds.width * 0.9;
    }

    // Always try to scroll a little bit extra to make sure we aren't caught out by
    // funny floating-point pixel math behavior.
    this.tableContainer.scrollLeft += Math.ceil(distanceToScroll);
    this.updateScrollState();
  }

  private previousColumn(): void {
    const columns = this.tableColumns;
    const viewportBounds = this.tableContainer.getBoundingClientRect();

    // The first column who's left side is out of the viewport
    // or the first element if we can't find one.
    const firstVisibleColumn =
      columns
        .reverse()
        .find(col => col.getBoundingClientRect().left < viewportBounds.left) ||
      columns[0];

    const firstColumnBounds = firstVisibleColumn.getBoundingClientRect();
    let distanceToScroll = viewportBounds.left - firstColumnBounds.left;

    // Don't scroll the whole viewport away if there is a very long column
    if (distanceToScroll > viewportBounds.width) {
      distanceToScroll = viewportBounds.width * 0.9;
    }

    // Always try to scroll a little bit extra to make sure we aren't caught out by
    // funny floating-point pixel math behavior.
    this.tableContainer.scrollLeft += -Math.ceil(distanceToScroll);
    this.updateScrollState();
  }

  updateScrollState(): void {
    const scrollLeft = this.tableContainer.scrollLeft;
    const maxScrollLeft =
      this.tableContainer.scrollWidth - this.tableContainer.clientWidth;

    this.isScrolledToFirstCell = scrollLeft === 0;
    this.isScrolledToLastCell =
      // sometimes this can go less than zero due to the scrollbar constant
      maxScrollLeft - scrollLeft - this.tableScrollbarConstant <= 0;
  }

  private checkHorizontalScroll(): void {
    const tableWidth = this.slottedTable.getBoundingClientRect().width;
    const containerWidth = this.root.getBoundingClientRect().width;

    this.isHorizontalScroll = tableWidth > containerWidth;
  }

  private checkVerticalScroll(): void {
    const tableContainerElement = this.tableContainer;
    this.isVerticalScroll =
      tableContainerElement.scrollHeight > tableContainerElement.clientHeight;
  }

  private get tableScrollbarConstant(): number {
    const container: HTMLElement = this.tableContainer;
    return container ? container.offsetWidth - container.clientWidth : 0;
  }

  /******************************* Resizeable Columns *******************************/

  private prepareResizableColumns(): void {
    const styleElement = document.createElement('style');
    styleElement.id = `${this.tableId}-resizable-styles`;
    document.querySelector('head').appendChild(styleElement);

    const columns = this.tableColumns;
    columns.pop();

    columns.forEach((column: HTMLElement) => {
      this.columnsWidths[
        column.dataset.columnName
      ] = `${this.getElementComputedWidth(column)}px`;
    });

    this.setResizableColumnsStyles();
  }

  private updateResizeState(event: MouseEvent): void {
    if (this.columnResizeState) {
      const columnName =
        this.columnResizeState.resizableColumn.dataset.columnName;
      const columnWidth =
        this.columnResizeState.resizableColumnInitialWidth +
        (event.pageX - this.columnResizeState.columnResizeMouseStartX);

      this.columnsWidths[columnName] = `${columnWidth > 1 ? columnWidth : 1}px`;
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
          resizableColumnInitialWidth:
            this.getElementComputedWidth(resizableColumn)
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

  private getElementComputedWidth(element: HTMLElement): number {
    return parseInt(
      window.getComputedStyle(element).getPropertyValue('width').split('px')[0],
      10
    );
  }

  /******************************* Sortable Columns *******************************/

  private prepareSortableColumns(): void {
    const columnsElements = this.tableColumns;
    this.prepareSortableColumnsStyles();

    columnsElements.forEach((column: HTMLElement) => {
      if (Object.prototype.hasOwnProperty.call(column.dataset, 'sortable')) {
        column.onclick = (event: MouseEvent) => {
          const columnElement = event.target as HTMLElement;
          const sortDirection = columnElement.dataset.sort || '';
          let newSortDirection = null;

          switch (sortDirection) {
            case '':
            case 'desc':
              newSortDirection = 'asc';
              break;
            case 'asc':
              newSortDirection = 'desc';
              break;
          }

          this.guxsortchanged.emit({
            columnName: columnElement.dataset.columnName,
            sortDirection: newSortDirection
          });
        };
      }
    });
  }

  /**
   * Create sort styles if they don't exist. We can't make these static because we need to look up
   * asset paths to generate the urls
   */
  private prepareSortableColumnsStyles(): void {
    const styleId = 'gux-table-sortable-styles';
    if (document.getElementById(styleId) == null) {
      const styleElement = document.createElement('style');
      styleElement.id = styleId;

      const ascArrowIcon = getAssetPath(`./icons/arrow-solid-down.svg`);
      const descArrowIcon = getAssetPath(`./icons/arrow-solid-up.svg`);
      const sortAscContent = this.i18n('sortAsc');
      const sortDescContent = this.i18n('sortDesc');

      styleElement.innerHTML = `
      th[data-sortable]:hover:after{content: "${sortAscContent}";background-image: url("${ascArrowIcon}");}
      th[data-sort="asc"]:after{background-image:url("${ascArrowIcon}")!important;content:"${sortAscContent}"!important;}
      th[data-sort="desc"]:after{background-image:url("${descArrowIcon}")!important;content:"${sortDescContent}"!important;}
    `;

      document.querySelector('head').appendChild(styleElement);
    }
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
        width:${String(this.columnsWidths[column])};
        min-width:${String(this.columnsWidths[column])};
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
        gs-v-scroll={this.isVerticalScroll}
        gs-h-scroll={this.isHorizontalScroll}
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
          {this.isHorizontalScroll && (
            <gux-button-slot-beta accent="secondary">
              <button
                class="gux-table-scroll-left"
                disabled={this.isScrolledToFirstCell}
                onClick={
                  !this.isScrolledToFirstCell && this.previousColumn.bind(this)
                }
              >
                <gux-icon
                  icon-name="chevron-left"
                  screenreader-text={this.i18n('scrollLeft')}
                />
              </button>
            </gux-button-slot-beta>
          )}
          {this.isHorizontalScroll && (
            <gux-button-slot-beta
              accent="secondary"
              style={{ marginRight: `${this.tableScrollbarConstant}px` }}
            >
              <button
                class="gux-table-scroll-right"
                disabled={this.isScrolledToLastCell}
                style={{ marginRight: `${this.tableScrollbarConstant}px` }}
                onClick={
                  !this.isScrolledToLastCell && this.nextColumn.bind(this)
                }
              >
                <gux-icon
                  icon-name="chevron-right"
                  screenreader-text={this.i18n('scrollRight')}
                />
              </button>
            </gux-button-slot-beta>
          )}
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

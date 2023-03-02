import { r as registerInstance, e as createEvent, l as forceUpdate, k as readTask, h, j as Host, g as getElement } from './index-f583fcde.js';
import { b as buildI18nForComponent } from './index-0998c803.js';
import { w as whenEventIsFrom } from './when-event-is-from-18667084.js';
import { r as randomHTMLId } from './random-html-id-8e3f658c.js';
import { t as trackComponent } from './usage-5b6f0d25.js';
import { t as tableResources } from './en-66f138f8.js';
import './get-closest-element-1597503c.js';

const guxTableCss = ":host{display:block;isolation:isolate}:host .gux-table{position:relative;height:inherit}:host .gux-table .gux-table-scroll-left,:host .gux-table .gux-table-scroll-right{position:absolute;top:0;z-index:1;display:flex;align-items:center;justify-content:center;width:24px;min-width:0;height:40px;padding:0;color:#2e394c;cursor:pointer;border-radius:4px}:host .gux-table .gux-table-scroll-left gux-icon,:host .gux-table .gux-table-scroll-right gux-icon{width:8px;height:8px}:host .gux-table .gux-table-scroll-left{border-top-left-radius:0;border-bottom-left-radius:0}:host .gux-table .gux-table-scroll-right{right:0;border-top-right-radius:0;border-bottom-right-radius:0}:host .gux-table .gux-table-container{width:100%;max-height:100%;overflow-x:hidden;scrollbar-color:rgba(32, 41, 55, 0.24) #fdfdfd;scrollbar-width:thin}:host .gux-table .gux-table-container::-webkit-scrollbar{width:4px}:host .gux-table .gux-table-container::-webkit-scrollbar-track{background:#fdfdfd}:host .gux-table .gux-table-container::-webkit-scrollbar-thumb{background:rgba(32, 41, 55, 0.24)}:host .gux-table .gux-table-container::-webkit-scrollbar-thumb:hover{background:rgba(32, 41, 55, 0.48)}:host .gux-table .gux-table-container.gux-column-resizing-hover,:host .gux-table .gux-table-container.gux-column-resizing{cursor:col-resize}:host .gux-empty-table{display:flex;align-items:center;justify-content:center;height:150px;color:#596373;background:#fdfdfd;font-family:Roboto, sans-serif;font-weight:400;font-weight:300;font-size:18px;line-height:24px}";

const COL_RESIZE_HANDLE_WIDTH = 3;
const GuxTable = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.guxselectionchanged = createEvent(this, "guxselectionchanged", 7);
    this.guxsortchanged = createEvent(this, "guxsortchanged", 7);
    this.slotObserver = new MutationObserver(() => forceUpdate(this));
    this.tableId = randomHTMLId('gux-table');
    this.columnsWidths = {};
    this.tableWidth = this.getElementComputedWidth(this.slottedTable);
    this.isVerticalScroll = false;
    this.isHorizontalScroll = false;
    this.isScrolledToFirstCell = true;
    this.isScrolledToLastCell = false;
    this.columnResizeHover = false;
    this.compact = false;
    this.objectTable = false;
    this.emptyMessage = undefined;
    this.resizableColumns = undefined;
  }
  /******************************* Lifecycle Hooks *******************************/
  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, tableResources);
  }
  componentDidLoad() {
    if (this.resizableColumns) {
      this.prepareResizableColumns();
    }
    this.prepareSelectableRows();
    this.checkHorizontalScroll();
    this.checkVerticalScroll();
    if (!this.resizeObserver && window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        readTask(() => {
          this.checkHorizontalScroll();
          this.checkVerticalScroll();
          this.updateScrollState();
          this.scaleColumnWidths();
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
  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.tableContainer);
      this.resizeObserver.unobserve(this.slottedTable);
    }
    if (this.resizableColumns) {
      document.getElementById(`${this.tableId}-resizable-styles`).remove();
    }
  }
  /******************************* Event Listeners *******************************/
  onScroll() {
    this.updateScrollState();
  }
  onInternalAllRowSelectChange(event) {
    event.stopPropagation();
    this.handleSelectAllRows();
  }
  onInternalRowSelectChange(event) {
    event.stopPropagation();
    this.handleRowSelection(event.target);
  }
  onMouseMove(event) {
    if (this.resizableColumns) {
      this.updateResizeState(event);
    }
  }
  onMouseDown(event) {
    if (this.resizableColumns) {
      this.maybeStartResizing(event);
    }
  }
  onMouseUp() {
    if (this.resizableColumns) {
      this.stopResizing();
    }
  }
  /******************************* Element Getters *******************************/
  // Add new query selectors here with meaningful names
  get tableContainer() {
    return this.root.shadowRoot.querySelector('.gux-table-container');
  }
  get slottedTable() {
    return this.root.querySelector('table[slot="data"]');
  }
  get tableRows() {
    return Array.from(this.slottedTable.querySelectorAll('tbody tr'));
  }
  get tableColumns() {
    return Array.from(this.slottedTable.querySelectorAll('thead th'));
  }
  get rowCheckboxes() {
    return Array.from(this.slottedTable.querySelectorAll('tbody tr td gux-row-select'));
  }
  get selectAllCheckbox() {
    return this.slottedTable.querySelector('thead tr th gux-all-row-select');
  }
  /******************************* Row Selection *******************************/
  /**
   * Returns the selected rows Ids.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async getSelected() {
    return this.getSelectedInternal();
  }
  // Internal synchronous method for getting currently selected rows
  // The public method is forced to be async by Stencil's lazy-loading.
  getSelectedInternal() {
    const rowCheckboxes = Array.from(this.rowCheckboxes);
    const selectedRowIds = rowCheckboxes
      .filter(box => box.selected)
      .map(box => box.closest('tr').getAttribute('data-row-id'));
    return { selectedRowIds };
  }
  // Set up initial selectable row states
  prepareSelectableRows() {
    const rowCheckboxes = this.rowCheckboxes;
    rowCheckboxes.forEach(rowCheckbox => {
      this.updateRowSelection(rowCheckbox);
    });
    this.updateSelectAllBoxState();
  }
  // Update the checked/indeterminate state of the select all checkbox
  updateSelectAllBoxState() {
    const selectAllCheckbox = this.selectAllCheckbox;
    if (selectAllCheckbox) {
      const rowCheckboxes = this.rowCheckboxes;
      const filterDisabled = rowCheckboxes.filter(rowBox => rowBox.hasAttribute('disabled') == false);
      const selectedRows = filterDisabled.filter(box => box.selected);
      const hasRows = Boolean(rowCheckboxes.length);
      const allSelected = selectedRows.length === filterDisabled.length;
      const noneSelected = selectedRows.length === 0;
      selectAllCheckbox.selected = hasRows && allSelected;
      void selectAllCheckbox.setIndeterminate(hasRows && !allSelected && !noneSelected);
    }
  }
  // Handle a change in state of the select all checkbox
  handleSelectAllRows() {
    const selectAllCheckbox = this.selectAllCheckbox;
    const rowCheckboxes = this.rowCheckboxes;
    rowCheckboxes.forEach(rowBox => {
      if (!rowBox.hasAttribute('disabled')) {
        rowBox.selected = selectAllCheckbox.selected;
        this.updateRowSelection(rowBox);
      }
    });
    this.emitSelectionEvent();
  }
  // Handle a change in state of an individual row selection checkbox
  handleRowSelection(rowCheckbox) {
    this.updateRowSelection(rowCheckbox);
    this.updateSelectAllBoxState();
    this.emitSelectionEvent();
  }
  emitSelectionEvent() {
    this.guxselectionchanged.emit(this.getSelectedInternal());
  }
  // Make sure a selected row is tagged/displayed correctly at the row level
  updateRowSelection(dataRowSelectbox) {
    const tableRow = dataRowSelectbox.closest('tr');
    if (dataRowSelectbox.selected) {
      tableRow.setAttribute('data-selected-row', '');
    }
    else {
      tableRow.removeAttribute('data-selected-row');
    }
  }
  /******************************* Scrolling *******************************/
  nextColumn() {
    const columns = this.tableColumns;
    const viewportBounds = this.tableContainer.getBoundingClientRect();
    // The last column who's right side is out of the viewport
    // or the last element if we can't find one.
    const lastVisibleColumn = columns.find(col => col.getBoundingClientRect().right > viewportBounds.right) || columns[columns.length - 1];
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
  previousColumn() {
    const columns = this.tableColumns;
    const viewportBounds = this.tableContainer.getBoundingClientRect();
    // The first column who's left side is out of the viewport
    // or the first element if we can't find one.
    const firstVisibleColumn = columns
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
  updateScrollState() {
    const scrollLeft = this.tableContainer.scrollLeft;
    const maxScrollLeft = this.tableContainer.scrollWidth - this.tableContainer.clientWidth;
    this.isScrolledToFirstCell = scrollLeft === 0;
    this.isScrolledToLastCell =
      // sometimes this can go less than zero due to the scrollbar constant
      maxScrollLeft - scrollLeft - this.tableScrollbarConstant <= 0;
  }
  checkHorizontalScroll() {
    const tableWidth = this.slottedTable.getBoundingClientRect().width;
    const containerWidth = this.root.getBoundingClientRect().width;
    this.isHorizontalScroll = tableWidth > containerWidth;
  }
  checkVerticalScroll() {
    const tableContainerElement = this.tableContainer;
    this.isVerticalScroll =
      tableContainerElement.scrollHeight > tableContainerElement.clientHeight;
  }
  get tableScrollbarConstant() {
    const container = this.tableContainer;
    return container ? container.offsetWidth - container.clientWidth : 0;
  }
  /******************************* Resizable Columns *******************************/
  prepareResizableColumns() {
    const styleElement = document.createElement('style');
    styleElement.id = `${this.tableId}-resizable-styles`;
    document.querySelector('head').appendChild(styleElement);
    const columnWidths = this.calculateColumnWidths(this.tableColumns);
    this.tableWidth = this.getElementComputedWidth(this.slottedTable);
    columnWidths
      // Exclude the last column to allow it to fill the remaining space naturally
      .slice(0, -1)
      .forEach(c => (this.columnsWidths[c.name] = c.width));
    this.setResizableColumnsStyles();
  }
  /** Scale column pixel widths equal when a resize is observed */
  scaleColumnWidths() {
    if (!this.columnResizeState &&
      this.resizableColumns &&
      !this.isHorizontalScroll) {
      const oldColumnWidths = this.calculateColumnWidths(this.tableColumns);
      const oldTableWidth = this.tableWidth;
      const newTableWidth = this.getElementComputedWidth(this.slottedTable);
      oldColumnWidths
        .map(col => (Object.assign(Object.assign({}, col), { width: this.calcScaledColWidth(col.width, oldTableWidth, newTableWidth) })))
        // Exclude the last column to allow it to fill the remaining space naturally
        .slice(0, -1)
        .forEach(c => (this.columnsWidths[c.name] = c.width));
      this.tableWidth = newTableWidth;
      this.setResizableColumnsStyles();
    }
  }
  calcScaledColWidth(colWidth, oldTableWidth, newTableWidth) {
    const proposedWidth = Math.round((colWidth / oldTableWidth) * newTableWidth);
    const minWidth = 1;
    return Math.max(proposedWidth, minWidth);
  }
  updateResizeState(event) {
    if (this.columnResizeState) {
      const minimumWidth = 1;
      const columnName = this.columnResizeState.resizableColumn.dataset.columnName;
      const delta = event.pageX - this.columnResizeState.columnResizeMouseStartX;
      const initialWidth = this.columnResizeState.resizableColumnInitialWidth;
      const proposedWidth = initialWidth + delta;
      const columnWidth = Math.max(proposedWidth, minimumWidth);
      const columnWidths = this.calculateColumnWidths(this.tableColumns).map(c => {
        if (c.name === columnName) {
          return Object.assign(Object.assign({}, c), { width: columnWidth });
        }
        return c;
      });
      this.columnsWidths[columnName] = columnWidths.find(c => c.name === columnName).width;
      this.setResizableColumnsStyles();
      this.tableWidth = this.getElementComputedWidth(this.slottedTable);
    }
    else {
      this.columnResizeHover = false;
      whenEventIsFrom('th', event, (th) => {
        const columnsLength = this.tableColumns.length;
        const isLastColumn = columnsLength - 1 === th.cellIndex;
        if (!isLastColumn && this.isInResizeZone(event, th)) {
          this.columnResizeHover = true;
        }
      });
    }
  }
  maybeStartResizing(event) {
    whenEventIsFrom('th', event, th => {
      if (this.isInResizeZone(event, th)) {
        const resizableColumn = th;
        this.columnResizeState = {
          resizableColumn,
          columnResizeMouseStartX: event.pageX,
          resizableColumnInitialWidth: this.getElementComputedWidth(resizableColumn)
        };
      }
    });
  }
  stopResizing() {
    if (this.columnResizeState) {
      this.columnResizeState = null;
    }
  }
  isInResizeZone(event, header) {
    return (header.getBoundingClientRect().right - event.clientX <
      COL_RESIZE_HANDLE_WIDTH);
  }
  getElementComputedWidth(element) {
    return (element.clientWidth -
      parseInt(window.getComputedStyle(element).paddingLeft) -
      parseInt(window.getComputedStyle(element).paddingRight));
  }
  /** Calculates column width minus padding in pixels */
  calculateColumnWidths(columns) {
    return columns.map(c => ({
      name: c.dataset.columnName,
      width: this.getElementComputedWidth(c)
    }));
  }
  setResizableColumnsStyles() {
    const styleElement = document.getElementById(`${this.tableId}-resizable-styles`);
    let columnsStyles = '';
    Object.keys(this.columnsWidths).forEach((column) => {
      columnsStyles += `[gs-table-id=${this.tableId}] th[data-column-name="${column}"]{
        width:${String(this.columnsWidths[column])}px;
        min-width:${String(this.columnsWidths[column])}px;
      }`;
    });
    styleElement.innerHTML = columnsStyles;
  }
  /******************************* Rendering *******************************/
  get isTableEmpty() {
    return !this.root.children[0] || this.tableRows.length < 1;
  }
  get tableContainerClasses() {
    return {
      'gux-table-container': true,
      'gux-column-resizing': Boolean(this.columnResizeState),
      'gux-column-resizing-hover': this.columnResizeHover
    };
  }
  render() {
    return (h(Host, { "gs-table-id": this.tableId, "gs-v-scroll": this.isVerticalScroll, "gs-h-scroll": this.isHorizontalScroll, "gs-obj-table": this.objectTable, "gs-compact": this.compact }, h("div", { class: "gux-table" }, h("div", { tabindex: this.isVerticalScroll ? '0' : '-1', id: this.tableId, class: this.tableContainerClasses }, h("slot", { name: "data" })), this.isHorizontalScroll && (h("gux-button-slot-beta", { accent: "secondary" }, h("button", { class: "gux-table-scroll-left", disabled: this.isScrolledToFirstCell, onClick: !this.isScrolledToFirstCell && this.previousColumn.bind(this) }, h("gux-icon", { "icon-name": "chevron-left", "screenreader-text": this.i18n('scrollLeft') })))), this.isHorizontalScroll && (h("gux-button-slot-beta", { accent: "secondary", style: { marginRight: `${this.tableScrollbarConstant}px` } }, h("button", { class: "gux-table-scroll-right", disabled: this.isScrolledToLastCell, style: { marginRight: `${this.tableScrollbarConstant}px` }, onClick: !this.isScrolledToLastCell && this.nextColumn.bind(this) }, h("gux-icon", { "icon-name": "chevron-right", "screenreader-text": this.i18n('scrollRight') })))), this.isTableEmpty && (h("div", { class: "gux-empty-table" }, this.emptyMessage || this.i18n('emptyMessage'))))));
  }
  get root() { return getElement(this); }
};
GuxTable.style = guxTableCss;

export { GuxTable as gux_table_beta };

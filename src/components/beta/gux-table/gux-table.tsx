import {
  Component,
  Element,
  h,
  Prop,
  State,
  Listen,
  readTask
} from '@stencil/core';

interface TableHeaderCell {
  name: string;
  type: string;
}

interface TableRowCell {
  value: string;
  type: string;
}

@Component({
  styleUrl: 'gux-table.less',
  tag: 'gux-table-beta'
})
export class GuxTable {
  @Element()
  root: HTMLElement;

  private columns: TableHeaderCell[] = [];
  private rows: TableRowCell[][] = [];
  private additionalCellWidth: number = 0;
  private isHorizontalScroll: boolean = true;
  private resizeObserver: ResizeObserver;

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
   * Store columns width values which are being calculated accrding to cell content
   */
  @State()
  private columnsWidth: number[] = [];

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
  emptyMessage: string = '<no data message>';

  @Listen('scroll', { capture: true, target: 'parent' })
  onScroll() {
    const maxScrollLeft =
      this.tableContainer.scrollWidth - this.tableContainer.clientWidth;
    if (this.tableContainer.scrollLeft === 0) {
      this.isScrolledToFirstCell = true;
    } else if (Math.abs(this.tableContainer.scrollLeft - maxScrollLeft) < 10) {
      this.isScrolledToLastCell = true;
    } else {
      this.isScrolledToFirstCell = false;
      this.isScrolledToLastCell = false;
    }
  }

  get getTableClasses(): string {
    return [
      'gux-table-container',
      this.compact ? 'compact' : '',
      this.objectTable ? 'object-table' : '',
      this.isVerticalScroll() ? 'vertical-scroll' : '',
      this.isHorizontalScroll ? 'horizontal-scroll' : ''
    ]
      .join(' ')
      .trim();
  }

  private getCellClasses(
    type: string,
    cell: TableHeaderCell | TableRowCell
  ): string {
    return [
      type === 'header' ? 'gux-table-header-column' : '',
      type === 'body' ? 'gux-table-body-row-cell' : '',
      cell.type === 'number' ? 'cell-number' : '',
      cell.type === 'action' ? 'cell-action' : ''
    ]
      .join(' ')
      .trim();
  }

  private get table(): HTMLElement {
    return this.root.children[0] as HTMLElement;
  }

  private get tableContainer(): HTMLElement {
    return this.root.children[0].getElementsByClassName(
      'gux-table-container'
    )[0] as HTMLElement;
  }

  private previousColumn(): void {
    const columns = Array.from(
      this.table.querySelectorAll('.gux-table-header-column')
    );
    const currentScrollX = this.tableContainer.scrollLeft;
    const containerWidth = this.root.children[0].getBoundingClientRect().width;
    let columnsWidth = 0;

    columns.some(column => {
      if (
        columnsWidth + column.getBoundingClientRect().width <
        containerWidth + Math.floor(currentScrollX - 1)
      ) {
        columnsWidth += column.getBoundingClientRect().width;
        return false;
      } else {
        return true;
      }
    });

    const scrollToValue = currentScrollX + containerWidth - columnsWidth;
    this.tableContainer.scrollTo({
      left: currentScrollX - scrollToValue,
      behavior: 'smooth'
    });
  }

  private nextColumn(): void {
    const columns = Array.from(
      this.table.querySelectorAll('.gux-table-header-column')
    );
    const currentScrollX = this.tableContainer.scrollLeft;
    const containerWidth = this.root.children[0].getBoundingClientRect().width;
    let columnsWidth = 0;

    this.isScrolledToFirstCell = false;

    columns.some(column => {
      columnsWidth += column.getBoundingClientRect().width;

      if (columnsWidth > containerWidth + currentScrollX) {
        return true;
      } else {
        return false;
      }
    });

    this.tableContainer.scrollTo({
      left: columnsWidth - containerWidth,
      behavior: 'smooth'
    });
  }

  private isTableEmpty(): boolean {
    return (
      !this.root.children[0] ||
      this.root.children[0].querySelectorAll('tbody tr').length < 1
    );
  }

  private getColumnType(el: Element): string {
    if (el.attributes['data-cell-numeric']) {
      return 'number';
    } else if (el.attributes['data-cell-action']) {
      return 'action';
    } else {
      return 'text';
    }
  }

  private prepareTableData(): void {
    this.columns = Array.from(this.table.querySelectorAll('thead th')).map(
      column => ({
        name: column.innerHTML,
        type: this.getColumnType(column),
        width: column.clientWidth
      })
    );

    this.rows = Array.from(this.table.querySelectorAll('tbody tr')).map(row => {
      const tableRow = Array.from(row.querySelectorAll('td')).map(
        (column, index) => ({
          value: column.innerHTML,
          type: this.columns[index].type
        })
      );

      return tableRow;
    });
  }

  private isVerticalScroll(): boolean {
    const rowsCount =
      this.root.getElementsByClassName('gux-table-body-row').length + 1;
    return rowsCount * (this.compact ? 24 : 40) > this.root.clientHeight;
  }

  private getInitialColumnsWidth(): number[] {
    const headerCellsWidth = Array.from(
      this.table.querySelectorAll('.gux-table-header-column')
    ).map(column => {
      return Math.ceil(column.getBoundingClientRect().width) - 12 - 24;
    });

    const rowsCellsWidth = Array.from(
      this.table.getElementsByClassName('gux-table-body-row')
    ).map(row => {
      return Array.from(row.children).map(
        rowCell => Math.ceil(rowCell.getBoundingClientRect().width) - 12 - 24
      );
    });

    const transposedRowsCellWidth = !rowsCellsWidth.length
      ? []
      : Object.keys(rowsCellsWidth[0]).map(c => {
          return rowsCellsWidth.map(r => r[c]);
        });

    return headerCellsWidth.map((cellWidth, idx) => {
      if (transposedRowsCellWidth[idx] && transposedRowsCellWidth[idx].length) {
        return Math.max(cellWidth, ...transposedRowsCellWidth[idx]);
      } else {
        return cellWidth;
      }
    });
  }

  private evaluateCellsWidth(): void {
    if (!this.columnsWidth.length) {
      this.columnsWidth = this.getInitialColumnsWidth();
    }

    this.columnsWidth = this.columnsWidth.map(width => {
      return width - this.additionalCellWidth;
    });
    this.additionalCellWidth = 0;

    /* Check if table doesn't takes full width of container */
    const containerWidth = this.root.clientWidth;
    const tableColumnsFullWidth = this.columnsWidth.reduce(
      (a, b) => a + b + 12 + 24,
      0
    );

    if (tableColumnsFullWidth < containerWidth) {
      this.isHorizontalScroll = false;

      this.additionalCellWidth = Math.floor(
        (containerWidth -
          tableColumnsFullWidth -
          this.columnsWidth.length -
          this.getTableScrollbarConstant()) /
          this.columnsWidth.length
      );

      this.columnsWidth = this.columnsWidth.map(width => {
        return width + this.additionalCellWidth;
      });
    } else {
      this.isHorizontalScroll = true;
    }
  }

  private getRowCellWidth(index: number): number {
    if (index === this.columnsWidth.length - 1 && this.isVerticalScroll()) {
      return this.columnsWidth[index] - this.getTableScrollbarConstant();
    } else {
      return this.columnsWidth[index];
    }
  }

  private getTableScrollbarConstant(): number {
    if (!this.isVerticalScroll()) {
      return 0;
    } else if (this.isMacOS() && this.isFirefox()) {
      return 0;
    } else if (this.isFirefox()) {
      return 8;
    } else {
      return 5;
    }
  }

  private isMacOS(): boolean {
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  }

  private isFirefox(): boolean {
    return navigator.userAgent.toLowerCase().indexOf('firefox') >= 0;
  }

  componentWillLoad() {
    this.prepareTableData();
    setTimeout(() => {
      this.evaluateCellsWidth();

      if (!this.resizeObserver && window.ResizeObserver) {
        this.resizeObserver = new ResizeObserver(() => {
          readTask(() => {
            this.evaluateCellsWidth();
          });
        });
      }

      this.resizeObserver?.observe(document.querySelector('gux-table-beta'));
    });
  }

  disconnectedCallback() {
    this.resizeObserver?.unobserve(document.querySelector('gux-table-beta'));
  }

  render() {
    return (
      <div class="gux-table">
        {this.isHorizontalScroll && (
          <div
            class={
              this.isScrolledToFirstCell
                ? 'gux-scroll-left disabled'
                : 'gux-scroll-left'
            }
            onClick={
              !this.isScrolledToFirstCell && this.previousColumn.bind(this)
            }
          >
            ‹
          </div>
        )}
        {this.isHorizontalScroll && (
          <div
            class={
              this.isScrolledToLastCell
                ? 'gux-scroll-right disabled'
                : 'gux-scroll-right'
            }
            onClick={!this.isScrolledToLastCell && this.nextColumn.bind(this)}
          >
            ›
          </div>
        )}
        <div class={this.getTableClasses}>
          <div
            class="gux-table-header"
            style={{
              visibility: this.columnsWidth.length ? 'unset' : 'hidden'
            }}
          >
            {this.columns.map((column, index) => (
              <div
                class={this.getCellClasses('header', column)}
                style={{ minWidth: `${this.columnsWidth[index]}px` }}
                key={`column-${index}`}
              >
                <b>{column.name}</b>
              </div>
            ))}
          </div>
          {!!this.rows.length && (
            <div
              class="gux-table-body"
              style={{
                visibility: this.columnsWidth.length ? 'unset' : 'hidden'
              }}
            >
              {this.rows.map((row, rowIndex) => (
                <div class="gux-table-body-row" key={`row-${rowIndex}`}>
                  {row.map((rowCell, cellIndex) => (
                    <div
                      class={this.getCellClasses('body', rowCell)}
                      style={{
                        minWidth: `${this.getRowCellWidth(cellIndex)}px`
                      }}
                      key={`row-${rowIndex}-cell-${cellIndex}`}
                    >
                      <p>{rowCell.value}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
        {this.isTableEmpty() && (
          <div class="empty-table">
            <h2>{this.emptyMessage}</h2>
          </div>
        )}
        <slot name="data" />
      </div>
    );
  }
}

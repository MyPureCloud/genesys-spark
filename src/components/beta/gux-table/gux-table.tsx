import {
  Component,
  Element,
  h,
  Listen,
  Prop,
  readTask,
  State
} from '@stencil/core';

interface TableHeaderCell {
  name: string;
  type: string;
  value: string;
  sortable?: boolean;
  sortDirection?: string;
}

interface TableRow {
  selected: boolean;
}

@Component({
  styleUrl: 'gux-table.less',
  tag: 'gux-table-beta'
})
export class GuxTable {
  @Element()
  root: HTMLElement;

  @State()
  private columns: TableHeaderCell[] = [];

  private rows: TableRow[] = [];
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

  @Listen('scroll', { capture: true })
  onScroll() {
    const scrollLeft = this.tableContainer.querySelector('.gux-table-body')
      .scrollLeft;
    const maxScrollLeft =
      this.tableContainer.querySelector('.gux-table-body').scrollWidth -
      this.tableContainer.querySelector('.gux-table-body').clientWidth;
    this.tableContainer.querySelector(
      '.gux-table-head'
    ).scrollLeft = scrollLeft;

    if (scrollLeft === 0) {
      this.isScrolledToFirstCell = true;
    } else if (maxScrollLeft - scrollLeft - this.tableScrollbarConstant === 0) {
      this.isScrolledToLastCell = true;
    }
  }

  private get tableContainer(): HTMLElement {
    return this.root.children[0] as HTMLElement;
  }

  private get isTableEmpty(): boolean {
    return (
      !this.root.children[0] ||
      this.root.children[0].querySelectorAll('tbody tr').length < 1
    );
  }

  private get isVerticalScroll(): boolean {
    const rowsCount = this.tableContainer.querySelectorAll(
      '.gux-table-body tbody tr'
    ).length;
    return rowsCount * (this.compact ? 24 : 40) > this.root.clientHeight;
  }

  private get headerWidth(): number {
    return this.columnsWidth.reduce((a, b) => a + b + 12 + 24 + 1, 0);
  }

  private get tableScrollbarConstant(): number {
    const container = this.tableContainer.querySelector(
      '.gux-table-body'
    ) as HTMLElement;
    return container.offsetWidth - container.clientWidth;
  }

  private get tableClasses(): string {
    return [
      'gux-table',
      this.isVerticalScroll ? 'vertical-scroll' : '',
      this.isHorizontalScroll ? 'horizontal-scroll' : ''
    ]
      .join(' ')
      .trim();
  }

  private get tableBodyClasses(): string {
    return [
      'gux-table-body',
      this.compact ? 'compact' : '',
      this.objectTable ? 'object-table' : ''
    ]
      .join(' ')
      .trim();
  }

  private previousColumn(): void {
    const columns = Array.from(
      this.tableContainer.querySelectorAll('.gux-table-body thead th')
    );

    const currentScrollX = this.tableContainer.querySelector('.gux-table-body')
      .scrollLeft;
    const containerWidth = this.root.getBoundingClientRect().width;
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

    this.isScrolledToLastCell = false;
    const scrollToValue = currentScrollX + containerWidth - columnsWidth;
    this.tableContainer.querySelector('.gux-table-body').scrollLeft = Math.ceil(
      currentScrollX - scrollToValue
    );
  }

  private nextColumn(): void {
    const columns = Array.from(
      this.tableContainer.querySelectorAll('.gux-table-body thead th')
    );

    const currentScrollX = this.tableContainer.querySelector('.gux-table-body')
      .scrollLeft;
    const containerWidth = this.root.getBoundingClientRect().width;
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

    this.tableContainer.querySelector('.gux-table-body').scrollLeft = Math.ceil(
      columnsWidth - containerWidth
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

  private getHeaderCellClasses(cell: TableHeaderCell): string {
    return [
      cell.type === 'number' ? 'cell-number' : '',
      cell.type === 'action' ? 'cell-action' : ''
    ]
      .join(' ')
      .trim();
  }

  private prepareTableData(): void {
    this.columns = Array.from(
      this.tableContainer.querySelectorAll('.gux-table-body thead th')
    ).map((column: HTMLElement, index: number) => {
      return {
        name: column.dataset.columnName || index.toString(),
        sortable: column.dataset.hasOwnProperty('sortable'),
        sortDirection: '',
        value: column.innerHTML,
        type: this.getColumnType(column)
      };
    });

    this.rows = Array.from(
      this.tableContainer.querySelectorAll('.gux-table-body tbody tr')
    ).map((row, rowIndex) => {
      Array.from(row.querySelectorAll('td')).forEach((cell, cellIndex) => {
        cell.setAttribute('data-row', rowIndex.toString());
        cell.setAttribute('data-row-cell', cellIndex.toString());
      });

      return {
        selected: false
      };
    });
  }

  private evaluateCellsWidth(): void {
    const tableWidth = this.tableContainer
      .querySelector('.gux-table-body table')
      .getBoundingClientRect().width;
    const containerWidth = this.root.getBoundingClientRect().width;

    if (tableWidth <= containerWidth) {
      this.isHorizontalScroll = false;
    } else {
      this.isHorizontalScroll = true;
    }

    const columns = Array.from(
      this.tableContainer.querySelectorAll('.gux-table-body thead th')
    );

    this.columnsWidth = columns.map((column, index) => {
      let columnWidth = column.getBoundingClientRect().width - 12 - 24 - 1;

      if (this.isVerticalScroll && index === columns.length - 1) {
        columnWidth += this.tableScrollbarConstant;
      }
      if (
        this.isHorizontalScroll &&
        (index === 0 || index === columns.length - 1)
      ) {
        columnWidth -= 24;
      }

      return columnWidth;
    });
  }

  componentWillLoad() {
    setTimeout(() => {
      this.prepareTableData();
      this.evaluateCellsWidth();

      if (!this.resizeObserver && window.ResizeObserver) {
        this.resizeObserver = new ResizeObserver(() => {
          readTask(() => {
            this.evaluateCellsWidth();
          });
        });
      }

      this.resizeObserver?.observe(
        this.tableContainer.querySelector('.gux-table-body table')
      );
    });
  }

  disconnectedCallback() {
    this.resizeObserver?.unobserve(
      this.tableContainer.querySelector('.gux-table-body table')
    );
  }

  render() {
    return (
      <div class={this.tableClasses}>
        <div class="gux-table-head">
          {this.isHorizontalScroll && (
            <div
              class={
                this.isScrolledToFirstCell
                  ? 'gux-table-scroll-left disabled'
                  : 'gux-table-scroll-left'
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
                  ? 'gux-table-scroll-right disabled'
                  : 'gux-table-scroll-right'
              }
              onClick={!this.isScrolledToLastCell && this.nextColumn.bind(this)}
            >
              ›
            </div>
          )}
          <table style={{ width: `${this.headerWidth}px` }}>
            <thead>
              <tr>
                {!!this.columns.length &&
                  this.columns.map((column, index) => (
                    <th
                      class={this.getHeaderCellClasses(column)}
                      style={{ minWidth: `${this.columnsWidth[index]}px` }}
                    >
                      {column.value}
                    </th>
                  ))}
              </tr>
            </thead>
          </table>
        </div>
        <div class={this.tableBodyClasses}>
          <slot name="data" />
        </div>
        {this.isTableEmpty && (
          <div class="empty-table">
            <h2>{this.emptyMessage}</h2>
          </div>
        )}
      </div>
    );
  }
}

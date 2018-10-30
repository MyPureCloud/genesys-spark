import { Component, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
  styleUrl: 'genesys-pagination-buttons.less',
  tag: 'genesys-pagination-buttons'
})
export class GenesysPaginationButtons {
  @Prop({ mutable: true })
  currentPage: number;

  @Prop()
  totalPages: number;

  @Event()
  currentPageChanged: EventEmitter<number>;

  private inputRef: HTMLInputElement;

  render() {
    return (
      <div class="pagination-buttons">
        <button class="first-page-button" onClick={() => this.setPage(1)}>
          {'<<'}
        </button>
        <button
          class="previous-page-button"
          onClick={() => this.setPage(this.currentPage - 1)}
        >
          {'<'}
        </button>

        <span>
          Page{' '}
          <input
            class="pagination-current-page-input"
            type="text"
            value={this.currentPage}
            ref={ref => (this.inputRef = ref)}
            onChange={() => this.setPage(this.inputRef.value)}
          />
          {` of ${this.totalPages}`}
        </span>

        <button
          class="next-page-button"
          onClick={() => this.setPage(this.currentPage + 1)}
        >
          {'>'}
        </button>
        <button
          class="last-page-button"
          onClick={() => this.setPage(this.totalPages)}
        >
          {'>>'}
        </button>
      </div>
    );
  }

  private setPage(page: number | string) {
    if (typeof page === 'string') {
      page = parseInt(page, 10);
    }

    this.currentPageChanged.emit(page);
  }
}

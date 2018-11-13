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
        <genesys-button class="first-page-button" onClick={() => this.setPage(1)} leftIcon="genesys-icon-arrow-left-dbl">
        </genesys-button>
        <genesys-button class="previous-page-button" onClick={() => this.setPage(this.currentPage - 1)} leftIcon="genesys-icon-chevron-small-left">
        </genesys-button>

        <span class="genesys-pagination-current-page-text">
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

        <genesys-button class="next-page-button" onClick={() => this.setPage(this.currentPage + 1)} leftIcon="genesys-icon-chevron-small-right">
        </genesys-button>
        <genesys-button class="last-page-button" onClick={() => this.setPage(this.totalPages)} leftIcon="genesys-icon-arrow-right-dbl">
        </genesys-button>
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

import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

import { GuxTextField } from '../../gux-text-field/gux-text-field';

@Component({
  styleUrl: 'gux-pagination-buttons.less',
  tag: 'gux-pagination-buttons'
})
export class GuxPaginationButtons {
  @Prop({ mutable: true })
  currentPage: number;

  @Prop()
  totalPages: number;

  get onFirstPage(): boolean {
    return this.currentPage <= 1;
  }

  get onLastPage(): boolean {
    return this.currentPage >= this.totalPages;
  }

  @Event()
  currentPageChanged: EventEmitter<number>;

  private textFieldRef: GuxTextField;

  render() {
    return (
      <div class="pagination-buttons">
        <div class="back-buttons">
          <gux-button
            class="first-page-button"
            onClick={() => this.currentPageChanged.emit(1)}
            disabled={this.onFirstPage}
          >
            <span role="img" class="genesys-icon-arrow-left-dbl" />
          </gux-button>
          <gux-button
            class="previous-page-button"
            onClick={() => this.currentPageChanged.emit(this.currentPage - 1)}
            disabled={this.onFirstPage}
          >
            <span role="img" class="genesys-icon-chevron-small-left" />
          </gux-button>
        </div>
        <span class="gux-pagination-current-page-text">
          Page{' '}
          <gux-text-field
            class="pagination-current-page-input"
            value={this.currentPage + ''}
            ref={ref => (this.textFieldRef = ref as any)}
            onChange={() => this.setPageFromInput(this.textFieldRef.value)}
            useClearButton={false}
          />
          {` of ${this.totalPages}`}
        </span>

        <div class="forward-buttons">
          <gux-button
            class="next-page-button"
            onClick={() => this.currentPageChanged.emit(this.currentPage + 1)}
            disabled={this.onLastPage}
          >
            <span role="img" class="genesys-icon-chevron-small-right" />
          </gux-button>
          <gux-button
            class="last-page-button"
            onClick={() => this.currentPageChanged.emit(this.totalPages)}
            disabled={this.onLastPage}
          >
            <span role="img" class="genesys-icon-arrow-right-dbl" />
          </gux-button>
        </div>
      </div>
    );
  }

  private setPageFromInput(value: string) {
    const page = parseInt(value, 10);

    if (!page || isNaN(page)) {
      this.textFieldRef.value = this.currentPage + '';
    } else {
      this.currentPageChanged.emit(page);
    }
  }
}

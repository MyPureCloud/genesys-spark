import { Component, Event, EventEmitter, Prop } from '@stencil/core';
import { GenesysTextField } from '../../genesys-text-field/genesys-text-field';

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

  private inputRef: GenesysTextField;

  render() {
    return (
      <div class="pagination-buttons">
        <genesys-button
          class="first-page-button"
          onClick={() => this.setPage(1)}
          leftIcon="genesys-icon-arrow-left-dbl"
        />
        <genesys-button
          class="previous-page-button"
          onClick={() => this.setPage(this.currentPage - 1)}
          leftIcon="genesys-icon-chevron-small-left"
        />

        <span class="genesys-pagination-current-page-text">
          Page{' '}
          <genesys-text-field
            class="pagination-current-page-input"
            value={this.currentPage + ''}
            ref={ref => (this.inputRef = ref as any)}
            onChange={() => this.setPage(this.inputRef.value)}
            useClearButton={false}
          />
          {` of ${this.totalPages}`}
        </span>

        <genesys-button
          class="next-page-button"
          onClick={() => this.setPage(this.currentPage + 1)}
          leftIcon="genesys-icon-chevron-small-right"
        />
        <genesys-button
          class="last-page-button"
          onClick={() => this.setPage(this.totalPages)}
          leftIcon="genesys-icon-arrow-right-dbl"
        />
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

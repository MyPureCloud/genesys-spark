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

  private textFieldRef: GenesysTextField;

  render() {
    return (
      <div class="pagination-buttons">
        <div class="back-buttons">
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
        </div>
        <span class="genesys-pagination-current-page-text">
          Page{' '}
          <genesys-text-field
            class="pagination-current-page-input"
            value={this.currentPage + ''}
            ref={ref => (this.textFieldRef = ref as any)}
            onChange={() => this.setPage(this.textFieldRef.value)}
            useClearButton={false}
          />
          {` of ${this.totalPages}`}
        </span>

        <div class="forward-buttons">
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
      </div>
    );
  }

  private setPage(page: number | string) {
    if (typeof page === 'string') {
      page = parseInt(page, 10);
    }

    if (!page || isNaN(page)) {
      page = this.currentPage;
    } else {
      this.currentPageChanged.emit(page);
    }

    this.textFieldRef.value = page + '';
  }
}

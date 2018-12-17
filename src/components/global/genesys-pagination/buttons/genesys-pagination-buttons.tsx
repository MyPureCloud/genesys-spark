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

  get onFirstPage(): boolean {
    return this.currentPage <= 1;
  }

  get onLastPage(): boolean {
    return this.currentPage >= this.totalPages;
  }

  @Event()
  currentPageChanged: EventEmitter<number>;

  private textFieldRef: GenesysTextField;

  render() {
    return (
      <div class="pagination-buttons">
        <div class="back-buttons">
          <genesys-button
            class="first-page-button"
            onClick={() => this.currentPageChanged.emit(1)}
            leftIcon="genesys-icon-arrow-left-dbl"
            disabled={this.onFirstPage}
          />
          <genesys-button
            class="previous-page-button"
            onClick={() => this.currentPageChanged.emit(this.currentPage - 1)}
            leftIcon="genesys-icon-chevron-small-left"
            disabled={this.onFirstPage}
          />
        </div>
        <span class="genesys-pagination-current-page-text">
          Page{' '}
          <genesys-text-field
            class="pagination-current-page-input"
            value={this.currentPage + ''}
            ref={ref => (this.textFieldRef = ref as any)}
            onChange={() => this.setPageFromInput(this.textFieldRef.value)}
            useClearButton={false}
          />
          {` of ${this.totalPages}`}
        </span>

        <div class="forward-buttons">
          <genesys-button
            class="next-page-button"
            onClick={() => this.currentPageChanged.emit(this.currentPage + 1)}
            leftIcon="genesys-icon-chevron-small-right"
            disabled={this.onLastPage}
          />
          <genesys-button
            class="last-page-button"
            onClick={() => this.currentPageChanged.emit(this.totalPages)}
            leftIcon="genesys-icon-arrow-right-dbl"
            disabled={this.onLastPage}
          />
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

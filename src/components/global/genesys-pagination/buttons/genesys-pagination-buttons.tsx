import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { Pager } from '../pager';

@Component({
  tag: 'genesys-pagination-buttons',
  styleUrl: 'genesys-pagination-buttons.scss'
})
export class GenesysPaginationButtons implements Pager {
  @Prop()
  currentPage: number;

  @Prop()
  totalPages: number;

  @Event()
  pageChanged: EventEmitter<number>;

  setPage(page: number): void {
    if (page > this.totalPages) {
      this.setPage(this.totalPages);
      return;
    }

    if (page < 1) {
      this.setPage(1);
      return;
    }

    if (this.currentPage === page) return;

    this.currentPage = page;
    this.pageChanged.emit(this.currentPage);
  }

  firstPage(): void {
    this.setPage(1);
  }

  lastPage(): void {
    this.setPage(this.totalPages);
  }

  nextPage(): void {
    this.setPage(this.currentPage + 1);
  }

  previousPage(): any {
    this.setPage(this.currentPage - 1);
  }

  render() {
    return (
      <div class="pagination-buttons">
        <button class="first-page-button">{'<<'}</button>
        <button class="next-page-button">{'<'}</button>

        <span>
          Page <input type="text" value={this.currentPage} />
          {` of ${this.totalPages}`}
        </span>

        <button class="previous-page-button">{'>'}</button>
        <button class="last-page-button">{'>>'}</button>
      </div>
    );
  }
}

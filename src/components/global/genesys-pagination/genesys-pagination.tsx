import { Component, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'genesys-pagination',
  styleUrl: 'genesys-pagination.scss'
})
export class GenesysPagination {
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
      <div class="gux-pagination">
        <div class="pagination-items-count">
          {/* TODO: Implement the item count */}
          <span>1 - 25 of 9000</span>
        </div>

        <div class="pagination-items-per-page">
          {/* TODO: Implement items per page dropdown */}
          <span>
            <select>
              <option>25</option>
              <option>50</option>
              <option>75</option>
              <option>100</option>
            </select>
          </span>
        </div>

        <div class="pagination-buttons">
          <button class="first-page-button">{'<<'}</button>
          <button class="next-page-button">{'<'}</button>

          <span>
            Page <input type="text" value={this.currentPage} /> of{' '}
            {this.totalPages}
          </span>

          <button class="previous-page-button">{'>'}</button>
          <button class="last-page-button">{'>>'}</button>
        </div>
      </div>
    );
  }
}

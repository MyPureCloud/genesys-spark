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
    return <div>Hello, World!</div>;
  }
}

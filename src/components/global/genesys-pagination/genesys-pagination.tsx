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

  firstPage(): void {
    if (this.currentPage === 1) return;
    this.currentPage = 1;
    this.pageChanged.emit(this.currentPage);
  }

  lastPage(): void {
    if (this.currentPage === this.totalPages) return;
    this.currentPage = this.totalPages;
    this.pageChanged.emit(this.currentPage);
  }

  nextPage(): void {
    if (this.currentPage >= this.totalPages) return;
    this.currentPage++;
    this.pageChanged.emit(this.currentPage);
  }

  previousPage(): any {
    if (this.currentPage <= 1) return;
    this.currentPage--;
    this.pageChanged.emit(this.currentPage);
  }

  render() {
    return <div>Hello, World!</div>;
  }
}

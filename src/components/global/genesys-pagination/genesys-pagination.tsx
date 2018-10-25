import { Component, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
  styleUrl: 'genesys-pagination.less',
  tag: 'genesys-pagination'
})
export class GenesysPagination {
  @Prop({ mutable: true })
  currentPage: number = 1;

  @Prop()
  totalItems: number;

  @Prop()
  itemsPerPage: number = 25;

  itemsPerPageOptions: number[] = [25, 50, 100];

  @Event()
  pageChanged: EventEmitter<number>;

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  setPage(page: number): void {
    if (page > this.totalPages) {
      this.setPage(this.totalPages);
      return;
    }

    if (page < 1) {
      this.setPage(1);
      return;
    }

    if (this.currentPage === page) {
      return;
    }

    this.currentPage = page;
    this.pageChanged.emit(this.currentPage);
  }

  render() {
    return (
      <div class="gux-pagination">
        <genesys-pagination-item-counts />
        <genesys-pagination-items-per-page />

        <genesys-pagination-buttons
          class="pagination-buttons"
          currentPage={this.currentPage}
          totalPages={this.totalPages}
          onCurrentPageChanged={ev => this.setPage(ev.detail)}
        />
      </div>
    );
  }
}

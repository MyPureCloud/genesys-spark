import { Component, Prop } from '@stencil/core';

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
  itemsPerPage: number;

  itemsPerPageOptions: number[] = [25, 50, 100];

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  render() {
    return (
      <div class="gux-pagination">
        <genesys-pagination-item-counts />

        <genesys-pagination-buttons
          class="pagination-buttons"
          currentPage={this.currentPage}
          totalPages={this.totalPages}
          onPageChanged={ev => (this.currentPage = ev.detail)}
        />
      </div>
    );
  }
}

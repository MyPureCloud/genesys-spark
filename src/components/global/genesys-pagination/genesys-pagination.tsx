import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'genesys-pagination',
  styleUrl: 'genesys-pagination.scss'
})
export class GenesysPagination {
  @Prop()
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
        <div class="pagination-items-count">
          {/* TODO: Implement the item count */}
          <span>1 - 25 of 9000</span>
        </div>

        <div class="pagination-items-per-page">
          {/* TODO: Implement items per page dropdown */}
          <span>
            <select>
              <option>25</option>
            </select>
          </span>
        </div>

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

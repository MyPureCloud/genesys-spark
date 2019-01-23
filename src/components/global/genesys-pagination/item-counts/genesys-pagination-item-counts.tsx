import { Component, Prop } from '@stencil/core';

@Component({
  styleUrl: 'genesys-pagination-item-counts.less',
  tag: 'genesys-pagination-item-counts'
})
export class GenesysPaginationItemCounts {
  @Prop()
  totalItems: number;

  @Prop()
  currentPage: number = 1;

  @Prop()
  itemsPerPage: number = 25;

  get firstItem(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get lastItem(): number {
    const calculatedLastItem = this.firstItem + this.itemsPerPage - 1;
    return calculatedLastItem < this.totalItems
      ? calculatedLastItem
      : this.totalItems;
  }

  render() {
    return (
      <div class="pagination-item-counts">
        <span class="pagination-item-counts-display">
          {this.firstItem} - {this.lastItem} of {this.totalItems}
        </span>
      </div>
    );
  }
}

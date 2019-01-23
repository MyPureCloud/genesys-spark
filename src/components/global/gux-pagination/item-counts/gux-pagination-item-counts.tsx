import { Component, Prop } from '@stencil/core';

@Component({
  styleUrl: 'gux-pagination-item-counts.less',
  tag: 'gux-pagination-item-counts'
})
export class GuxPaginationItemCounts {
  @Prop()
  i18n: (resourceKey: string, context?: any) => string;

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
          {this.i18n &&
            this.i18n('itemCountDisplay', {
              firstItem: this.firstItem,
              lastItem: this.lastItem,
              totalItems: this.totalItems
            })}
        </span>
      </div>
    );
  }
}

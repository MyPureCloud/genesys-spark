import { Component, h, Prop } from '@stencil/core';

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
      <div class="gux-pagination-item-counts">
        <span class="pagination-item-counts-display displayed-item-count">
          {this.i18n &&
            this.i18n('itemCountDisplay', {
              firstItem: this.firstItem,
              lastItem: this.lastItem
            })}
        </span>
        <span />
        <span class="pagination-item-counts-display total-item-count">
          {this.i18n &&
            this.i18n('totalItems', {
              totalItems: this.totalItems
            })}
        </span>
      </div>
    );
  }
}

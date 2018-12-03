import { Component, Element, Prop } from '@stencil/core';
import { buildI18nForComponent } from '../../../i18n';

@Component({
  styleUrl: 'genesys-pagination-item-counts.less',
  tag: 'genesys-pagination-item-counts'
})
export class GenesysPaginationItemCounts {
  @Element()
  element: HTMLElement;

  @Prop()
  totalItems: number;

  @Prop()
  currentPage: number = 1;

  @Prop()
  itemsPerPage: number = 25;

  i18n: (resourceName: string, ...formatArgs: any[]) => string;

  async componentWillLoad() {
    this.i18n = await buildI18nForComponent(this.element, 'genesys-pagination');
  }

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
          {this.i18n(
            'itemCountDisplay',
            this.firstItem,
            this.lastItem,
            this.totalItems
          )}
        </span>
      </div>
    );
  }
}

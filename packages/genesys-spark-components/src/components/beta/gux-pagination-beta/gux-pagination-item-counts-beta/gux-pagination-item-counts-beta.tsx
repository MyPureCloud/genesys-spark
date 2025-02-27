import {
  Component,
  ComponentInterface,
  Element,
  h,
  JSX,
  Prop
} from '@stencil/core';

import { buildI18nForComponent, GetI18nValue } from '../../../../i18n';
import paginationResources from './i18n/en.json';

@Component({
  styleUrl: 'gux-pagination-item-counts-beta.less',
  tag: 'gux-pagination-item-counts-beta'
})
export class GuxPaginationItemCountsBeta implements ComponentInterface {
  @Element()
  private root: HTMLElement;

  private i18n: GetI18nValue;

  @Prop()
  totalItems: number = 0;

  @Prop()
  currentPage: number = 0;

  @Prop()
  itemsPerPage: number = 25;

  private get firstItem(): number {
    if (this.totalItems < 1) {
      return 0;
    }

    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  private get lastItem(): number {
    if (this.totalItems < 1) {
      return 0;
    }

    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

  async componentWillLoad(): Promise<void> {
    this.i18n = await buildI18nForComponent(
      this.root,
      paginationResources,
      'gux-pagination-item-counts-beta'
    );
  }

  private getPaginationItemCountsRange(): JSX.Element {
    if (this.totalItems) {
      return (
        <span>{this.i18n('totalItems', { totalItems: this.totalItems })}</span>
      ) as JSX.Element;
    }
  }

  render(): JSX.Element {
    return (
      <div class="gux-pagination-item-counts-container">
        <span class="gux-pagination-item-counts-range">
          {this.i18n('itemCountDisplay', {
            firstItem: this.firstItem,
            lastItem: this.lastItem
          })}
        </span>
        {this.getPaginationItemCountsRange()}
      </div>
    ) as JSX.Element;
  }
}

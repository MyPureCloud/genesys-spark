import {
  Component,
  ComponentInterface,
  Element,
  h,
  JSX,
  Prop,
  State
} from '@stencil/core';

import { trackComponent } from '../../../usage-tracking';

import {
  GuxItemsPerPage,
  GuxPaginationLayoutBeta
} from './gux-pagination-beta.types';

import {
  calculateTotalPages,
  calculateCurrentPage
} from './gux-pagination-beta.service';

@Component({
  styleUrl: 'gux-pagination-beta.less',
  tag: 'gux-pagination-beta',
  shadow: true
})
export class GuxPaginationBeta implements ComponentInterface {
  @Element()
  private root: HTMLElement;

  /**
   * The currently select page. Changes are watched by the component.
   */
  @Prop({ mutable: true })
  currentPage: number = 1;

  /**
   * The total number of items in the data set. Used to calculate total page count
   */
  @Prop()
  totalItems: number = 0;

  /**
   * The max number of items on a page. Used to calculate total page count
   */
  @Prop({ mutable: true })
  itemsPerPage: GuxItemsPerPage = 25;

  /**
   * True when the total number of pages is unknown.
   */
  @Prop()
  pagesUnknown: boolean = false;

  /**
   * The pagination component can have different layouts to suit the available space
   */
  @Prop()
  layout: GuxPaginationLayoutBeta = 'advanced';

  /**
   * The total number of pages needed for the the data set.
   */
  @State()
  private totalPages: number;

  componentWillLoad(): void {
    trackComponent(this.root, { variant: this.layout });
  }

  componentWillRender(): void {
    this.totalPages = calculateTotalPages(this.totalItems, this.itemsPerPage);
    this.currentPage = calculateCurrentPage(this.totalPages, this.currentPage);
  }

  private renderAdvancedPagination(): JSX.Element {
    return (
      <gux-pagination-advanced-beta
        total-items={this.totalItems}
        current-page={this.currentPage}
        items-per-page={this.itemsPerPage}
        pages-unknown={this.pagesUnknown}
        total-pages={this.totalPages}
      ></gux-pagination-advanced-beta>
    ) as JSX.Element;
  }

  private renderSimplePagination(): JSX.Element {
    return (
      <gux-pagination-simple-beta
        total-items={this.totalItems}
        current-page={this.currentPage}
        items-per-page={this.itemsPerPage}
        pages-unknown={this.pagesUnknown}
        total-pages={this.totalPages}
      ></gux-pagination-simple-beta>
    ) as JSX.Element;
  }

  render(): JSX.Element {
    switch (this.layout) {
      case 'advanced':
        return this.renderAdvancedPagination();
      case 'simple':
        return this.renderSimplePagination();
    }
  }
}

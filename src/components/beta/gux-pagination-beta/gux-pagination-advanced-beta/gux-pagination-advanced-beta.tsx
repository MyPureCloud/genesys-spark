import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Prop,
  State
} from '@stencil/core';

import { trackComponent } from '../../../../usage-tracking';

import {
  GuxItemsPerPage,
  GuxPaginationState
} from '../gux-pagination-beta.types';

import {
  calculateTotalPages,
  calculateCurrentPage
} from '../gux-pagination-beta.service';

@Component({
  styleUrl: '../gux-pagination-beta.less',
  tag: 'gux-pagination-advanced-beta',
  shadow: true
})
export class GuxPaginationAdvancedBeta implements ComponentInterface {
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
   * The total number of pages needed for the the data set.
   */
  @State()
  private totalPages: number;

  @Event()
  private guxpaginationchange: EventEmitter<GuxPaginationState>;

  private setPage(page: number): void {
    if (page < 0) {
      if (this.totalPages > 0) {
        this.setPage(1);
      } else {
        this.setPage(0);
      }

      return;
    }

    const totalPages = calculateTotalPages(this.totalItems, this.itemsPerPage);
    if (page > totalPages) {
      this.setPage(totalPages);
      return;
    }

    this.currentPage = page;
    this.guxpaginationchange.emit({
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage
    });
  }

  private handleInternalitemsperpagechange(event: CustomEvent): void {
    this.itemsPerPage = event.detail as GuxItemsPerPage;
    this.setPage(1);
  }

  private handleInternalcurrentpagechange(event: CustomEvent): void {
    this.setPage(event.detail as number);
  }

  componentWillLoad(): void {
    trackComponent(this.root, { variant: 'advanced' });
  }

  componentWillRender(): void {
    this.totalPages = calculateTotalPages(this.totalItems, this.itemsPerPage);
    this.currentPage = calculateCurrentPage(this.totalPages, this.currentPage);
  }

  render(): JSX.Element {
    return (
      <div class="gux-pagination-container">
        <div class="gux-pagination-info">
          <gux-pagination-item-counts-beta
            total-items={this.totalItems}
            current-page={this.currentPage}
            items-per-page={this.itemsPerPage}
            pages-unknown={this.pagesUnknown}
          />
          <gux-pagination-items-per-page-beta
            items-per-page={this.itemsPerPage}
            onInternalitemsperpagechange={this.handleInternalitemsperpagechange.bind(
              this
            )}
          />
        </div>
        <div class="gux-pagination-change">
          <gux-pagination-buttons-beta
            layout="advanced"
            current-page={this.currentPage}
            total-pages={this.totalPages}
            onInternalcurrentpagechange={this.handleInternalcurrentpagechange.bind(
              this
            )}
          />
        </div>
      </div>
    ) as JSX.Element;
  }
}

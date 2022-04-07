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

import {
  GuxItemsPerPage,
  GuxPaginationState
} from '../../stable/gux-pagination/gux-pagination.types';
import { trackComponent } from '../../../usage-tracking';

import { GuxPaginationLayoutBeta } from './gux-pagination.types';

@Component({
  styleUrl: 'gux-pagination.less',
  tag: 'gux-pagination-beta',
  shadow: true
})
export class GuxPaginationBeta implements ComponentInterface {
  @Element()
  private root: HTMLElement;

  /**
   * The pagination component can have different layouts to suit the available space
   */
  @Prop()
  layout: GuxPaginationLayoutBeta = 'advanced';

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

    const totalPages = this.calculateTotalPages(
      this.totalItems,
      this.itemsPerPage
    );
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

  private calculateTotalPages(
    totalItems: number,
    itemsPerPage: number
  ): number {
    return Math.ceil(totalItems / itemsPerPage);
  }

  private calculateCurrentPage(
    totalPages: number,
    currentPage: number
  ): number {
    const minCurrentPage = totalPages > 0 ? 1 : 0;

    return Math.max(minCurrentPage, Math.min(currentPage, totalPages));
  }

  componentWillLoad(): void {
    trackComponent(this.root, { variant: this.layout });
  }

  componentWillRender(): void {
    this.totalPages = this.calculateTotalPages(
      this.totalItems,
      this.itemsPerPage
    );
    this.currentPage = this.calculateCurrentPage(
      this.totalPages,
      this.currentPage
    );
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
          {this.layout === 'advanced' && (
            <gux-pagination-items-per-page-beta
              items-per-page={this.itemsPerPage}
              onInternalitemsperpagechange={this.handleInternalitemsperpagechange.bind(
                this
              )}
            />
          )}
        </div>
        <div class="gux-pagination-change">
          <gux-pagination-buttons-beta
            layout={this.layout}
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

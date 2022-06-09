import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  readTask,
  JSX,
  Prop,
  State
} from '@stencil/core';

import {
  GuxItemsPerPage,
  GuxPaginationState
} from '../../stable/gux-pagination/gux-pagination.types';
import { trackComponent } from '../../../usage-tracking';

import { GuxPaginationLayoutBeta } from './gux-pagination-beta.types';

/**
 * The minimum size in px at which the advanced layout will display.
 * Below this size we switch to the simple layout.
 * This was chosen based on the width required for 3-digit page numbers, so
 * page counts that go into 4 digits could overflow at small sizes.
 */
const MIN_ADVANCED_SIZE = 810;

@Component({
  styleUrl: 'gux-pagination-beta.less',
  tag: 'gux-pagination-beta',
  shadow: true
})
export class GuxPaginationBeta implements ComponentInterface {
  @Element()
  private root: HTMLElement;

  private resizeObserver?: ResizeObserver;

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
   * The total number of pages needed for the the data set.
   */
  @State()
  private totalPages: number;

  /**
   * Pagination layout to display based on resize observer
   */
  @State()
  displayedLayout: GuxPaginationLayoutBeta;

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

  private checkPaginationContainerWidthForLayout() {
    readTask(() => {
      const el = this.root.shadowRoot.querySelector(
        '.gux-pagination-container'
      );
      const paginationContainerWidth = el.clientWidth;
      if (paginationContainerWidth < MIN_ADVANCED_SIZE) {
        this.displayedLayout = 'simple';
      } else {
        this.displayedLayout = this.layout;
      }
    });
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

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(
        this.root.shadowRoot.querySelector('.gux-pagination-container')
      );
    }
  }

  componentDidLoad() {
    if (!this.resizeObserver && window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() =>
        this.checkPaginationContainerWidthForLayout()
      );
    }

    if (this.resizeObserver) {
      this.resizeObserver.observe(
        this.root.shadowRoot.querySelector('.gux-pagination-container')
      );
    }

    setTimeout(() => {
      this.checkPaginationContainerWidthForLayout();
    }, 500);
  }

  render(): JSX.Element {
    return (
      <div class="gux-pagination-container">
        <div class="gux-pagination-info">
          <gux-pagination-item-counts-beta
            total-items={this.totalItems}
            current-page={this.currentPage}
            items-per-page={this.itemsPerPage}
          />
          {this.displayedLayout === 'advanced' && (
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
            layout={this.displayedLayout}
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

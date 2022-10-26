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

import { afterNextRenderTimeout } from '@utils/dom/after-next-render';

import { trackComponent } from '../../../usage-tracking';

import {
  GuxItemsPerPage,
  GuxPaginationState
} from '../../stable/gux-pagination/gux-pagination.types';

import { GuxPaginationLayoutBeta } from './gux-pagination-beta.types';

@Component({
  styleUrl: 'gux-pagination-beta.less',
  tag: 'gux-pagination-beta',
  shadow: true
})
export class GuxPaginationBeta implements ComponentInterface {
  @Element()
  private root: HTMLElement;

  private resizeObserver?: ResizeObserver;

  private switchToOriginalLayoutWidth: number = 0;

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
      const container = this.root.shadowRoot.querySelector(
        '.gux-pagination-container'
      );

      const spacer = this.root.shadowRoot.querySelector(
        '.gux-pagination-spacer'
      );
      const containerWidth = container.clientWidth;
      const spacerWidth = spacer.clientWidth;

      if (spacerWidth < 24 && this.displayedLayout !== 'simple') {
        this.switchToOriginalLayoutWidth = containerWidth;
        this.displayedLayout = 'simple';
      } else if (containerWidth > this.switchToOriginalLayoutWidth) {
        this.switchToOriginalLayoutWidth = 0;
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

    afterNextRenderTimeout(() => {
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
        <div class="gux-pagination-spacer"></div>
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

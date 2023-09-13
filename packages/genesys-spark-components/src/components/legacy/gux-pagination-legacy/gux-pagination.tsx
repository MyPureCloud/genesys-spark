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

import { trackComponent } from '@utils/tracking/usage';

import {
  GuxItemsPerPage,
  GuxPaginationLayout,
  GuxPaginationState
} from './gux-pagination.types';

@Component({
  styleUrl: 'gux-pagination-legacy.scss',
  tag: 'gux-pagination-legacy',
  shadow: true
})
export class GuxPaginationLegacy implements ComponentInterface {
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
   * The pagination component can have different layouts to suit the available space
   */
  @Prop()
  layout: GuxPaginationLayout = 'full';

  /**
   * The total number of pages needed for the the data set.
   */
  @State()
  private totalPages: number;

  @Event()
  private guxpaginationchange: EventEmitter<GuxPaginationState>;

  private setPage(page: number): void {
    if (page <= 0) {
      this.setPage(1);
      return;
    }

    const totalPages = this.calculateTotalPages();
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

  private calculateTotalPages(): number {
    return Math.max(1, Math.ceil(this.totalItems / this.itemsPerPage));
  }

  private calculateCurrentPage(): number {
    const minCurrentPage = this.totalPages > 0 ? 1 : 0;

    return Math.max(
      minCurrentPage,
      Math.min(this.currentPage, this.totalPages)
    );
  }

  private handleInternalitemsperpagechange(event: CustomEvent): void {
    this.itemsPerPage = event.detail as GuxItemsPerPage;
    this.setPage(1);
  }

  private handleInternalcurrentpagechange(event: CustomEvent): void {
    this.setPage(event.detail as number);
  }

  private getPaginationInfoElement(layout: GuxPaginationLayout): JSX.Element {
    if (layout === 'expanded') {
      return null;
    }

    const content = [
      <gux-pagination-item-counts-legacy
        total-items={this.totalItems}
        current-page={this.currentPage}
        items-per-page={this.itemsPerPage}
      />
    ];

    if (layout === 'full') {
      content.push(
        <gux-pagination-items-per-page-legacy
          items-per-page={this.itemsPerPage}
          onInternalitemsperpagechange={this.handleInternalitemsperpagechange.bind(
            this
          )}
        ></gux-pagination-items-per-page-legacy>
      );
    }

    return (<div class="gux-pagination-info">{content}</div>) as JSX.Element;
  }

  componentWillLoad(): void {
    trackComponent(this.root, { variant: this.layout });
  }

  componentWillRender(): void {
    this.totalPages = this.calculateTotalPages();
    this.currentPage = this.calculateCurrentPage();
  }

  render(): JSX.Element {
    return (
      <div class="gux-pagination-container">
        {this.getPaginationInfoElement(this.layout)}
        <div class="gux-pagination-change">
          <gux-pagination-buttons-legacy
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

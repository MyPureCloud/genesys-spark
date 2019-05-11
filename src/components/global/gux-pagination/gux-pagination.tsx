import {
  Component,
  Element,
  Event,
  EventEmitter,
  Method,
  Prop
} from '@stencil/core';
import { GuxPaginationLayout } from './gux-pagination-layout';

import { buildI18nForComponent } from '../../i18n';
import paginationResources from './gux-pagination.i18n.json';

@Component({
  styleUrl: 'gux-pagination.less',
  tag: 'gux-pagination'
})
export class GuxPagination {
  @Element()
  element: HTMLElement;

  /**
   * The currently select page. Changes are watched by the component.
   */
  @Prop({ mutable: true })
  currentPage: number = 1;

  /**
   * The total number of items in the data set. Used to calculate total page count
   */
  @Prop()
  totalItems: number;

  /**
   * The responsive size of the control to use: "small", "medium", or "large". See
   * the exported recommendedBreakpoints for the pixel widths that are recommended
   * for each size.
   */
  @Prop()
  layout: GuxPaginationLayout | string = GuxPaginationLayout.Large;

  @Prop({ mutable: true })
  itemsPerPage: number = 25;

  @Prop({ mutable: true })
  itemsPerPageOptions: number[] = [25, 50, 100];

  /**
   * Fired when the current page property changes.
   */
  @Event()
  pageChanged: EventEmitter<number>;

  /**
   * Fired when user selects a new number of items per page.
   */
  @Event()
  itemsPerPageChanged: EventEmitter<number>;
  itemsPerPageComponent: HTMLGuxPaginationItemsPerPageElement;

  private i18n: (resourceKey: string, context?: any) => string;

  async componentWillLoad() {
    this.i18n = await buildI18nForComponent(this.element, paginationResources);
  }

  calculatTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  /**
   * Sets the number of items to display on a single page, and optionally the list
   * of items that the user can choose from in the dropdown.
   *
   * If options are omitted, the user selection dropdown won't be displayed.
   *
   * @param value The number of items to show per page.
   * @param options The values the user can choose from.
   */
  @Method()
  setItemsPerPage(value: number, options?: number[]): void {
    this.itemsPerPageOptions = options;
    this.itemsPerPage = value;

    this.itemsPerPageComponent.setItemsPerPage(value, options);
  }

  @Method()
  setPage(page: number): void {
    const totalPages = this.calculatTotalPages();
    if (page > totalPages) {
      this.setPage(totalPages);
      return;
    }

    if (page < 1) {
      this.setPage(1);
      return;
    }

    if (this.currentPage === page) {
      return;
    }

    this.currentPage = page;
    this.pageChanged.emit(this.currentPage);
  }

  componentWillUpdate() {
    const totalPages = this.calculatTotalPages();
    if (this.currentPage > totalPages) {
      this.currentPage = totalPages;
    }
  }

  render() {
    return (
      <div class={`gux-pagination gux-pagination-layout-${this.layout}`}>
        <gux-pagination-item-counts
          totalItems={this.totalItems}
          currentPage={this.currentPage}
          itemsPerPage={this.itemsPerPage}
          i18n={this.i18n}
        />

        {!this.itemsPerPageOptions || !this.itemsPerPageOptions.length ? (
          <div />
        ) : (
          <gux-pagination-items-per-page
            ref={ref =>
              (this.itemsPerPageComponent = ref as HTMLGuxPaginationItemsPerPageElement)
            }
            onItemsPerPageChanged={ev => {
              this.itemsPerPage = ev.detail;
            }}
            itemsPerPage={this.itemsPerPage}
            itemsPerPageOptions={this.itemsPerPageOptions}
            i18n={this.i18n}
          />
        )}

        <gux-pagination-buttons
          class={`pagination-buttons gux-pagination-layout-${this.layout}`}
          currentPage={this.currentPage}
          totalPages={this.calculatTotalPages()}
          onCurrentPageChanged={ev => this.setPage(ev.detail)}
        />
      </div>
    );
  }
}

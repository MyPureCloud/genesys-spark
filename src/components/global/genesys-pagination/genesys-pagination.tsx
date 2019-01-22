import {
  Component,
  Event,
  EventEmitter,
  Method,
  Prop,
  State
} from '@stencil/core';
import { GenesysPaginationLayout } from './genesys-pagination-layout';

@Component({
  styleUrl: 'genesys-pagination.less',
  tag: 'genesys-pagination'
})
export class GenesysPagination {
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
  layout: GenesysPaginationLayout | string = GenesysPaginationLayout.Large;

  @State()
  itemsPerPage: number = 25;

  @State()
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
  itemsPerPageComponent: HTMLGenesysPaginationItemsPerPageElement;

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
      <div
        class={`genesys-pagination genesys-pagination-layout-${this.layout}`}
      >
        <genesys-pagination-item-counts
          totalItems={this.totalItems}
          currentPage={this.currentPage}
          itemsPerPage={this.itemsPerPage}
        />

        {!this.itemsPerPageOptions || !this.itemsPerPageOptions.length ? (
          <div />
        ) : (
          <genesys-pagination-items-per-page
            ref={ref =>
              (this.itemsPerPageComponent = ref as HTMLGenesysPaginationItemsPerPageElement)
            }
            onItemsPerPageChanged={ev => {
              this.itemsPerPage = ev.detail;
            }}
          />
        )}

        <genesys-pagination-buttons
          class={`pagination-buttons genesys-pagination-layout-${this.layout}`}
          currentPage={this.currentPage}
          totalPages={this.calculatTotalPages()}
          onCurrentPageChanged={ev => this.setPage(ev.detail)}
        />
      </div>
    );
  }
}

import {
  Component,
  Element,
  Event,
  EventEmitter,
  Method,
  Prop,
  State
} from '@stencil/core';
import { buildI18nForComponent } from '../../i18n';
import paginationResources from './genesys-pagination.i18n.json';
import { GenesysPaginationSize } from './genesys-pagination-size';

@Component({
  styleUrl: 'genesys-pagination.less',
  tag: 'genesys-pagination'
})
export class GenesysPagination {
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
  paginationSize: GenesysPaginationSize | string = GenesysPaginationSize.Large;

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
      <div
        class={`genesys-pagination genesys-pagination-size-${
          this.paginationSize
        }`}
      >
        <genesys-pagination-item-counts
          totalItems={this.totalItems}
          currentPage={this.currentPage}
          itemsPerPage={this.itemsPerPage}
          i18n={this.i18n}
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
            i18n={this.i18n}
          />
        )}

        <genesys-pagination-buttons
          class={`pagination-buttons genesys-pagination-size-${
            this.paginationSize
          }`}
          currentPage={this.currentPage}
          totalPages={this.calculatTotalPages()}
          onCurrentPageChanged={ev => this.setPage(ev.detail)}
        />
      </div>
    );
  }
}

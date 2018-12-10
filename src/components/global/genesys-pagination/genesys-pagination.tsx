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

@Component({
  styleUrl: 'genesys-pagination.less',
  tag: 'genesys-pagination'
})
export class GenesysPagination {
  @Element()
  element: HTMLElement;

  @Prop({ mutable: true })
  currentPage: number = 1;

  @Prop()
  totalItems: number;

  @State()
  itemsPerPage: number = 25;

  @State()
  itemsPerPageOptions: number[] = [25, 50, 100];

  @Event()
  pageChanged: EventEmitter<number>;

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
      <div class="gux-pagination">
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
          class="pagination-buttons"
          currentPage={this.currentPage}
          totalPages={this.calculatTotalPages()}
          onCurrentPageChanged={ev => this.setPage(ev.detail)}
        />
      </div>
    );
  }
}

import { ComponentInterface, JSX } from '../../../stencil-public-runtime';
import { GuxItemsPerPage, GuxPaginationLayout } from './gux-pagination.types';
export declare class GuxPagination implements ComponentInterface {
  private root;
  /**
   * The currently select page. Changes are watched by the component.
   */
  currentPage: number;
  /**
   * The total number of items in the data set. Used to calculate total page count
   */
  totalItems: number;
  /**
   * The max number of items on a page. Used to calculate total page count
   */
  itemsPerPage: GuxItemsPerPage;
  /**
   * The pagination component can have different layouts to suit the available space
   */
  layout: GuxPaginationLayout;
  /**
   * The total number of pages needed for the the data set.
   */
  private totalPages;
  private guxpaginationchange;
  private setPage;
  private calculateTotalPages;
  private calculateCurrentPage;
  private handleInternalitemsperpagechange;
  private handleInternalcurrentpagechange;
  private getPaginationInfoElement;
  componentWillLoad(): void;
  componentWillRender(): void;
  render(): JSX.Element;
}

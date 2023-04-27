import { JSX } from '../../../../stencil-public-runtime';
import { GuxPaginationLayout } from '../gux-pagination.types';
export declare class GuxPaginationButtons {
  private root;
  private textFieldRef;
  private i18n;
  currentPage: number;
  totalPages: number;
  layout: GuxPaginationLayout;
  private internalcurrentpagechange;
  private get onFirstPage();
  private get onLastPage();
  private handleClickFirst;
  private handleClickPrevious;
  private handleClickNext;
  private handleClickLast;
  private handleClickPage;
  private setPageFromInput;
  private getPageListEnteries;
  private getSmallPagePicker;
  private getExpandedPagePicker;
  private getFullPagePicker;
  private getPagePicker;
  componentWillLoad(): Promise<void>;
  render(): JSX.Element;
}

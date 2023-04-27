import { JSX } from '../../../../stencil-public-runtime';
import { GuxPaginationLayoutBeta } from '../gux-pagination-beta.types';
export declare class GuxPaginationButtonsBeta {
  private root;
  private i18n;
  currentPage: number;
  totalPages: number;
  layout: GuxPaginationLayoutBeta;
  private internalcurrentpagechange;
  private get onFirstPage();
  private get onLastPage();
  private handleClickFirst;
  private handleClickPrevious;
  private handleClickNext;
  private handleClickLast;
  private handleClickPage;
  private getPageListEnteries;
  private getSmallPagePicker;
  private getFullPagePicker;
  private getPagePicker;
  componentWillLoad(): Promise<void>;
  render(): JSX.Element;
}

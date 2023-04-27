import { ComponentInterface, JSX } from '../../../../stencil-public-runtime';
export declare class GuxPaginationItemCountsBeta implements ComponentInterface {
  private root;
  private i18n;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  private get firstItem();
  private get lastItem();
  componentWillLoad(): Promise<void>;
  private getPaginationItemCountsRange;
  render(): JSX.Element;
}

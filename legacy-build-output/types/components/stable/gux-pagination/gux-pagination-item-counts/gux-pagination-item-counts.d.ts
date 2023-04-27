import { ComponentInterface, JSX } from '../../../../stencil-public-runtime';
export declare class GuxPaginationItemCounts implements ComponentInterface {
  private root;
  private i18n;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  private get firstItem();
  private get lastItem();
  componentWillLoad(): Promise<void>;
  render(): JSX.Element;
}

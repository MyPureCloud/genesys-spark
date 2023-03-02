import { ComponentInterface, JSX } from '../../../../stencil-public-runtime';
import { GuxItemsPerPage } from '../gux-pagination-beta.types';
export declare class GuxPaginationItemsPerPageBeta implements ComponentInterface {
  private i18n;
  private dropdownElement;
  private root;
  itemsPerPage: GuxItemsPerPage;
  private internalitemsperpagechange;
  handleChange(event: CustomEvent): void;
  componentWillLoad(): Promise<void>;
  private getDropdown;
  render(): JSX.Element;
}

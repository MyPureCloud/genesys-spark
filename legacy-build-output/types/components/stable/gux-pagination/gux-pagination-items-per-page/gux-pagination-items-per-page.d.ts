import { ComponentInterface, JSX } from '../../../../stencil-public-runtime';
import { GuxItemsPerPage } from '../gux-pagination.types';
export declare class GuxPaginationItemsPerPage implements ComponentInterface {
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

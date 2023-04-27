import { JSX } from '../../../../stencil-public-runtime';
/**
 * @slot default - Required slot for gux-all-row-select element
 * @slot select-menu-options - Optional slot for gux-list containing gux-list-item children
 */
export declare class GuxTableSelectMenu {
  private tableSelectMenuButtonElement;
  private dropdownOptionsButtonId;
  private hasSelectMenuOptions;
  root: HTMLElement;
  private i18n;
  dropdownDisabled: boolean;
  private popoverHidden;
  private focusFirstItemInPopupList;
  componentWillLoad(): Promise<void>;
  onKeydown(event: KeyboardEvent): void;
  onKeyup(event: KeyboardEvent): void;
  private toggleOptions;
  private renderSelectDropdown;
  render(): JSX.Element;
}

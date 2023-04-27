import { JSX } from '../../../../stencil-public-runtime';
export declare class GuxTableToolbarMenuButton {
  listElement: HTMLGuxListElement;
  dropdownButton: HTMLElement;
  private i18n;
  private root;
  showMenu: boolean;
  expanded: boolean;
  handleKeyDown(event: KeyboardEvent): void;
  handleKeyup(event: KeyboardEvent): void;
  private toggle;
  onClickOutside(): void;
  private focusPopupList;
  private focusFirstItemInPopupList;
  componentWillLoad(): Promise<void>;
  render(): JSX.Element;
}

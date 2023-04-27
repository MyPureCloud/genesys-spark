import { EventEmitter, JSX } from '../../../stencil-public-runtime';
import { GuxActionButtonAccent, GuxActionButtonType } from './gux-action-button.types';
export declare class GuxActionButton {
  private dropdownButton;
  private i18n;
  private root;
  listElement: HTMLGuxListElement;
  /**
   * The component button type
   */
  type: GuxActionButtonType;
  /**
   * Triggered when the menu is open
   */
  open: EventEmitter;
  /**
   * Triggered when the menu is close
   */
  close: EventEmitter;
  /**
   * Triggered when the action button is clicked
   */
  actionClick: EventEmitter;
  /**
   * The component text.
   */
  text: string;
  /**
   * Disables the action button.
   */
  disabled: boolean;
  accent: GuxActionButtonAccent;
  /**
   * It is used to open or not the list.
   */
  isOpen: boolean;
  handleKeydown(event: KeyboardEvent): void;
  handleKeyup(event: KeyboardEvent): void;
  watchDisabled(disabled: boolean): void;
  watchValue(isOpen: boolean): void;
  onClickOutside(event: MouseEvent): void;
  private toggle;
  private focusPopupList;
  private focusFirstItemInPopupList;
  private onActionClick;
  private onListClick;
  componentWillLoad(): Promise<void>;
  render(): JSX.Element;
}

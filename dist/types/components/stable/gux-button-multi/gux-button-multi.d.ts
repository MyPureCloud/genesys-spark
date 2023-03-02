import { EventEmitter, JSX } from '../../../stencil-public-runtime';
import { GuxButtonAccent } from '../../stable/gux-button/gux-button.types';
/**
 * @slot title - slot for icon and button text
 */
export declare class GuxButtonMulti {
  private root;
  listElement: HTMLGuxListElement;
  dropdownButton: HTMLElement;
  /**
   * Triggered when the menu is open
   */
  open: EventEmitter;
  /**
   * Triggered when the menu is close
   */
  close: EventEmitter;
  /**
   * The component text.
   */
  text: string;
  /**
   * Disables the action button.
   */
  disabled: boolean;
  accent: GuxButtonAccent;
  /**
   * It is used to open or not the list.
   */
  isOpen: boolean;
  handleKeydown(event: KeyboardEvent): void;
  handleKeyup(event: KeyboardEvent): void;
  watchDisabled(disabled: boolean): void;
  watchValue(isOpen: boolean): void;
  onClickOutside(): void;
  private toggle;
  private focusPopupList;
  private focusFirstItemInPopupList;
  private onListClick;
  componentWillLoad(): void;
  render(): JSX.Element;
}

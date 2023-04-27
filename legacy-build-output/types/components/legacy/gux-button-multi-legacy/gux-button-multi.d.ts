import { EventEmitter, JSX } from '../../../stencil-public-runtime';
import { GuxButtonAccent } from '../gux-action-button-legacy/gux-button.types';
export declare class GuxButtonMultiLegacy {
  private root;
  listElement: HTMLGuxActionListLegacyElement;
  dropdownButton: HTMLElement;
  private moveFocusDelay;
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
  componentWillLoad(): void;
  render(): JSX.Element;
}

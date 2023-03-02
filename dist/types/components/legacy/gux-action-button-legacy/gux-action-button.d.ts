import { EventEmitter, JSX } from '../../../stencil-public-runtime';
import { GuxButtonAccent, GuxButtonType } from './gux-button.types';
export declare class GuxActionButtonLegacy {
  private dropdownButton;
  private moveFocusDelay;
  private i18n;
  private root;
  actionListElement: HTMLGuxActionListLegacyElement;
  /**
   * The component button type
   */
  type: GuxButtonType;
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
  accent: GuxButtonAccent;
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
  private onActionClick;
  componentWillLoad(): Promise<void>;
  render(): JSX.Element;
}

import { JSX } from '../../../stencil-public-runtime';
export declare class GuxContextMenu {
  private i18n;
  private button;
  listElement: HTMLGuxListElement;
  private buttonId;
  private root;
  /**
   * Screenreader text for context menu button
   * defaults to "context menu"
   */
  screenreaderText: string;
  /**
   * Controls the visibility of the popover list
   */
  private isOpen;
  /**
   * Updates the state on click outside the element
   */
  onClickOutside(): void;
  handleKeyDown(event: KeyboardEvent): void;
  handleKeyup(event: KeyboardEvent): void;
  private focusFirstListItem;
  private focusLastListItem;
  private onButtonClick;
  private onListClick;
  componentWillLoad(): Promise<void>;
  render(): JSX.Element;
}

import { JSX } from '../../../../../stencil-public-runtime';
/**
 * @slot - collection of menu-option, submenu elements
 */
export declare class GuxSubmenu {
  private hideDelayTimeout;
  private popperInstance;
  private buttonElement;
  private submenuElement;
  private submenuContentElement;
  private root;
  label: string;
  private isShown;
  forceUpdate(isShown: boolean): void;
  /**
   * Focus on the components button element
   */
  guxFocus(): Promise<void>;
  onKeydown(event: KeyboardEvent): void;
  onKeyup(event: KeyboardEvent): void;
  onmouseenter(): void;
  onMouseleave(): void;
  onClick(event: MouseEvent): void;
  onFocusin(): void;
  onFocusout(): void;
  private show;
  private hide;
  private runPopper;
  private destroyPopper;
  private focusOnSubmenu;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  render(): JSX.Element;
}

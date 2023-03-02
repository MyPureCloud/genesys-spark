import { JSX } from '../../../stencil-public-runtime';
/**
 * @slot target - target element
 * @slot menu - gux-menu element
 */
export declare class GuxFlyoutMenu {
  private hideDelayTimeout;
  private popperInstance;
  private targetElement;
  private menuContentElement;
  private root;
  private isShown;
  forceUpdate(isShown: boolean): void;
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
  private focusOnMenu;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  render(): JSX.Element;
}

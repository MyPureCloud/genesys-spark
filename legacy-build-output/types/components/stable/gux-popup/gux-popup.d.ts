import { JSX, EventEmitter } from '../../../stencil-public-runtime';
/**
 * @slot target - Required slot for target
 * @slot popup - Required slot for popup
 */
export declare class GuxPopup {
  private popperInstance;
  private targetElementContainer;
  private popupElementContainer;
  expanded: boolean;
  disabled: boolean;
  /**
   * This event will run when the popup transitions to an expanded state.
   */
  internalexpanded: EventEmitter<void>;
  /**
   * This event will run when the popup transitions to a collapsed state.
   */
  internalcollapsed: EventEmitter<void>;
  onExpandedChange(expanded: boolean): void;
  connectedCallback(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  private setPopperInstance;
  render(): JSX.Element;
}

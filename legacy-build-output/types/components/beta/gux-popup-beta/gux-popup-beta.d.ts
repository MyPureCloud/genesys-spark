import { JSX, EventEmitter } from '../../../stencil-public-runtime';
/**
 * @slot target - Required slot for target
 * @slot popup - Required slot for popup
 */
export declare class GuxPopupBeta {
  private targetElementContainer;
  private popupElementContainer;
  private cleanupUpdatePosition;
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
  private runUpdatePosition;
  private updatePosition;
  onExpandedChange(expanded: boolean): void;
  componentDidLoad(): void;
  componentDidUpdate(): void;
  disconnectedCallback(): void;
  render(): JSX.Element;
}

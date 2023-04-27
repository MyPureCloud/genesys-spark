import { EventEmitter, JSX } from '../../../stencil-public-runtime';
import { GuxModalSize } from './gux-modal.types';
/**
 * @slot content - Required slot for the modal content
 * @slot left-align-buttons - Optional slot to set gux-buttons aligned to the left of the modal
 * @slot right-align-buttons - Optional slot to set gux-buttons aligned to the left of the modal
 * @slot title - Optional slot to set the modal title
 */
export declare class GuxModal {
  private dismissButton;
  private triggerElement;
  private root;
  /**
   * Indicates the size of the modal (small, medium or large)
   */
  size: GuxModalSize;
  trapFocus: boolean;
  /**
   * Query selector for the element to initially focus when the modal opens
   * Defaults to the first tabbable element
   */
  initialFocus?: string | undefined;
  /**
   * Fired when a user dismisses the modal (The default behaviour is to remove the component from the DOM)
   */
  guxdismiss: EventEmitter<void>;
  protected handleKeyEvent(event: KeyboardEvent): void;
  connectedCallback(): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  render(): JSX.Element;
  private renderModalTrapFocusEl;
  private getInitialFocusElement;
  private hasModalTitleSlot;
  private hasFooterButtons;
  private onDismissHandler;
}

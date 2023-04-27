import { JSX } from '../../../stencil-public-runtime';
import { GuxLoadingMessageSizes } from './gux-loading-message-size.types';
/**
 * @slot progress - Required slot for progress.
 * @slot primary-guidance - Required slot for primary guidance.
 * @slot additional-guidance - Slot for additional guidance.
 */
export declare class GuxLoadingMessage {
  /**
   * Reference the host element
   */
  root: HTMLElement;
  hasAdditionalGuidance: boolean;
  loadingMessageSize: GuxLoadingMessageSizes;
  private resizeObserver?;
  private updateLoadingMessageSize;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  render(): JSX.Element;
}

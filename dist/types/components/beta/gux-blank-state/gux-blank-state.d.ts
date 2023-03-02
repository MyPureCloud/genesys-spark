import { JSX } from '../../../stencil-public-runtime';
import { GuxBlankStateSizes } from './gux-blank-state.types';
/**
 * @slot primary-message - Required slot for primary-message.
 * @slot image - Slot for gux-icon element.
 * @slot additional-guidance - Slot for additional-guidance.
 * @slot call-to-action - Slot for the message call to action button.
 */
export declare class GuxBlankState {
  /**
   * Reference the host element
   */
  root: HTMLElement;
  blankStateSize: GuxBlankStateSizes;
  onResize(): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  private setBlankStateSize;
  render(): JSX.Element;
}

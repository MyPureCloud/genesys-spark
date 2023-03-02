import { EventEmitter, JSX } from '../../../stencil-public-runtime';
import { GuxSimpleToastAccent } from './gux-simple-toast.types';
/**
 * @slot icon - Required slot for gux-icon
 * @slot message - Required slot for the simple toast message
 */
export declare class GuxSimpleToast {
  /**
   * The component accent.
   */
  accent: GuxSimpleToastAccent;
  guxdismiss: EventEmitter<void>;
  private root;
  componentWillLoad(): void;
  render(): JSX.Element;
  private onDismissClickHandler;
}

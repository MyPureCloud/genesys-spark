import { EventEmitter, JSX } from '../../../stencil-public-runtime';
import { GuxNotificationToastAccent } from './gux-notification-toast.types';
/**
 * @slot icon - Required slot for gux-icon
 * @slot title - Required slot for the notification toast title
 * @slot message - Required slot for the notification toast message
 */
export declare class GuxNotificationToast {
  /**
   * The component accent.
   */
  accent: GuxNotificationToastAccent;
  guxdismiss: EventEmitter<void>;
  private root;
  componentWillLoad(): void;
  render(): JSX.Element;
  private onDismissClickHandler;
}

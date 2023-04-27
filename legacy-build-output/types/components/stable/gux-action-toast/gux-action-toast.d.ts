import { JSX } from '../../../stencil-public-runtime';
/**
 * @slot icon - Required slot for gux-icon
 * @slot title - Required slot for the action toast title
 * @slot message - Required slot for the action toast message
 * @slot negative-button - Required slot for the action toast negative button
 * @slot positive-button - Required slot for the action toast positive button
 */
export declare class GuxActionToast {
  private root;
  componentWillLoad(): void;
  render(): JSX.Element;
}

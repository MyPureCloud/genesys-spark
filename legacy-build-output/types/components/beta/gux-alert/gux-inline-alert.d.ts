import { JSX } from '../../../stencil-public-runtime';
import { GuxAlertAccent } from './gux-inline-alert.types';
/**
 * @slot - Slot for message.
 */
export declare class GuxAlert {
  private i18n;
  root: HTMLElement;
  accent: GuxAlertAccent;
  private getIcon;
  componentWillLoad(): Promise<void>;
  render(): JSX.Element;
}

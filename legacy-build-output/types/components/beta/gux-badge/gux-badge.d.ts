import { JSX } from '../../../stencil-public-runtime';
import { GuxBadgeColor } from './gux-badge.types';
/**
 * @slot - Required slot for label
 */
export declare class GuxBadge {
  private i18n;
  /**
   * Reference to the host element.
   */
  root: HTMLElement;
  /**
   * Badge background color.
   */
  color: GuxBadgeColor;
  /**
   * Bold badge.
   */
  bold: boolean;
  label: string;
  private onSlotChange;
  private renderBadgeTitle;
  private renderSrText;
  private getVariant;
  componentWillLoad(): Promise<void>;
  render(): JSX.Element;
}

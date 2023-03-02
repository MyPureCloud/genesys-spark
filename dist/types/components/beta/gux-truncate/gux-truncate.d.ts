import { JSX } from '../../../stencil-public-runtime';
/**
 * @slot - text node or element containing text to truncate
 */
export declare class GuxTruncate {
  private tooltipElement;
  private root;
  /**
   * Lines to wrap before truncating
   */
  maxLines: number;
  setShowTooltip(): Promise<void>;
  setHideTooltip(): Promise<void>;
  onMutation(): void;
  onResize(): void;
  private getTooltipContent;
  private needsTruncation;
  private renderTooltip;
  render(): JSX.Element;
}

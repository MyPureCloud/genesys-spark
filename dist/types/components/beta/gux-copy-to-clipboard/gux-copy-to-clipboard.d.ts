import { JSX } from '../../../stencil-public-runtime';
/**
 * @slot content - Slot for content
 */
export declare class GuxCopyToClipboard {
  private i18n;
  private root;
  tooltipContent: string;
  onMouseleave(): void;
  onFocusout(): void;
  onFocus(): void;
  private resetTooltip;
  private onCopyToClipboard;
  componentWillLoad(): Promise<void>;
  render(): JSX.Element;
}

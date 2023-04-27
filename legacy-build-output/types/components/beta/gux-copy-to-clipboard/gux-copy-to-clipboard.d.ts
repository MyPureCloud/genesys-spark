import { JSX } from '../../../stencil-public-runtime';
import { CopyToClipboardContentType } from './copy-to-clipboard-content-type';
/**
 * @slot content - Slot for content
 */
export declare class GuxCopyToClipboard {
  private i18n;
  private copyButton;
  private root;
  tooltipContent: CopyToClipboardContentType;
  onMouseleave(): void;
  onFocusout(): void;
  onFocus(): void;
  private resetTooltip;
  private onCopyToClipboard;
  getIconName(tooltipContent: CopyToClipboardContentType): string;
  private renderTooltipIcon;
  private renderTooltip;
  componentWillLoad(): Promise<void>;
  render(): JSX.Element;
}

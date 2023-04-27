import { JSX } from '../../../stencil-public-runtime';
import { Placement } from '@floating-ui/dom';
/**
 * @slot - Content of the tooltip
 */
export declare class GuxTooltip {
  private forElement;
  private pointerenterHandler;
  private pointerleaveHandler;
  private focusinHandler;
  private focusoutHandler;
  private id;
  private cleanupUpdatePosition;
  private root;
  /**
   * Indicates the id of the element the popover should anchor to. (If not supplied the parent element is used)
   */
  for: string;
  /**
   * Placement of the tooltip. Default is bottom-start
   */
  placement: Placement;
  /**
   * If tooltip is shown or not
   */
  isShown: boolean;
  handleKeyDown(event: KeyboardEvent): void;
  showTooltip(): Promise<void>;
  hideTooltip(): Promise<void>;
  private runUpdatePosition;
  private updatePosition;
  private show;
  private hide;
  private getForElement;
  private logForAttributeError;
  connectedCallback(): void;
  componentWillLoad(): void;
  disconnectedCallback(): void;
  render(): JSX.Element;
}

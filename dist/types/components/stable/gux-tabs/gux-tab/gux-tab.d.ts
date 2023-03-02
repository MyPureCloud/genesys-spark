import { EventEmitter, JSX } from '../../../../stencil-public-runtime';
/**
 * @slot - text
 */
export declare class GuxTab {
  private buttonElement;
  private tooltipTitleElement;
  /**
   * Tab id for the tab
   */
  tabId: string;
  /**
   * Specifies if tab is disabled
   */
  guxDisabled: boolean;
  active: boolean;
  onClick(): void;
  onFocusin(): void;
  onFocusout(): void;
  internalactivatetabpanel: EventEmitter<string>;
  guxSetActive(active: boolean): Promise<void>;
  guxFocus(): Promise<void>;
  guxGetActive(): Promise<boolean>;
  render(): JSX.Element;
}

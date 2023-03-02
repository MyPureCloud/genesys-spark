import { EventEmitter, JSX } from '../../../stencil-public-runtime';
/**
 * @slot  - Required slot for input tag
 */
export declare class GuxContentSearch {
  private inputSlottedElement;
  private disabledObserver;
  private root;
  /**
   * The Match Count
   */
  matchCount: number;
  /**
   * The Current match count which needs to highlighted
   */
  currentMatch: number;
  private disabled;
  private value;
  /**
   * Triggered when Current match value changes
   * @return The Current match value
   */
  guxcurrentmatchchanged: EventEmitter<number>;
  private i18n;
  /**
   * Clears the input.
   */
  clear(): Promise<void>;
  componentWillLoad(): Promise<void>;
  disconnectedCallback(): void;
  render(): JSX.Element;
  private getNavigationPanel;
  private matchCountResult;
  private showNavigationPanel;
  private disableNavigationPanel;
  private getNormalizedMatchCount;
  private getNormalizedCurrentMatch;
  private resetInputSlottedElement;
  private nextClick;
  private previousClick;
  private onInput;
  private emitCurrentMatchChanged;
}

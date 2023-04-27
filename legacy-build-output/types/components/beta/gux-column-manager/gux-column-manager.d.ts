import { JSX } from '../../../stencil-public-runtime';
import { InternalOrderChange, InternalHighlightResults } from './gux-column-manager.types';
/**
 * @slot - slot for gux-column-manager-item's
 */
export declare class GuxColumnManager {
  private mainCheckboxElement;
  private searchElement;
  private announceElement;
  private i18n;
  root: HTMLElement;
  highlightResults: InternalHighlightResults;
  keyboardOrderChange: InternalOrderChange;
  watchKeyboardOrderChange(): void;
  private guxorderchange;
  componentWillLoad(): Promise<void>;
  componentDidLoad(): void;
  handleInternalorderchange(event: CustomEvent): void;
  private emitOrderChange;
  handleInternalkeyboardorderstart(event: CustomEvent): void;
  handleInternalkeyboardreordermove(event: CustomEvent): void;
  handleInternalkeyboarddoreorder(event: CustomEvent): void;
  handleInternalkeyboardorderfinish(event: CustomEvent): void;
  private onSearchInput;
  private onGuxCurrentMatchChanged;
  private onMainCheckboxChange;
  private onListChange;
  private onSlotChange;
  private renderSelectedColumnCount;
  render(): JSX.Element;
}

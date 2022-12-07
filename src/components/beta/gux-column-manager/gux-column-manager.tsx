import {
  Component,
  JSX,
  h,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  State,
  Listen,
  Watch
} from '@stencil/core';

import { buildI18nForComponent, GetI18nValue } from '../../../i18n';

import { trackComponent } from '../../../usage-tracking';

import {
  InternalOrderChange,
  InternalHighlightResults,
  GuxOrder
} from './gux-column-manager.type';
import {
  getEmptyKeyboardOrderChange,
  getIndexInParent,
  getNewKeyboardOrderChange,
  getNewOrder,
  getSelectedColumnCount,
  setAllCheckboxInputs,
  setHighlights,
  setKeyboardReorderPositionIndicator,
  setMainCheckboxElementCheckedState
} from './gux-column-manager.service';

import translationResources from './i18n/en.json';

/**
 * @slot - slot for gux-column-manager-item's
 */
@Component({
  styleUrl: 'gux-column-manager.less',
  tag: 'gux-column-manager-beta',
  shadow: true
})
export class GuxColumnManager {
  private mainCheckboxElement: HTMLInputElement;
  private searchElement: HTMLInputElement;
  private i18n: GetI18nValue;

  @Element()
  root: HTMLElement;

  @State()
  highlightResults: InternalHighlightResults = {
    matchCount: 0,
    currentMatch: 0
  };

  @State()
  keyboardOrderChange: InternalOrderChange = getEmptyKeyboardOrderChange();

  @Watch('keyboardOrderChange')
  watchKeyboardOrderChange(): void {
    setKeyboardReorderPositionIndicator(this.root, this.keyboardOrderChange);
  }

  @Event()
  private guxorderchange: EventEmitter<GuxOrder>;

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  componentDidLoad(): void {
    setMainCheckboxElementCheckedState(this.root, this.mainCheckboxElement);
  }

  @Listen('internalorderchange')
  handleInternalorderchange(event: CustomEvent): void {
    event.stopPropagation();

    this.emitOrderChange(event.detail as InternalOrderChange);
  }

  private emitOrderChange(orderChange: InternalOrderChange): void {
    const { oldIndex, newIndex } = orderChange;

    if (oldIndex !== newIndex) {
      const newOrder = getNewOrder(this.root, orderChange);

      this.guxorderchange.emit(newOrder);
    }
  }

  @Listen('internalkeyboardreorderstart')
  handleInternalkeyboardorderstart(event: CustomEvent): void {
    event.stopPropagation();

    const oldIndex = getIndexInParent(event.target as HTMLElement);

    this.keyboardOrderChange = {
      oldIndex,
      newIndex: oldIndex
    };
  }

  @Listen('internalkeyboardreordermove')
  handleInternalkeyboardreordermove(event: CustomEvent): void {
    event.stopPropagation();

    const delta = event.detail as 1 | -1;

    this.keyboardOrderChange = getNewKeyboardOrderChange(
      this.root,
      this.keyboardOrderChange,
      delta
    );
  }

  @Listen('internalkeyboarddoreorder')
  handleInternalkeyboarddoreorder(event: CustomEvent): void {
    event.stopPropagation();

    this.emitOrderChange(this.keyboardOrderChange);

    (event.target as HTMLGuxColumnManagerItemElement).focus();
  }

  @Listen('internalkeyboardreorderfinish')
  handleInternalkeyboardorderfinish(event: CustomEvent): void {
    event.stopPropagation();

    this.keyboardOrderChange = getEmptyKeyboardOrderChange();
  }

  private onSearchInput(): void {
    this.highlightResults = setHighlights(this.root, this.searchElement);
  }

  private onGuxCurrentMatchChanged(event: CustomEvent): void {
    this.highlightResults = setHighlights(
      this.root,
      this.searchElement,
      event.detail as number
    );
  }

  private onMainCheckboxChange(): void {
    setAllCheckboxInputs(this.root, this.mainCheckboxElement.checked);
    forceUpdate(this.root);
  }

  private onListChange(): void {
    setMainCheckboxElementCheckedState(this.root, this.mainCheckboxElement);
    forceUpdate(this.root);
  }

  private onSlotChange(): void {
    this.onListChange();
  }

  private renderSelectedColumnCount(): JSX.Element {
    const { count, total } = getSelectedColumnCount(this.root);

    return (
      <div>
        <span aria-hidden="true">
          {this.i18n('selectedColumnCount', { count, total })}
        </span>
        <span class="gux-sr-only">
          {count === total ? (
            <span>
              : {this.i18n('unselectAllColumnsScreenReader', { count, total })}
            </span>
          ) : (
            <span>
              : {this.i18n('selectAllColumnsScreenReader', { count, total })}
            </span>
          )}
        </span>
      </div>
    ) as JSX.Element;
  }

  render(): JSX.Element {
    return (
      <div class="gux-container">
        <div class="gux-search">
          <gux-content-search
            match-count={this.highlightResults.matchCount}
            current-match={this.highlightResults.currentMatch}
            onGuxcurrentmatchchanged={event =>
              this.onGuxCurrentMatchChanged(event)
            }
          >
            <input
              type="text"
              placeholder={this.i18n('search')}
              onInput={() => this.onSearchInput()}
              ref={el => (this.searchElement = el)}
            />
          </gux-content-search>
        </div>
        <div class="gux-select">
          <gux-form-field-checkbox>
            <input
              slot="input"
              type="checkbox"
              ref={el => (this.mainCheckboxElement = el)}
              onChange={() => this.onMainCheckboxChange()}
            />
            <label slot="label">{this.renderSelectedColumnCount()}</label>
          </gux-form-field-checkbox>
        </div>
        <div class="gux-list" onChange={() => this.onListChange()}>
          <slot onSlotchange={() => this.onSlotChange()}></slot>
        </div>
      </div>
    ) as JSX.Element;
  }
}

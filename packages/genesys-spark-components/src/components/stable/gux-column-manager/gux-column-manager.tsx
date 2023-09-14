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

import { trackComponent } from '@utils/tracking/usage';

import {
  InternalOrderChange,
  InternalHighlightResults,
  GuxOrder,
  InternalKeyboardReorderMove
} from './gux-column-manager.types';
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
  styleUrl: 'gux-column-manager.scss',
  tag: 'gux-column-manager',
  shadow: true
})
export class GuxColumnManager {
  private mainCheckboxElement: HTMLInputElement;
  private searchElement: HTMLInputElement;
  private announceElement: HTMLGuxAnnounceBetaElement;
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

  @Listen('internal_order_change')
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

  @Listen('internal_keyboard_reorder_start')
  handleInternalkeyboardorderstart(event: CustomEvent): void {
    event.stopPropagation();

    const columnName = event.detail as string;

    const oldIndex = getIndexInParent(event.target as HTMLElement);

    this.keyboardOrderChange = {
      oldIndex,
      newIndex: oldIndex
    };

    void this.announceElement.guxAnnounce(
      this.i18n('reorderingModeActive', { columnName })
    );
  }

  @Listen('internal_keyboard_reorder_move')
  handleInternalkeyboardreordermove(event: CustomEvent): void {
    event.stopPropagation();

    const { delta, column } = event.detail as InternalKeyboardReorderMove;

    this.keyboardOrderChange = getNewKeyboardOrderChange(
      this.root,
      this.keyboardOrderChange,
      delta
    );

    const columnName = column;
    const newPositionNumber = this.keyboardOrderChange.newIndex + 1;
    const oldPositionNumber = this.keyboardOrderChange.oldIndex + 1;

    void this.announceElement.guxAnnounce(
      this.i18n('movePositionPrompt', {
        columnName,
        newPositionNumber,
        oldPositionNumber
      })
    );
  }

  @Listen('internal_keyboard_reorder_emit')
  handleInternalkeyboarddoreorder(event: CustomEvent): void {
    event.stopPropagation();

    this.emitOrderChange(this.keyboardOrderChange);

    void (event.target as HTMLGuxColumnManagerItemElement).guxFocus();
  }

  @Listen('internal_keyboard_reorder_finish')
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
        <div class="gux-sr-only" aria-live="polite">
          {`${this.highlightResults.matchCount} ${this.i18n('searchResults')}`}
        </div>
        <div class="gux-search">
          <gux-content-search
            match-count={this.highlightResults.matchCount}
            current-match={this.highlightResults.currentMatch}
            onGuxcurrentmatchchanged={event =>
              this.onGuxCurrentMatchChanged(event)
            }
          >
            <input
              type="search"
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
        <gux-announce-beta
          ref={el => (this.announceElement = el)}
        ></gux-announce-beta>
      </div>
    ) as JSX.Element;
  }
}

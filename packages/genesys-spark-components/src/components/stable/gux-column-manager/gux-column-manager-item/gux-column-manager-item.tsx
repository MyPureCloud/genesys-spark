import {
  Component,
  JSX,
  h,
  Element,
  State,
  Method,
  Host,
  Listen,
  Event,
  EventEmitter,
  Prop
} from '@stencil/core';

import { buildI18nForComponent, GetI18nValue } from '../../../../i18n';

import { getIndexInParent } from '../gux-column-manager.service';
import {
  InternalOrderChange,
  InternalKeyboardReorderMove
} from '../gux-column-manager.types';

import { getNewIndex } from './gux-column-manager-item.service';

import translationResources from './i18n/en.json';

/**
 * @slot - slot for gux-form-field-checkbox
 */
@Component({
  styleUrl: 'gux-column-manager-item.scss',
  tag: 'gux-column-manager-item',
  shadow: { delegatesFocus: false }
})
export class GuxColumnManagerItem {
  private reorderButtonElement: HTMLButtonElement;
  private i18n: GetI18nValue;

  @Element()
  root: HTMLElement;

  @Prop()
  orderId: string;

  @State()
  highlightActive: boolean;

  @State()
  highlight: string;

  @State()
  text: string;

  @State()
  pendingReorder: 'none' | 'above' | 'below' = 'none';

  @State()
  isDragging: boolean = false;

  @State()
  isReordering: boolean = false;

  @Event()
  private internal_order_change: EventEmitter<InternalOrderChange>;

  @Event()
  private internal_keyboard_reorder_start: EventEmitter<string>;

  @Event()
  private internal_keyboard_reorder_move: EventEmitter<InternalKeyboardReorderMove>;

  @Event()
  private internal_keyboard_reorder_emit: EventEmitter<void>;

  @Event()
  private internal_keyboard_reorder_finish: EventEmitter<void>;

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method('guxSetHighlight')
  async guxSetHighlight(
    highlight: string = '',
    highlightActive: boolean = false
  ): Promise<void> {
    this.highlight = highlight;
    this.highlightActive = highlightActive;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method('guxFocus')
  async guxFocus(): Promise<void> {
    this.reorderButtonElement.focus();
  }

  @Listen('blur')
  onBlur() {
    this.setReorderMode(false);
  }

  @Listen('dragstart')
  onDragStart(event: DragEvent) {
    this.isDragging = true;
    const oldIndex = getIndexInParent(this.root);
    event.dataTransfer.setData('oldIndex', String(oldIndex));
    event.dataTransfer.effectAllowed = 'move';
  }

  @Listen('dragenter')
  onDragEnter(event: DragEvent) {
    event.dataTransfer.dropEffect = 'move';
    this.pendingReorder = this.mouseOnTopHalf(event) ? 'above' : 'below';
  }

  @Listen('dragover', { passive: false })
  onDragOver(event: DragEvent) {
    event.preventDefault();

    this.pendingReorder = this.mouseOnTopHalf(event) ? 'above' : 'below';
  }

  @Listen('dragleave')
  onDragLeave() {
    this.pendingReorder = 'none';
  }

  @Listen('dragend')
  onDragEnd() {
    this.isDragging = false;
  }

  @Listen('drop')
  onDrop(event: DragEvent) {
    const oldIndex = Number(event.dataTransfer.getData('oldIndex'));
    const dropIndex = getIndexInParent(this.root);

    event.stopPropagation(); // stops the browser from redirecting.
    event.stopImmediatePropagation();
    this.pendingReorder = 'none';

    const newIndex = getNewIndex(
      oldIndex,
      dropIndex,
      this.mouseOnTopHalf(event)
    );

    this.internal_order_change.emit({ oldIndex, newIndex });

    return false;
  }

  private mouseOnTopHalf(event: MouseEvent): boolean {
    const rect = this.root.getBoundingClientRect();

    return event.clientY - rect.top <= (rect.bottom - rect.top) / 2;
  }

  private onSlotChange(): void {
    this.text = this.root.querySelector(
      'gux-form-field-checkbox label'
    ).textContent;
  }

  private setReorderMode(
    isReordering: boolean,
    doReorder: boolean = false
  ): void {
    if (this.isReordering !== isReordering) {
      this.isReordering = isReordering;

      if (isReordering) {
        this.internal_keyboard_reorder_start.emit(this.text);
      } else {
        if (doReorder) {
          this.internal_keyboard_reorder_emit.emit();
        }

        this.internal_keyboard_reorder_finish.emit();
      }
    }
  }

  private toggleReorderMode(): void {
    this.setReorderMode(!this.isReordering, true);
  }

  private keyboardReorder(event: KeyboardEvent): void {
    if (this.isReordering) {
      switch (event.key) {
        case 'ArrowUp': {
          event.preventDefault();
          this.internal_keyboard_reorder_move.emit({
            delta: -1,
            column: this.text
          });
          break;
        }
        case 'ArrowDown': {
          event.preventDefault();
          this.internal_keyboard_reorder_move.emit({
            delta: 1,
            column: this.text
          });
          break;
        }
        case 'Home': {
          event.preventDefault();
          this.internal_keyboard_reorder_move.emit({
            delta: -Infinity,
            column: this.text
          });
          break;
        }
        case 'End': {
          event.preventDefault();
          this.internal_keyboard_reorder_move.emit({
            delta: Infinity,
            column: this.text
          });
          break;
        }
        case 'Escape': {
          event.preventDefault();
          this.setReorderMode(false);
        }
      }
    }
  }

  async componentWillLoad(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  render(): JSX.Element {
    return (
      <Host draggable="true">
        <div
          class={{
            'gux-container': true,
            [`gux-drop-${this.pendingReorder}`]: true,
            'gux-dragging': this.isDragging
          }}
        >
          <button
            class={{
              'gux-reorder': true,
              'gux-reordering': this.isReordering
            }}
            type="button"
            onClick={() => this.toggleReorderMode()}
            onKeyDown={event => this.keyboardReorder(event)}
            ref={el => (this.reorderButtonElement = el)}
          >
            <gux-icon icon-name="grab-vertical" decorative></gux-icon>
            <span class="gux-sr-only">
              {this.i18n('activateReordering', { columnName: this.text })}
            </span>
          </button>
          <div class="gux-select">
            <slot onSlotchange={() => this.onSlotChange()}></slot>
            <gux-text-highlight
              highlight={this.highlight}
              text={this.text}
              strategy="contains"
              dimmed={!this.highlightActive}
            ></gux-text-highlight>
          </div>
        </div>
      </Host>
    ) as JSX.Element;
  }
}

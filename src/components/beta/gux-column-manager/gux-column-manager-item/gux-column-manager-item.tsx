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
} from '../gux-column-manager.type';

import { getNewIndex } from './gux-column-manager-item.service';

import translationResources from './i18n/en.json';

/**
 * @slot - slot for gux-form-field-checkbox
 */
@Component({
  styleUrl: 'gux-column-manager-item.less',
  tag: 'gux-column-manager-item',
  shadow: { delegatesFocus: true }
})
export class GuxColumnManagerItem {
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
  private internalorderchange: EventEmitter<InternalOrderChange>;

  @Event()
  private internalkeyboardreorderstart: EventEmitter<string>;

  @Event()
  private internalkeyboardreordermove: EventEmitter<InternalKeyboardReorderMove>;

  @Event()
  private internalkeyboarddoreorder: EventEmitter<void>;

  @Event()
  private internalkeyboardreorderfinish: EventEmitter<void>;

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method('guxSetHighlight')
  async guxSetHighlight(
    highlight: string = '',
    highlightActive: boolean = false
  ): Promise<void> {
    this.highlight = highlight;
    this.highlightActive = highlightActive;
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

    this.internalorderchange.emit({ oldIndex, newIndex });

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
        this.internalkeyboardreorderstart.emit(this.text);
      } else {
        if (doReorder) {
          this.internalkeyboarddoreorder.emit();
        }

        this.internalkeyboardreorderfinish.emit();
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
          this.internalkeyboardreordermove.emit({
            delta: -1,
            column: this.text
          });
          break;
        }
        case 'ArrowDown': {
          event.preventDefault();
          this.internalkeyboardreordermove.emit({
            delta: 1,
            column: this.text
          });
          break;
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
          >
            <gux-icon icon-name="grab-vertical" decorative></gux-icon>
            <span class="gux-sr-only">
              {this.i18n('activateReordering', { columnName: this.text })}
            </span>
          </button>
          <div class="gux-select">
            <slot onSlotchange={() => this.onSlotChange()}></slot>
            <gux-text-highlight
              class={{ 'gux-active': this.highlightActive }}
              highlight={this.highlight}
              text={this.text}
              strategy="contains"
            ></gux-text-highlight>
          </div>
        </div>
      </Host>
    ) as JSX.Element;
  }
}

import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop
} from '@stencil/core';
import { KeyCode } from '../../../common-enums';

@Component({
  styleUrl: 'gux-list-item.less',
  tag: 'gux-list-item'
})
export class GuxListItem {
  @Element()
  root: HTMLElement;

  /**
   * Disables the list item.
   */
  @Prop()
  disabled: boolean = false;

  /**
   * The value to display.
   */
  @Prop()
  value: string;

  /**
   * The highlighted text.
   */
  @Prop()
  highlight: string;

  /**
   * Emits when the list item action is triggered.
   */
  @Event()
  action: EventEmitter<HTMLElement>;
  emitAction(value: HTMLElement) {
    this.action.emit(value);
  }

  render() {
    return (
      <span
        role="listitem"
        class={'list-item' + (this.disabled ? ' disabled' : '')}
        onClick={() => {
          this.onItemClicked();
        }}
        onKeyDown={this.handleKeyDown.bind(this)}
        tabIndex={-1}
      >
        {this.renderItemText()}
      </span>
    );
  }

  private renderItemText(): string | HTMLElement {
    if (this.highlight && this.value.startsWith(this.highlight)) {
      return (
        <span>
          <strong>{this.highlight}</strong>
          {this.value.replace(this.highlight, '')}
        </span>
      );
    } else {
      return this.value;
    }
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.keyCode === KeyCode.Enter || event.keyCode === KeyCode.Space) {
      this.onItemClicked();
    }
  }

  private onItemClicked(): void {
    this.emitAction(this.root);
  }
}

import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop
} from '@stencil/core';

@Component({
  styleUrl: 'gux-list-item.less',
  tag: 'gux-list-item'
})
export class GuxListItem {
  @Element()
  root: HTMLElement;

  @Prop()
  disabled: boolean = false;

  @Prop()
  value: string;

  @Prop()
  highlight: string;

  @Event()
  change: EventEmitter<string>;
  emitChange(value: string) {
    this.change.emit(value);
  }

  render() {
    return (
      <span
        role="listitem"
        class={'list-item' + (this.disabled ? ' disabled' : '')}
        onClick={() => {
          this.onItemClicked();
        }}
        tabIndex={-1}
      >
        {this.renderItemText()}
      </span>
    );
  }

  private renderItemText(): string {
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

  private onItemClicked(): void {
    this.emitChange(this.value);
  }
}

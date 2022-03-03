import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Listen,
  Prop
} from '@stencil/core';

@Component({
  styleUrl: 'gux-action-item.less',
  tag: 'gux-action-item',
  shadow: true
})
export class GuxActionItem {
  @Prop()
  text: string;

  @Prop()
  value: unknown;

  @Prop()
  disabled: boolean = false;

  @Event()
  press: EventEmitter<unknown>;

  @Listen('click')
  handleClick() {
    this.onItemClicked();
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        this.onItemClicked();
        return;
    }
  }

  @Listen('keyup')
  onKeyup(event: KeyboardEvent): void {
    switch (event.key) {
      case ' ':
        event.preventDefault();
        this.onItemClicked();
        return;
    }
  }

  private onItemClicked(): void {
    if (!this.disabled) {
      this.press.emit(this.value);
    }
  }

  render(): JSX.Element {
    return (
      <Host role="listitem">
        <button
          disabled={this.disabled}
          onClick={() => this.onItemClicked()}
          class={{
            'gux-action-item': true,
            'gux-disabled': this.disabled
          }}
        >
          {this.text}
          <slot />
        </button>
      </Host>
    ) as JSX.Element;
  }
}

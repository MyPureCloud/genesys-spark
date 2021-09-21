import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Listen,
  Prop
} from '@stencil/core';

import { trackComponent } from '../../../usage-tracking';

import { GuxToggleLabelPosition } from './gux-toggle.types';

@Component({
  styleUrl: 'gux-toggle.less',
  tag: 'gux-toggle',
  shadow: { delegatesFocus: true }
})
export class GuxToggle {
  @Element()
  private root: HTMLElement;

  @Prop({ mutable: true })
  checked: boolean = false;

  @Prop()
  disabled: boolean = false;

  @Prop()
  loading: boolean = false;

  @Prop()
  checkedLabel: string;

  @Prop()
  uncheckedLabel: string;

  @Prop()
  labelPosition: GuxToggleLabelPosition = 'right';

  @Prop()
  errorMessage: string;

  @Event()
  check: EventEmitter<boolean>;

  @Listen('click')
  onClick(): void {
    this.toggle();
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggle();
    }
  }

  private toggle(): void {
    if (!this.disabled && !this.loading) {
      this.checked = !this.checked;

      this.check.emit(this.checked);
    }
  }

  private getAriaLabel(): string {
    const label = this.checked ? this.checkedLabel : this.uncheckedLabel;

    return label || this.root.getAttribute('aria-label') || this.root.title;
  }

  componentWillLoad(): void {
    const variant =
      this.checkedLabel || this.uncheckedLabel ? 'labled' : 'unlabled';

    trackComponent(this.root, { variant });
  }

  private renderLoading(): JSX.Element {
    if (this.loading) {
      return (
        <div class="gux-toggle-label-loading">
          <gux-radial-loading context="input"></gux-radial-loading>
        </div>
      );
    }
  }

  private renderLabel(): JSX.Element {
    if (this.uncheckedLabel && this.checkedLabel) {
      const labelText = this.checked ? this.checkedLabel : this.uncheckedLabel;

      return (
        <div class="gux-toggle-label-and-error">
          <div class="gux-toggle-label">
            <div class="gux-toggle-label-text">{labelText}</div>

            {this.renderLoading()}
          </div>
        </div>
      );
    }
  }

  private renderError(): JSX.Element {
    if (this.errorMessage) {
      return (
        <div class="gux-toggle-error">
          <gux-error-message-beta>{this.errorMessage}</gux-error-message-beta>
        </div>
      );
    }
  }
  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-toggle-container': true,
          'gux-toggle-label-left': this.labelPosition === 'left',
          'gux-disabled': this.disabled || this.loading
        }}
        role="checkbox"
        aria-checked={Boolean(this.checked).toString()}
        aria-label={this.getAriaLabel()}
      >
        <div class="gux-toggle-input">
          <gux-toggle-slider
            checked={this.checked}
            disabled={this.disabled || this.loading}
          ></gux-toggle-slider>

          {this.renderLabel()}
        </div>
        {this.renderError()}
      </div>
    );
  }
}

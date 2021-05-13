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
import simulateNativeEvent from '../../../utils/dom/simulate-native-event';

import { GuxToggleLabelPosition } from './gux-toggle.types';

@Component({
  styleUrl: 'gux-toggle.less',
  tag: 'gux-toggle'
})
export class GuxToggle {
  private checkboxElement: HTMLInputElement;

  @Element()
  private root: HTMLElement;

  @Prop({ mutable: true })
  checked: boolean = false;

  @Prop()
  disabled: boolean = false;

  @Prop()
  checkedLabel: string;

  @Prop()
  uncheckedLabel: string;

  @Prop()
  labelPosition: GuxToggleLabelPosition = 'right';

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
        this.toggle();
    }
  }

  @Listen('input')
  onInput(event: InputEvent): void {
    this.checked = (event.target as HTMLInputElement).checked;

    this.check.emit(this.checked);
  }

  private toggle(): void {
    if (!this.disabled) {
      this.checkboxElement.checked = !this.checkboxElement.checked;

      simulateNativeEvent(this.checkboxElement, 'input');
      simulateNativeEvent(this.checkboxElement, 'change');
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

  private renderLabel(): JSX.Element {
    if (this.uncheckedLabel && this.checkedLabel) {
      const labelText = this.checked ? this.checkedLabel : this.uncheckedLabel;

      return (
        <div
          class={{
            'gux-toggle-label': true,
            'gux-checked': this.checked
          }}
        >
          {labelText}
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
          'gux-checked': this.checked
        }}
        tabindex={this.disabled ? '' : '0'}
        role="checkbox"
        aria-checked={Boolean(this.checked).toString()}
        aria-label={this.getAriaLabel()}
      >
        <input
          type="checkbox"
          ref={el => (this.checkboxElement = el)}
          checked={this.checked}
          disabled={this.disabled}
        />

        <gux-toggle-slider checked={this.checked}></gux-toggle-slider>

        {this.renderLabel()}
      </div>
    );
  }
}

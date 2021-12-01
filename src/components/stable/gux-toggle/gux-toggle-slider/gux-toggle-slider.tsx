import { Component, h, JSX, Prop } from '@stencil/core';

@Component({
  styleUrl: 'gux-toggle-slider.less',
  tag: 'gux-toggle-slider',
  shadow: { delegatesFocus: true }
})
export class GuxToggleSlider {
  @Prop()
  checked: boolean = false;

  @Prop()
  disabled: boolean = false;

  @Prop()
  ariaLabel: string = '';

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-toggle-slider': true,
          'gux-checked': this.checked,
          'gux-disabled': this.disabled
        }}
        aria-label={this.ariaLabel}
        role="checkbox"
        aria-checked={Boolean(this.checked).toString()}
        tabindex={this.disabled ? '' : '0'}
      >
        <div class="gux-slider">
          <div class="gux-switch">
            <gux-icon icon-name="checkmark" decorative></gux-icon>
          </div>
        </div>
      </div>
    ) as JSX.Element;
  }
}

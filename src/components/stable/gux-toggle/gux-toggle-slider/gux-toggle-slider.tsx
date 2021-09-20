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

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-toggle-slider': true,
          'gux-checked': this.checked,
          'gux-disabled': this.disabled
        }}
        tabindex={this.disabled ? '' : '0'}
        role="presentation"
      >
        <div class="gux-slider">
          <div class="gux-switch">
            <gux-icon icon-name="checkmark" decorative></gux-icon>
          </div>
        </div>
      </div>
    );
  }
}

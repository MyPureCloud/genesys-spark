import { Component, h, JSX, Prop } from '@stencil/core';

@Component({
  styleUrl: 'gux-toggle-slider.less',
  tag: 'gux-toggle-slider'
})
export class GuxToggleSlider {
  @Prop()
  checked: boolean;

  render(): JSX.Element {
    return (
      <div class="gux-toggle-slider" role="presentation">
        <div
          class={{
            'gux-slider': true,
            'gux-checked': this.checked
          }}
        ></div>
      </div>
    );
  }
}

import { Component, h, JSX, Prop } from '@stencil/core';

@Component({
  styleUrl: 'gux-toggle-slider.scss',
  tag: 'gux-toggle-slider',
  shadow: false
})
export class GuxToggleSlider {
  private checkboxElement: HTMLElement;

  @Prop()
  checked: boolean = false;

  @Prop()
  disabled: boolean = false;

  @Prop()
  guxAriaLabel: string = '';

  @Prop()
  labelId: string = '';

  @Prop()
  errorId: string = '';

  componentDidLoad(): void {
    if (this.labelId) {
      this.checkboxElement?.setAttribute('aria-labelledby', this.labelId);
    } else {
      this.checkboxElement?.setAttribute('aria-label', this.guxAriaLabel);
    }
    if (this.errorId) {
      this.checkboxElement?.setAttribute('aria-describedby', this.errorId);
    }
  }

  render(): JSX.Element {
    const isError = this.errorId.length > 0;

    return (
      <div
        class={{
          'gux-toggle-slider': true,
          'gux-checked': this.checked,
          'gux-disabled': this.disabled,
          'gux-error': isError
        }}
        role="checkbox"
        aria-checked={this.checked.toString()}
        aria-disabled={this.disabled.toString()}
        tabindex={this.disabled ? '' : '0'}
        ref={el => (this.checkboxElement = el)}
      >
        <div class="gux-slider">
          <div class="gux-switch">
            {!isError && <gux-icon icon-name="checkmark" decorative></gux-icon>}
          </div>
        </div>
      </div>
    ) as JSX.Element;
  }
}

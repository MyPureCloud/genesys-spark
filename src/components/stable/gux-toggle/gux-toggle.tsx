import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop
} from '@stencil/core';
const ENTER = 13;
const SPACE = 32;

@Component({
  styleUrl: 'gux-toggle.less',
  tag: 'gux-toggle'
})
export class GuxToggle {
  @Element()
  root: HTMLElement;

  checkboxElement: HTMLInputElement;

  /**
   * Indicate if the toggle is checked or not
   */
  @Prop({ mutable: true, reflectToAttr: true })
  checked: boolean;

  /**
   * Indicate if the toggle is disabled or not
   */
  @Prop({ reflectToAttr: true })
  disabled: boolean;

  /**
   * Indicate the checked label
   */
  @Prop()
  checkedLabel: string;

  /**
   * Indicate the unchecked label
   */
  @Prop()
  uncheckedLabel: string;

  /**
   * Triggered when the state of the component changed.
   * @return the checked boolean value
   */
  @Event()
  check: EventEmitter;
  emitInput(event) {
    event.preventDefault();
    event.stopPropagation();
    this.checked = event.target.checked;
    this.check.emit(this.checked);
  }

  toggle() {
    if (!this.disabled) {
      this.checkboxElement.click();
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.keyCode === SPACE || event.keyCode === ENTER) {
      this.toggle();
    }
  }

  getAriaLabel() {
    let label = this.checked ? this.checkedLabel : this.uncheckedLabel;
    if (!label) {
      label = this.root.getAttribute('aria-label') || this.root.title;
    }
    return label;
  }

  render() {
    return (
      <div
        class={this.checked ? 'gux-checked' : ''}
        tabindex={this.disabled ? '' : '0'}
        role="checkbox"
        aria-checked={this.checked + ''}
        aria-label={this.getAriaLabel()}
        onClick={() => this.toggle()}
        onKeyDown={e => this.onKeyDown(e)}
      >
        <div class="gux-switch" role="presentation">
          <input
            type="checkbox"
            ref={el => (this.checkboxElement = el)}
            checked={this.checked}
            onInput={e => this.emitInput(e)}
            disabled={this.disabled}
          />
          <span class="gux-slider gux-round" />
        </div>
        {this.uncheckedLabel && this.checkedLabel ? (
          <span>{this.checked ? this.checkedLabel : this.uncheckedLabel}</span>
        ) : (
          ''
        )}
      </div>
    );
  }
}

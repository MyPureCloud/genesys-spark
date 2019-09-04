import { Component, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
  styleUrl: 'gux-slider.less',
  tag: 'gux-slider'
})
export class GuxSlider {
  /**
   * Indicates the minimum value for the slider
   */
  @Prop({ mutable: true })
  min: number = 0;
  /**
   * Indicates the maximum value for the slider
   */
  @Prop()
  max: number = 100;
  /**
   * Inicates the step value of the slider
   */
  @Prop()
  step: number = 1;
  /**
   * Indicates the value of the slider
   */
  @Prop({ mutable: true, reflectToAttr: true })
  value: number = 0;
  /**
   * Indicates if the input box will be displayed
   */
  @Prop()
  displayTextBox: boolean = true;
  /**
   * Indicate if the value is a percentage
   */
  @Prop()
  isPercentage: boolean = false;

  sliderInput: HTMLInputElement;
  sliderMask: HTMLElement;
  sliderTooltip: HTMLElement;
  sliderTooltipContainer: HTMLElement;

  inputRegex = new RegExp('([0-9]+.?[0-9]*)%?');

  /**
   * Triggered when the value is changed
   * @return the current value
   */
  @Event()
  update: EventEmitter;
  updateValue(event) {
    const result = this.inputRegex.exec(event.target.value);
    const resultValue = result && result[1] ? +result[1] : this.min;
    const newValue = Math.min(Math.max(resultValue, this.min), this.max);
    const upToDate = this.value === newValue;
    const stepOffset = Math.round(newValue / this.step);
    this.value = newValue % this.step !== 0 ? this.step * stepOffset : newValue;
    if (!upToDate) {
      this.update.emit(this.value);
      this.updatePosition();
    }
  }

  /**
   * Once the component is loaded do the setup
   */
  componentDidLoad() {
    const stepOffset = Math.round(this.value / this.step);
    if (this.value % this.step !== 0) {
      this.value = this.step * stepOffset;
    }
    this.updatePosition();
  }

  /**
   * When position is changed, via slider or text box, update position
   */
  updatePosition() {
    const placementPercentage =
      ((this.value - this.min) / (this.max - this.min)) * 100;
    if (this.sliderTooltip) {
      const width = this.sliderTooltipContainer.offsetWidth;
      const offset =
        placementPercentage - (placementPercentage / 8 / width) * 100;
      this.sliderTooltip.style.left = `${offset}%`;
    }
    this.sliderMask.style.width = `${placementPercentage}%`;
  }

  render() {
    const value: string = this.isPercentage
      ? `${this.value}%`
      : `${this.value}`;
    return (
      <div class="slider-component-container">
        <div class="slider-container">
          <input
            type="range"
            role="slider"
            class="range-input"
            min={this.min}
            max={this.max}
            step={this.step}
            value={this.value}
            ref={el => (this.sliderInput = el)}
            // onChange event required because IE11 doesn't support onInput for range inputs
            onChange={(e: UIEvent) => this.updateValue(e)}
            onInput={(e: UIEvent) => this.updateValue(e)}
          />
          <div class="mask">
            <div class="mask-slider" ref={el => (this.sliderMask = el)} />
            <div class="mask-track-container">
              <div class="mask-track" />
            </div>
          </div>
          <div
            class={
              'range-tooltip-container' + (this.displayTextBox ? ' hidden' : '')
            }
            ref={el => (this.sliderTooltipContainer = el)}
          >
            <div
              class="range-tooltip small-body"
              ref={el => (this.sliderTooltip = el)}
            >
              {value}
            </div>
          </div>
        </div>
        {this.displayTextBox && (
          <gux-text-label label="slider value">
            <gux-text-field
              value={value}
              onChange={(e: UIEvent) => this.updateValue(e)}
            />
          </gux-text-label>
        )}
      </div>
    );
  }
}

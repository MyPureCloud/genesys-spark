import { Event, EventEmitter, Component, Prop, Listen } from '@stencil/core';

@Component({
  tag: 'genesys-slider',
  styleUrl: 'genesys-slider.less'
})
export class GenesysSlider {
  /**
   * Indicates the minimum value for the slider
   **/
  @Prop({ mutable: true })
  min: number = 0;
  /**
   * Indicates the maximum value for the slider
   **/
  @Prop()
  max: number = 100;
  /**
   * Indocates the value of the slider
   **/
  @Prop({ mutable: true, reflectToAttr: true })
  value: number = 0;
  /**
   * Indicate if the input box
   **/
  @Prop()
  displayTextBox: boolean = false;
  /**
   * Indicate if the value is a percentage
   **/
  @Prop()
  isPercentage: boolean = false;

  sliderInput: HTMLInputElement;
  sliderMask: HTMLElement;
  sliderTooltip: HTMLElement;

  /**
   * Triggered when the value is changed
   * @return the current value
   */
  @Event()
  update: EventEmitter;

  updateValue(value) {
    const regex = new RegExp('([0-9]+)%*');
    const result = regex.exec(value);
    var newValue = result && result[1] ? +result[1] : this.min;
    if (newValue < this.min) {
      newValue = this.min;
    } else if (newValue > this.max) {
      newValue = this.max;
    }
    const upToDate = this.value === newValue;
    this.value = newValue;
    if (!upToDate) {
      this.update.emit(this.value);
      this.updatePosition();
    }
  }

  @Listen('input')
  updateInputValue(value) {
    this.extractValue(value);
  }

  extractValue(event) {
    const value = event.target.value;
    this.updateValue(value);
  }

  /**
   * Once the component is loaded do the setup
   */
  componentDidLoad() {
    this.updatePosition();
  }

  /**
   * When position is changed, via slider or text box, update position
   */
  updatePosition() {
    const width = this.sliderInput.offsetWidth;
    const placementPercentage = (this.value - this.min) / (this.max - this.min);
    if (this.sliderTooltip) {
      var thumbOffset = -18 * (placementPercentage - 0.5) + 6;
      var newPosition = placementPercentage * width + thumbOffset - 25;
      this.sliderTooltip.style.left = `${newPosition}px`;
    }
    thumbOffset = -12 * (placementPercentage - 0.5) + 6;
    newPosition = placementPercentage * width + thumbOffset;
    this.sliderMask.style.width = `${newPosition}px`;
  }

  render() {
    const value = this.isPercentage ? `${this.value}%` : `${this.value}`;
    return (
      <div class="container">
        <input
          type="range"
          role="slider"
          class="range-input"
          min={this.min}
          max={this.max}
          value={this.value}
          aria-valuemin={this.min}
          aria-valuemax={this.max}
          aria-valuenow={this.value}
          ref={el => (this.sliderInput = el)}
          onInput={(e: UIEvent) => this.extractValue(e)}
        />
        <div class="mask" ref={el => (this.sliderMask = el)} />
        {this.displayTextBox ? (
          <genesys-text-field placeholder={value} />
        ) : (
          <div
            class="range-tooltip small-body"
            ref={el => (this.sliderTooltip = el)}
          >
            <div class="tooltip-value">{value}</div>
          </div>
        )}
      </div>
    );
  }
}

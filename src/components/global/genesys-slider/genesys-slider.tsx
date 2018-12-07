import { Event, EventEmitter, Component, Prop } from '@stencil/core';

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
  sliderTextbox: HTMLElement;
  sliderTooltip: HTMLElement;

  /**
   * Triggered when the value is changed
   * @return the current value
   */
  @Event()
  update: EventEmitter;
  updateValue(event) {
    console.log('here', event);
    const regex = new RegExp('([0-9]+)%*');
    const result = regex.exec(event.target.value);
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

  /**
   * Once the component is loaded do the setup
   */
  componentDidLoad() {
    if (this.sliderTextbox) {
      this.sliderTextbox.addEventListener(
        'change',
        this.updateValue.bind(this)
      );
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
      const requireMinPlacement =
        (this.sliderInput.offsetWidth / 100) * placementPercentage < 12;
      this.sliderTooltip.style.left = requireMinPlacement
        ? '12px'
        : `${placementPercentage}%`;
    }
    this.sliderMask.style.width = `${placementPercentage}%`;
  }

  //pull complicated bits of template into helper functions
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
            value={this.value}
            ref={el => (this.sliderInput = el)}
            //onChange event required because IE11 doesn't support onInput for range inputs
            onChange={(e: UIEvent) => this.updateValue(e)}
            onInput={(e: UIEvent) => this.updateValue(e)}
          />
          <div class="mask">
            <div class="mask-slider" ref={el => (this.sliderMask = el)} />
            <div class="mask-track-container">
              <div class="mask-track" />
            </div>
          </div>
          {!this.displayTextBox && (
            <div
              class="range-tooltip small-body"
              ref={el => (this.sliderTooltip = el)}
            >
              <div class="tooltip-value">{value}</div>
            </div>
          )}
        </div>
        {this.displayTextBox && (
          <genesys-text-field
            label="slider value"
            value={value}
            ref={el => (this.sliderTextbox = el)}
          />
        )}
      </div>
    );
  }
}

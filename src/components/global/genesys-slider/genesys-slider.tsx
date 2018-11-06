import { Event, EventEmitter, Component, Prop } from '@stencil/core';

@Component({
  tag: 'genesys-slider',
  styleUrl: 'genesys-slider.less'
})
export class GenesysSlider {
  /**
   * Indicates the minimum value for the slider
   **/
  @Prop() min: number = 0;
  /**
   * Indicates the maximum value for the slider
   **/
  @Prop() max: number = 100;
  /**
   * Indocates the value of the slider
   **/
  @Prop({ mutable: true, reflectToAttr: true }) value: number = this.min;
  /**
   * Indicate if the input box
   **/
  @Prop() displayTextBox: boolean = false;

  /**
   * Triggered 2s after the component is loaded.
   * @return the current fullname
   */
  @Event() update: EventEmitter;

  updateValue (event) {
    const newValue = event.target.valueAsNumber;
    const upToDate = this.value === newValue;
    this.value = newValue;
    if (!upToDate) {
      this.update.emit(this.value);
    }
  }

  render() {
    return (<div>
      <input
        type="range"
        min={this.min}
        max={this.max}
        value={this.value}
        onChange={(event: UIEvent) => this.updateValue(event)}>
      </input>
      {this.displayTextBox ? (
        <input type="text" value={this.value}></input>
      ) : (
        '')}
    </div>);
  }
}

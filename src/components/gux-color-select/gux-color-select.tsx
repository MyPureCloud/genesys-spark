import {
  Component,
  Event,
  EventEmitter,
  h,
  Prop,
  State,
  Watch
} from '@stencil/core';
import { defaultColors } from './colors';

@Component({
  styleUrl: 'gux-color-select.less',
  tag: 'gux-color-select'
})
export class GuxColorSelect {
  /**
   * Indicates the custom Colors displayed in the matrix
   */
  @Prop()
  customColors: string[] = [];

  /**
   * Determines the state activeColor
   */
  @Prop()
  value: string;

  /**
   * Indicate the color that is active
   */
  @State()
  activeColor: string;

  /**
   * Triggers when a color is selected
   */
  @Event()
  input: EventEmitter;

  componentWillLoad() {
    this.activeColor = this.value;
  }

  onSelectColorHandler(e: MouseEvent & { target: HTMLInputElement }) {
    this.activeColor = e.target.value;
    this.input.emit(e.target.value);
  }

  @Watch('value')
  valueChangeHandler(newValue: string) {
    this.activeColor = newValue;
  }

  renderDefaultTiles() {
    return defaultColors.map((color, index) => (
      <gux-color-tile
        key={`${color}-${index}`}
        value={color}
        active={this.activeColor === color}
        onTileClick={ev => this.onSelectColorHandler(ev.detail)}
      />
    ));
  }

  renderCustomTiles() {
    return this.customColors.map((color, index) => (
      <gux-color-tile
        key={`custom-${color}-${index}`}
        value={color}
        active={this.activeColor === color}
        onTileClick={ev => this.onSelectColorHandler(ev.detail)}
      />
    ));
  }

  renderBlankTiles() {
    const maxNumberOfTiles = 20;
    const blankTiles = [];
    const blankTilesLength =
      maxNumberOfTiles - defaultColors.length - this.customColors.length;
    for (let i = 0; i < blankTilesLength; i += 1) {
      blankTiles.push(
        <gux-color-tile key={`blank-tile-${i}`} aria-hidden="true" />
      );
    }
    return blankTiles;
  }

  render() {
    return (
      <div>
        <div class="gux-color-matrix">
          {this.renderDefaultTiles()}
          {this.renderCustomTiles()}
          {this.renderBlankTiles()}
        </div>
      </div>
    );
  }
}

import { Component, Element, h, JSX, Listen, State, Prop } from '@stencil/core';
import { setInterval, clearInterval } from 'requestanimationframe-timer';

import { onDisabledChange } from '../../../../../utils/dom/on-attribute-change';

/**
 * @slot input - Required slot for input[type="range"]
 * @slot label - Required slot for label
 */
@Component({
  styleUrl: 'gux-input-range.less',
  tag: 'gux-input-range'
})
export class GuxInputRange {
  private input: HTMLInputElement;
  private progressElement: HTMLDivElement;
  private disabledObserver: MutationObserver;

  @Element()
  private root: HTMLElement;

  @State()
  private disabled: boolean;

  @State()
  private value: string;

  @State()
  private active: boolean;

  @State()
  private valueWatcherId: number;

  @Prop()
  displayTextBox: string = 'true';

  sliderTooltip: HTMLElement;
  sliderTooltipContainer: HTMLElement;

  @Listen('input')
  onInput(e: MouseEvent): void {
    const input = e.target as HTMLInputElement;
    this.updateValue(input.value);
  }

  @Listen('focusin')
  @Listen('mousedown')
  onMousedown(): void {
    if (!this.disabled) {
      this.active = true;
    }
  }

  @Listen('focusout')
  @Listen('mouseup')
  onMouseup(): void {
    this.active = false;
  }

  updateValue(newValue: string): void {
    this.value = newValue;
    this.updatePosition();
  }

  updatePosition(): void {
    const value = Number(this.input.value || 0);
    const min = Number(this.input.min || 0);
    const max = Number(this.input.max || 100);
    const placementPercentage = ((value - min) / (max - min)) * 100;

    if (this.sliderTooltip) {
      const width = this.sliderTooltipContainer.offsetWidth;
      const offset =
        placementPercentage - (placementPercentage / 8 / width) * 100;
      this.sliderTooltip.style.left = `${offset}%`;
    }

    this.progressElement.style.width = `${placementPercentage}%`;
  }

  componentWillLoad(): void {
    this.input = this.root.querySelector('input[slot="input"]');
    this.disabled = this.input.disabled;
    this.value = this.input.value;
    this.displayTextBox = this.input.getAttribute('display-text-box');

    this.disabledObserver = onDisabledChange(
      this.input,
      (disabled: boolean) => {
        this.disabled = disabled;
      }
    );
  }

  componentDidLoad(): void {
    this.updatePosition();

    this.valueWatcherId = setInterval(() => {
      if (this.value !== this.input.value) {
        this.updateValue(this.input.value);
      }
    }, 100);
  }

  componentDidUnload(): void {
    this.disabledObserver.disconnect();
    clearInterval(this.valueWatcherId);
  }

  render(): JSX.Element {
    let shouldDisplayTextBox = true;
    if (this.displayTextBox === 'false') {
      shouldDisplayTextBox = false;
    }
    return (
      <div
        class={{
          'gux-container': true,
          'gux-disabled': this.disabled
        }}
      >
        <div
          class={{
            'gux-range': true,
            'gux-active': this.active
          }}
        >
          <div class="gux-track">
            <div
              class="gux-progress"
              ref={el => (this.progressElement = el)}
            ></div>
          </div>
          <slot name="input" />
        </div>
        <div
          class={{
            'gux-display': true,
            'gux-active': this.active,
            'gux-hidden': !shouldDisplayTextBox
          }}
          ref={el => (this.sliderTooltipContainer = el)}
        >
          <div
            class="gux-range-tooltip"
            ref={el => (this.sliderTooltip = el)}
          ></div>
          {this.value}
        </div>
      </div>
    );
  }
}

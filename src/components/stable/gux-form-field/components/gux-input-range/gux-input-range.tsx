import { Component, Element, h, JSX, Listen, State, Prop } from '@stencil/core';
import { setInterval, clearInterval } from 'requestanimationframe-timer';

import { onDisabledChange } from '../../../../../utils/dom/on-attribute-change';

/**
 * @slot input - Required slot for input[type="range"]
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

  @Prop()
  displayUnits: string;

  @State()
  private disabled: boolean;

  @State()
  private value: string;

  @State()
  private active: boolean;

  @State()
  private valueWatcherId: number;

  @Prop()
  valueInTooltip: boolean = false;

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

  private updateValue(newValue: string): void {
    this.value = newValue;
    this.updatePosition();
  }

  private updatePosition(): void {
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

  private getDisplayValue(): string {
    if (this.displayUnits) {
      return `${this.value}${this.displayUnits}`;
    }

    return this.value;
  }

  // Using componentWillLoad() instead of connectedCallback() here to fix
  // a bug caused by a race condition. Refer to COMUI-541 for details
  componentWillLoad(): void {
    this.input = this.root.querySelector('input[slot="input"]');
    this.disabled = this.input.disabled;
    this.value = this.input.value;

    this.disabledObserver = onDisabledChange(
      this.input,
      (disabled: boolean) => {
        this.disabled = disabled;
      }
    );

    this.valueWatcherId = setInterval(() => {
      if (this.value !== this.input.value) {
        this.updateValue(this.input.value);
      }
    }, 100);
  }

  componentDidLoad(): void {
    this.updatePosition();
  }

  disconnectedCallback(): void {
    this.disabledObserver.disconnect();
    clearInterval(this.valueWatcherId);
  }

  render(): JSX.Element {
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
          <div
            class={{
              'gux-range-tooltip-container': true,
              'gux-hidden': !this.valueInTooltip
            }}
            ref={el => (this.sliderTooltipContainer = el)}
          >
            <div
              class="gux-range-tooltip"
              ref={el => (this.sliderTooltip = el)}
            >
              {this.getDisplayValue()}
            </div>
          </div>
        </div>
        <div
          class={{
            'gux-display': true,
            'gux-hidden': this.valueInTooltip
          }}
        >
          {this.getDisplayValue()}
        </div>
      </div>
    );
  }
}

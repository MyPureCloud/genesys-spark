import { Component, Element, h, JSX, Listen, State } from '@stencil/core';

import onDisabledChange from '../../../utils/on-disabled-change/on-disabled-change';

/**
 * @slot input - Required slot for input[type="range"]
 * @slot label - Required slot for label
 */
@Component({
  styleUrl: 'gux-input-range-beta.less',
  tag: 'gux-input-range-beta'
})
export class GuxInputRangeBeta {
  private input: HTMLInputElement;
  private progressElement: HTMLDivElement;

  @Element()
  private root: HTMLGuxInputRangeBetaElement;

  @State()
  private disabled: boolean;

  @State()
  private value: string;

  @State()
  private active: boolean;

  @Listen('input')
  onInput(e: MouseEvent): void {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.updatePosition();
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

  updatePosition() {
    const value = Number(this.input.value || 0);
    const min = Number(this.input.min || 0);
    const max = Number(this.input.max || 100);
    const placementPercentage = ((value - min) / (max - min)) * 100;

    this.progressElement.style.width = `${placementPercentage}%`;
  }

  componentDidLoad() {
    this.updatePosition();
  }

  componentWillLoad() {
    this.input = this.root.querySelector('input[slot="input"]');
    this.disabled = this.input.disabled;
    this.value = this.input.value;

    onDisabledChange(this.input, (disabled: boolean) => {
      this.disabled = disabled;
    });
  }

  render(): JSX.Element {
    return (
      <div class={this.disabled ? 'container disabled' : 'container'}>
        <div class={this.active ? 'range active' : 'range'}>
          <div class="track">
            <div class="progress" ref={el => (this.progressElement = el)}></div>
          </div>
          <slot name="input" />
        </div>
        <div class={this.active ? 'display active' : 'display'}>
          {this.value}
        </div>
      </div>
    );
  }
}

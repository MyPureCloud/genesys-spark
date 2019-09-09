import {
  Component,
  Prop,
  Event,
  Element,
  Method,
  Watch,
  Listen
} from '@stencil/core';
import { EventEmitter } from 'events';

import { buildI18nForComponent } from '../../i18n';
import defaultResources from './gux-spin-button.i18n.json';

@Component({
  tag: 'gux-spin-button',
  styleUrl: 'gux-spin-button.less'
})
export class GuxSpinButton {
  @Element()
  element: HTMLElement;

  /**
   * Triggered when user inputs.
   */
  @Event()
  input: EventEmitter;
  emitInput(event: CustomEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.value = Number(event.detail);
  }

  @Watch('value')
  valueWatchHandler() {
    if (!this.ignoreValidation) {
      this.validate();
    }

    this.input.emit(this.value.toString());
  }

  /**
   * The current number value of the text field
   */
  @Prop({ reflectToAttr: true, mutable: true })
  value: number;

  /**
   * The minimum number the value can be when using the spin buttons
   */
  @Prop({ reflectToAttr: true })
  min: number;

  /**
   * the maximum number the value can be when using the spin buttons
   */
  @Prop({ reflectToAttr: true })
  max: number;

  /**
   * The number which the value increments / decrements
   */
  @Prop({ reflectToAttr: true })
  step: number;

  /**
   * Label text
   */
  @Prop({ reflectToAttr: true })
  label: string;

  /**
   * Label position
   */
  @Prop({ reflectToAttr: true })
  labelPosition: 'above' | 'beside' = 'beside';

  /**
   * If the component is disabled or not
   */
  @Prop({ reflectToAttr: true })
  disabled: boolean;

  /**
   * The message shown to the user on an error
   */
  @Prop({ reflectToAttr: true, mutable: true })
  errorMessage: string;

  /**
   * If the component should show validation warnings or not
   */
  @Prop({ reflectToAttr: true })
  ignoreValidation: boolean;

  @Method()
  async validate(): Promise<boolean> {
    if (isNaN(this.value)) {
      this.errorMessage = this.ignoreValidation
        ? null
        : this.i18n('validation.nan');
      return false;
    } else if (this.value > this.max) {
      this.errorMessage = this.ignoreValidation
        ? null
        : this.i18n('validation.max', { max: this.max });
      return false;
    } else if (this.value < this.min) {
      this.errorMessage = this.ignoreValidation
        ? null
        : this.i18n('validation.min', { min: this.min });
      return false;
    } else if (this.value % this.step !== 0) {
      this.errorMessage = this.ignoreValidation
        ? null
        : this.i18n('validation.increment', { increment: this.step });
      return false;
    } else {
      this.errorMessage = null;
      return true;
    }
  }

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent) {
    switch (ev.key) {
      case 'ArrowDown':
        this.incrementValue(false);
        ev.preventDefault();
        ev.stopPropagation();
        break;
      case 'ArrowUp':
        this.incrementValue(true);
        ev.preventDefault();
        ev.stopPropagation();
        break;
    }
  }

  private i18n: (resourceKey: string, context?: any) => string;

  async componentWillLoad() {
    this.i18n = await buildI18nForComponent(this.element, defaultResources);
    this.validate();
  }

  incrementValue(up: boolean) {
    if (this.value > this.max) {
      this.value = this.max;
      return;
    }

    if (this.value < this.min) {
      this.value = this.min;
      return;
    }

    let total: number;
    const mod = this.value % this.step;
    if (mod === 0) {
      total = up ? this.step + this.value : this.value - this.step;
    } else {
      total = up ? this.step - mod + this.value : this.value - mod;
    }

    if (total > this.max) {
      total = this.max;
    } else if (total < this.min) {
      total = this.min;
    }

    this.value = total;
  }

  render() {
    const el = [
      <gux-text-field
        id="gux-spin-button-text-field"
        type={'number'}
        value={this.value.toString()}
        onInput={Event => this.emitInput(Event)}
        useClearButton={false}
        disabled={this.disabled}
        errorMessage={this.errorMessage}
      />,
      <div class="gux-spin-button-container">
        <button
          id="gux-spin-button-increment"
          onClick={() => {
            this.incrementValue(true);
          }}
          class="genesys-icon-iw-circle-no-chevron-up gux-spin-button"
          disabled={this.disabled || this.value >= this.max}
        />
        <button
          id="gux-spin-button-decrement"
          onClick={() => {
            this.incrementValue(false);
          }}
          class="genesys-icon-iw-circle-no-chevron-down gux-spin-button"
          disabled={this.disabled || this.value <= this.min}
        />
      </div>
    ];

    if (this.label === '') {
      return el;
    }

    return (
      <gux-text-label label={this.label} position={this.labelPosition}>
        {el}
      </gux-text-label>
    );
  }
}

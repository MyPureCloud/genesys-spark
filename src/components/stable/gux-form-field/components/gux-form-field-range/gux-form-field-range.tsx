import {
  Component,
  Element,
  h,
  Host,
  JSX,
  Listen,
  Prop,
  State
} from '@stencil/core';

import { OnMutation } from '../../../../../utils/decorator/on-mutation';
import { onDisabledChange } from '../../../../../utils/dom/on-attribute-change';
import { onRequiredChange } from '../../../../../utils/dom/on-attribute-change';
import { preventBrowserValidationStyling } from '../../../../../utils/dom/prevent-browser-validation-styling';
import { trackComponent } from '../../../../../usage-tracking';

import { GuxFormFieldContainer } from '../../functional-components/gux-form-field-container/gux-form-field-container';
import { GuxFormFieldError } from '../../functional-components/gux-form-field-error/gux-form-field-error';
import { GuxFormFieldLabel } from '../../functional-components/gux-form-field-label/gux-form-field-label';

import { GuxFormFieldLabelPosition } from '../../gux-form-field.types';
import {
  hasErrorSlot,
  getComputedLabelPosition,
  validateFormIds
} from '../../gux-form-field.service';

/**
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 * @slot error - Optional slot for error message
 */
@Component({
  styleUrl: 'gux-form-field-range.less',
  tag: 'gux-form-field-range',
  shadow: true
})
export class GuxFormField {
  private input: HTMLInputElement;
  private label: HTMLLabelElement;
  private disabledObserver: MutationObserver;
  private requiredObserver: MutationObserver;

  private progressElement: HTMLDivElement;
  private sliderTooltip: HTMLElement;
  private sliderTooltipContainer: HTMLElement;

  @Element()
  private root: HTMLElement;

  @Prop()
  displayUnits: string;

  @Prop()
  valueInTooltip: boolean;

  @Prop()
  labelPosition: GuxFormFieldLabelPosition;

  @State()
  private computedLabelPosition: GuxFormFieldLabelPosition = 'above';

  @State()
  private disabled: boolean;

  @State()
  private required: boolean;

  @State()
  private hasError: boolean = false;

  @State()
  private value: string;

  @State()
  private active: boolean;

  @State()
  private valueWatcherId: ReturnType<typeof setTimeout>;

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

  @OnMutation({ childList: true, subtree: true })
  onMutation(): void {
    this.hasError = hasErrorSlot(this.root);
  }

  componentWillLoad(): void {
    this.setInput();
    this.setLabel();

    this.hasError = hasErrorSlot(this.root);

    trackComponent(this.root, { variant: this.variant });
  }

  componentDidLoad(): void {
    this.updatePosition();
  }

  disconnectedCallback(): void {
    this.disabledObserver.disconnect();
    this.requiredObserver.disconnect();

    clearInterval(this.valueWatcherId);
  }

  render(): JSX.Element {
    return (
      <Host
        class={{
          'gux-active': this.active
        }}
      >
        <GuxFormFieldContainer labelPosition={this.computedLabelPosition}>
          <GuxFormFieldLabel
            position={this.computedLabelPosition}
            required={this.required}
          >
            <slot name="label" onSlotchange={() => this.setLabel()} />
          </GuxFormFieldLabel>
          <div class="gux-input-and-error-container">
            {this.renderRangeInput()}
            <GuxFormFieldError hasError={this.hasError}>
              <slot name="error" />
            </GuxFormFieldError>
          </div>
        </GuxFormFieldContainer>
      </Host>
    ) as JSX.Element;
  }

  private get variant(): string {
    return this.labelPosition ? this.labelPosition.toLowerCase() : 'none';
  }

  private setInput(): void {
    this.input = this.root.querySelector('input[type="range"][slot="input"]');

    preventBrowserValidationStyling(this.input);

    this.disabled = this.input.disabled;
    this.required = this.input.required;
    this.value = this.input.value;

    this.disabledObserver = onDisabledChange(
      this.input,
      (disabled: boolean) => {
        this.disabled = disabled;
      }
    );
    this.requiredObserver = onRequiredChange(
      this.input,
      (required: boolean) => {
        this.required = required;
      }
    );

    clearInterval(this.valueWatcherId);

    this.valueWatcherId = setInterval(() => {
      if (this.value !== this.input.value) {
        this.updateValue(this.input.value);
      }
    }, 100);

    validateFormIds(this.root, this.input);
  }

  private setLabel(): void {
    this.label = this.root.querySelector('label[slot="label"]');

    this.computedLabelPosition = getComputedLabelPosition(
      this.label,
      this.labelPosition
    );
  }

  private renderRangeInput(): JSX.Element {
    return (
      <div
        class={{
          'gux-range-input-container': true,
          'gux-disabled': this.disabled
        }}
      >
        <div class="gux-range">
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
    ) as JSX.Element;
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
}
